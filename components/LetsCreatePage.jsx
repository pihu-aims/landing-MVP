"use client";

import React, { useEffect, useState } from 'react';

const LetsCreatePage = ({ isVisible, onTransitionComplete }) => {
  const [opacity, setOpacity] = useState(0);
  
  // Handle fade-in and fade-out animations
  useEffect(() => {
    if (isVisible) {
      // Fade in when component becomes visible
      setOpacity(1);
      
      // After a delay, fade out and trigger transition to waitlist page
      const timer = setTimeout(() => {
        setOpacity(0);
        
        // Allow time for fade-out animation before transitioning
        const transitionTimer = setTimeout(() => {
          onTransitionComplete && onTransitionComplete(true);
        }, 800); // Match the fade-out duration
        
        return () => clearTimeout(transitionTimer);
      }, 2000); // 2 second delay before starting fade-out
      
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [isVisible, onTransitionComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-white z-60 flex flex-col items-center justify-center ${
        isVisible ? '' : 'pointer-events-none'
      }`}
      style={{
        opacity: opacity,
        transition: 'opacity 0.8s ease-in-out',
        display: isVisible ? 'flex' : 'none'
      }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4">Let's Create</h1>
        <p className="text-2xl text-gray-700">Unleash your creative potential</p>
      </div>
    </div>
  );
};

export default LetsCreatePage;
