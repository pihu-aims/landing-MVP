"use client";

import { useState, useEffect, useRef } from 'react';

export default function useFrameScrollAnimation(options = {}) {
  const {
    framePositionMultipliers = [0, 1, 2], // Default: frames at 0, 1x, and 2x viewport height
    useIntersectionObserver = true, // Whether to use IntersectionObserver for more reliable frame detection
    transitionDelay = 600, // Delay in ms for frame transition effect
    scrollPauseDelay = 0, // Set to 0 to disable scroll pausing
    minTimeBetweenTransitions = 500, // Minimum time between frame transitions
    enableSnapToFrame = false, // Disable snap-to-frame by default
    scrollSnapThreshold = 0.3 // Threshold to determine when to snap (0.3 = 30% of the way to next frame)
  } = options;
  
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

  // Function to smoothly scroll to a specific position
  const scrollToPosition = (position, duration = 500) => {
    if (typeof window === 'undefined') return;
    
    const start = window.scrollY;
    const change = position - start;
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
    
    const framePosition = Math.round(framePositionMultipliers[frameIndex] * viewportHeight.current);
    scrollToPosition(framePosition);
    targetFrameRef.current = frameIndex;
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
      
      if (useIntersectionObserver && observersRef.current.length > 0) {
        return;
      }
      
      const framePositions = framePositionMultipliers.map(
        multiplier => Math.round(multiplier * viewportHeight.current)
      );
      
      let newFrameIndex = 0;
      for (let i = 0; i < framePositions.length; i++) {
        if (currentScrollY >= framePositions[i] - (viewportHeight.current * 0.1)) {
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
      
      const now = Date.now();
      const timeSinceLastFrameChange = now - lastFrameChangeTime.current;
      
      if (newFrameIndex !== currentFrame && timeSinceLastFrameChange > minTimeBetweenTransitions) {
        handleFrameChange(newFrameIndex);
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

    window.addEventListener('scroll', handleScrollThrottled);
    window.addEventListener('resize', updateViewportHeight);
    
    handleScroll();
    
    return () => {
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