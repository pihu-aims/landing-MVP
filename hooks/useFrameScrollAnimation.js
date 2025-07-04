"use client";

import { useState, useEffect, useRef } from 'react';

export default function useFrameScrollAnimation(options = {}) {
  const {
    framePositionMultipliers = [0, 1, 2], // Default: frames at 0, 1x, and 2x viewport height
    useIntersectionObserver = true, // Whether to use IntersectionObserver for more reliable frame detection
    transitionDelay = 600, // Delay in ms for frame transition effect
    scrollPauseDelay = 400, // Delay in ms to pause scrolling during transition
    minTimeBetweenTransitions = 500 // Minimum time between frame transitions
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
    
    if (scrollPauseDelay > 0) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        document.body.style.overflow = originalOverflow;
      }, scrollPauseDelay);
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
      
      if (useIntersectionObserver && observersRef.current.length > 0) {
        return;
      }
      
      const framePositions = framePositionMultipliers.map(
        multiplier => Math.round(multiplier * viewportHeight.current)
      );
      
      let newFrameIndex = 0;
      for (let i = 0; i < framePositions.length; i++) {
        if (currentScrollY >= framePositions[i]) {
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
    };
  }, [currentFrame, framePositionMultipliers, minTimeBetweenTransitions, scrollPauseDelay, transitionDelay, useIntersectionObserver]);

  return {
    currentFrame,
    scrollY,
    registerFrame,
    isFrameTransition,
    transitionProgress
  };
}