"use client";

import { useState, useEffect } from 'react';

export default function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate which frame we're on based on scroll position
      // Adjust these thresholds based on your layout
      const frameHeight = window.innerHeight;
      const frame = Math.floor(window.scrollY / frameHeight) + 1;
      setCurrentFrame(frame);
      
      // Calculate transition progress (0 to 1) between frames
      const frameOffset = window.scrollY % frameHeight;
      const progress = frameOffset / frameHeight;
      setTransitionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, currentFrame, transitionProgress };
}