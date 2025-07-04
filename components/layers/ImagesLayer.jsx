"use client";

import React, { useEffect, useState } from "react";
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

export default function ImagesLayer() {
  const [isClient, setIsClient] = useState(false);
  const [frameConfig, setFrameConfig] = useState({
    framePositions: [0, 800, 1600], // Default positions where frames should change (in px)
    transitionDelay: 600, // Delay in ms for frame transition effect
    scrollPauseDelay: 400, // Delay in ms to pause scrolling during transition
    minTimeBetweenTransitions: 500 // Minimum time between frame transitions
  });
  
  // Use the enhanced hook with configurable options
  const { 
    currentFrame, 
    transitionProgress, 
    isFrameTransition 
  } = useFrameScrollAnimation(frameConfig);
  
  // Set isClient to true when component mounts to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
    
    // You can adjust these values based on your layout or dynamically
    // For example, you could calculate based on viewport height
    const viewportHeight = window.innerHeight;
    setFrameConfig({
      framePositions: [0, viewportHeight * 0.8, viewportHeight * 1.6],
      transitionDelay: 600,
      scrollPauseDelay: 400,
      minTimeBetweenTransitions: 500
    });
  }, []);
  
  // Function to update frame configuration
  const updateFrameConfig = (newConfig) => {
    setFrameConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };
  
  // Only render on client side to avoid hydration mismatch
  if (!isClient) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Frame 1 */}
      <AnimatePresence>
        {(currentFrame === 0) && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1 - transitionProgress,
              scale: 1 - (transitionProgress * 0.1)
            }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              {/* Left side content */}
              <motion.div 
                className="md:w-1/2 text-left mb-8 md:mb-0"
                initial={{ x: -50, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1 - transitionProgress
                }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Studio 1</h1>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Create Together</h2>
                <p className="text-lg mb-6">
                  Our Vision: Empowering the Next Billion Storytellers
                </p>
                <p className="text-sm md:text-base">
                  Anyone can become a creator. By simplifying powerful AI tools, we give
                  people the freedom to tell stories quickly, confidently, and with full control.
                </p>
              </motion.div>
              
              {/* Right side image */}
              <motion.div 
                className="md:w-1/2 rounded-3xl overflow-hidden shadow-xl"
                initial={{ x: 50, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1 - transitionProgress
                }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="/images/studio-image.jpg" 
                  alt="Creative studio with people working" 
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Frame 2 */}
      <AnimatePresence>
        {(currentFrame === 1 || (currentFrame === 0 && transitionProgress > 0)) && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: currentFrame === 0 ? 0 : 1 }}
            animate={{ 
              opacity: currentFrame === 0 ? transitionProgress : (1 - transitionProgress),
              scale: currentFrame === 0 ? 0.9 + (transitionProgress * 0.1) : 1
            }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              {/* Left side image */}
              <motion.div 
                className="md:w-1/2 rounded-3xl overflow-hidden shadow-xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: currentFrame === 0 ? transitionProgress : (1 - transitionProgress)
                }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="/images/laptop-night-scene.jpg" 
                  alt="Laptop with city lights in background" 
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
              
              {/* Right side content */}
              <motion.div 
                className="md:w-1/2 text-left md:pl-12 mb-8 md:mb-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: currentFrame === 0 ? transitionProgress : (1 - transitionProgress)
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src="/images/camera.jpg" 
                    alt="Vintage camera" 
                    className="w-24 h-auto mr-6"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">What We've Built</h2>
                <p className="text-lg font-medium mb-4">
                  All the Best Creative AI Tools. One Place.
                </p>
                <p className="text-sm md:text-base">
                  We combine the best creative AI tools in one easy workspace.
                  Make content, collaborate, monetize, and stay safe -
                  All in one place, with one subscription.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Frame 3 */}
      <AnimatePresence>
        {(currentFrame === 2 || (currentFrame === 1 && transitionProgress > 0)) && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: currentFrame === 1 ? 0 : 1 }}
            animate={{ 
              opacity: currentFrame === 1 ? transitionProgress : 1,
              scale: currentFrame === 1 ? 0.9 + (transitionProgress * 0.1) : 1
            }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              {/* Content for Frame 3 */}
              <motion.div 
                className="w-full text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: currentFrame === 1 ? transitionProgress : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Join Our Community</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Connect with creators around the world and start building amazing content together.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Debug Panel - Only visible during development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg z-50 text-xs pointer-events-auto">
          <h4 className="font-bold mb-2">Frame Controls</h4>
          <div className="mb-2">
            <span>Current Frame: {currentFrame}</span>
            <span className="ml-4">Progress: {transitionProgress.toFixed(2)}</span>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Frame Positions:</label>
            <div className="flex gap-2">
              {frameConfig.framePositions.map((pos, idx) => (
                <input 
                  key={idx}
                  type="number" 
                  value={pos}
                  className="w-16 bg-gray-800 text-white p-1 rounded"
                  onChange={(e) => {
                    const newPositions = [...frameConfig.framePositions];
                    newPositions[idx] = parseInt(e.target.value);
                    updateFrameConfig({ framePositions: newPositions });
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Transition Delay (ms):</label>
            <input 
              type="number" 
              value={frameConfig.transitionDelay}
              className="w-16 bg-gray-800 text-white p-1 rounded"
              onChange={(e) => updateFrameConfig({ transitionDelay: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Scroll Pause Delay (ms):</label>
            <input 
              type="number" 
              value={frameConfig.scrollPauseDelay}
              className="w-16 bg-gray-800 text-white p-1 rounded"
              onChange={(e) => updateFrameConfig({ scrollPauseDelay: parseInt(e.target.value) })}
            />
          </div>
        </div>
      )}
    </div>
  );
}