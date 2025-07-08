"use client";

import { useState, useEffect, useRef } from 'react';

export default function useFrameScrollAnimation(options = {}) {
  const {
    framePositionMultipliers = [0, 0.8, 5.0, 8.0, 11.0, 12.0], // Modified: Much larger gaps between later frames
    useIntersectionObserver = false, // Disable intersection observer for more reliable scrolling
    transitionDelay = 600, // Delay in ms for frame transition effect
    scrollPauseDelay = 0, // Set to 0 to disable scroll pausing
    minTimeBetweenTransitions = 500, // Minimum time between frame transitions
    enableSnapToFrame = false, // Disable snap-to-frame to allow free scrolling
    scrollSnapThreshold = 0.01, // Threshold to determine when to snap (0.2 = 20% of the way to next frame)
    // Can be a single number (same for all frames) or an array of numbers (one per frame)
    scrollAnimationDuration = [100, 100, 100, 100, 100, 150] // Different durations per frame: fast-medium-slow-fast-medium-fast
  } = options;
  
  // Convert scrollAnimationDuration to array if it's a single number
  const animationDurations = Array.isArray(scrollAnimationDuration) 
    ? scrollAnimationDuration 
    : framePositionMultipliers.map(() => scrollAnimationDuration);
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isFrameTransition, setIsFrameTransition] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const frameRefs = useRef([]);
  const observersRef = useRef([]);
  const lastFrameChangeTime = useRef(0);
  const transitionTimeoutRef = useRef(null);
  const viewportHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const targetFrameRef = useRef(null);
  const wheelEventTimeout = useRef(null); // New ref for wheel event debouncing
  const isProcessingWheel = useRef(false); // Flag to prevent multiple wheel events processing

  // Function to smoothly scroll to a specific position
  const scrollToPosition = (position, duration = 500) => {
    if (typeof window === 'undefined') return;
    
    const start = window.scrollY;
    const change = position - start;
    
    // Prevent unnecessary scrolling if we're very close to the target
    if (Math.abs(change) < 10) return;
    
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth easing
      
      window.scrollTo(0, start + change * easeProgress);
      
      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      }
    }
    
    window.requestAnimationFrame(animateScroll);
  };

  // Function to scroll to a specific frame
  const scrollToFrame = (frameIndex) => {
    if (frameIndex < 0 || frameIndex >= framePositionMultipliers.length) return;
    
    // Don't scroll if we're already at or very near this frame
    if (Math.abs(currentFrame - frameIndex) < 0.1) return;
    
    const framePosition = Math.round(framePositionMultipliers[frameIndex] * viewportHeight.current);
    scrollToPosition(framePosition);
    targetFrameRef.current = frameIndex;
  };

  // New function to handle individual wheel events
  const handleWheelEvent = (event) => {
    // Prevent processing if we're already handling a wheel event
    if (isProcessingWheel.current) return;
    isProcessingWheel.current = true;
    
    // Clear any existing timeout
    if (wheelEventTimeout.current) {
      clearTimeout(wheelEventTimeout.current);
    }
    
    const now = Date.now();
    const timeSinceLastFrameChange = now - lastFrameChangeTime.current;
    
    // Only process if enough time has passed since last frame change
    if (timeSinceLastFrameChange > minTimeBetweenTransitions) {
      // Determine direction (positive deltaY means scrolling down)
      const direction = event.deltaY > 0 ? 1 : -1;
      
      // Calculate target frame
      const targetFrame = Math.max(0, Math.min(framePositionMultipliers.length - 1, currentFrame + direction));
      
      // Only change frame if it's different
      if (targetFrame !== currentFrame) {
        // Get the animation duration for this specific frame
        const duration = animationDurations[targetFrame] || 300; // Use frame-specific duration or default
        
        // Scroll to the target frame position
        const framePosition = Math.round(framePositionMultipliers[targetFrame] * viewportHeight.current);
        scrollToPosition(framePosition, duration);
        
        // Update the frame
        handleFrameChange(targetFrame);
      }
    }
    
    // Reset the processing flag after a short delay
    wheelEventTimeout.current = setTimeout(() => {
      isProcessingWheel.current = false;
    }, 200); // Debounce wheel events
  };

  const registerFrame = (index, element) => {
    if (element) {
      frameRefs.current[index] = element;
      
      if (useIntersectionObserver && typeof IntersectionObserver !== 'undefined') {
        if (observersRef.current[index]) {
          observersRef.current[index].disconnect();
        }
        
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const now = Date.now();
              const timeSinceLastFrameChange = now - lastFrameChangeTime.current;
              
              if (index !== currentFrame && timeSinceLastFrameChange > minTimeBetweenTransitions) {
                handleFrameChange(index);
              }
            }
          },
          {
            threshold: [0.1, 0.5, 0.9], 
            rootMargin: "0px"
          }
        );
        
        observer.observe(element);
        observersRef.current[index] = observer;
      }
    }
  };
  
  const handleFrameChange = (newFrameIndex) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setIsFrameTransition(true);
    
    setCurrentFrame(newFrameIndex);
    lastFrameChangeTime.current = Date.now();
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsFrameTransition(false);
    }, transitionDelay);
  };

  // Handle snap-to-frame when scrolling stops
  const handleScrollStop = () => {
    if (!enableSnapToFrame || isFrameTransition) return;
    
    isScrolling.current = false;
    
    const framePositions = framePositionMultipliers.map(
      multiplier => Math.round(multiplier * viewportHeight.current)
    );
    
    // Find the closest frame position
    let closestFrameIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < framePositions.length; i++) {
      const distance = Math.abs(scrollY - framePositions[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestFrameIndex = i;
      }
    }
    
    // Only snap if we're significantly off from a frame position
    // This prevents unnecessary bouncing
    if (minDistance > (viewportHeight.current * 0.05)) {
      // If we're between frames and past the threshold, snap to the appropriate frame
      if (closestFrameIndex < framePositions.length - 1) {
        const currentFramePos = framePositions[closestFrameIndex];
        const nextFramePos = framePositions[closestFrameIndex + 1];
        const progress = (scrollY - currentFramePos) / (nextFramePos - currentFramePos);
        
        if (progress > scrollSnapThreshold && progress < (1 - scrollSnapThreshold)) {
          // We're in the middle zone between frames, snap to the closest one
          const targetFrame = progress < 0.5 ? closestFrameIndex : closestFrameIndex + 1;
          // Don't automatically scroll - just update the frame
          setCurrentFrame(targetFrame);
        }
      }
    }
  };

  useEffect(() => {
    const updateViewportHeight = () => {
      viewportHeight.current = window.innerHeight;
    };
    
    updateViewportHeight();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Set scrolling state
      isScrolling.current = true;
      
      // Clear any existing scroll timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(handleScrollStop, 150);
      
      // Skip intersection observer logic if disabled
      if (useIntersectionObserver && observersRef.current.length > 0) {
        return;
      }
      
      const framePositions = framePositionMultipliers.map(
        multiplier => Math.round(multiplier * viewportHeight.current)
      );
      
      let newFrameIndex = 0;
      for (let i = 0; i < framePositions.length; i++) {
        if (currentScrollY >= framePositions[i] - (viewportHeight.current * 0.3)) {
          newFrameIndex = i;
        } else {
          break;
        }
      }
      
      if (newFrameIndex < framePositions.length - 1) {
        const currentFramePos = framePositions[newFrameIndex];
        const nextFramePos = framePositions[newFrameIndex + 1];
        const progress = (currentScrollY - currentFramePos) / (nextFramePos - currentFramePos);
        setTransitionProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add wheel event listener for precise scroll detection
    window.addEventListener('wheel', handleWheelEvent, { passive: false });
    window.addEventListener('scroll', handleScrollThrottled);
    window.addEventListener('resize', updateViewportHeight);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
      window.removeEventListener('scroll', handleScrollThrottled);
      window.removeEventListener('resize', updateViewportHeight);
      
      if (useIntersectionObserver) {
        observersRef.current.forEach(observer => {
          if (observer) observer.disconnect();
        });
      }
      
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      if (wheelEventTimeout.current) {
        clearTimeout(wheelEventTimeout.current);
      }
    };
  }, [currentFrame, framePositionMultipliers, minTimeBetweenTransitions, scrollPauseDelay, transitionDelay, useIntersectionObserver, enableSnapToFrame, scrollSnapThreshold]);

  return {
    currentFrame,
    scrollY,
    registerFrame,
    isFrameTransition,
    transitionProgress,
    scrollToFrame
  };
}