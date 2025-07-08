"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import the background layers
import BackgroundLayerOne from './layers/BackgroundLayerOne';
import BackgroundLayerTwo from './layers/BackgroundLayerTwo';
import BackgroundLayerThree from './layers/BackgroundLayerThree';
import TextLayer from './layers/TextLayer';
import ImagesLayer from './layers/ImagesLayer';
import ExpandingCircleLayer from './layers/ExpandingCircleLayer';
import useFrameScrollAnimation from '../hooks/useFrameScrollAnimation';

export default function ParallaxSection() {
  // Reference to the container element for scroll tracking
  const containerRef = useRef(null);
  const [circleTransitionComplete, setCircleTransitionComplete] = useState(false);
  
  // Use our custom frame scroll animation hook
  const { currentFrame, scrollY, transitionProgress } = useFrameScrollAnimation({
    enableSnapToFrame: false,
    scrollSnapThreshold: 0.2
  });
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Start tracking when container enters viewport, end when it leaves
  });

  // Create dynamic transform values based on current frame
  // This will make backgrounds move faster after frame 2
  const getBackgroundTransform = (baseSpeed) => {
    // Use scrollYProgress as input and apply different speeds based on currentFrame
    return useTransform(scrollYProgress, [0, 1], [
      "0%", 
      // Increase movement speed by multiplier after frame 2
      `${currentFrame >= 2 ? baseSpeed * 2 : baseSpeed}%`
    ]);
  };

  // Dynamic background movement speeds that update when currentFrame changes
  const backgroundY1 = getBackgroundTransform(20); // First background - adjusts based on frame
  const backgroundY2 = getBackgroundTransform(30); // Second background - adjusts based on frame
  const backgroundY3 = getBackgroundTransform(25); // Third background - adjusts based on frame

  // Determine which background layer should be visible based on the current frame
  const showBackgroundOne = currentFrame < 2; // Show background one for frames 0 and 1
  const showBackgroundTwo = currentFrame >= 2; // Show background two for frames 2 and above

  // Handle circle transition completion
  const handleCircleTransitionComplete = (isComplete) => {
    setCircleTransitionComplete(isComplete);
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[3000vh] overflow-hidden"
    >
      {/* First Background Layer - For frames 0-1 */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: backgroundY1,
          opacity: showBackgroundOne ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <BackgroundLayerOne />
      </motion.div>

      {/* Second Background Layer - For frames 2+ */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: backgroundY2,
          opacity: showBackgroundTwo ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <BackgroundLayerTwo />
      </motion.div>

      {/* Third Background Layer - Optional gradient overlay */}
      <motion.div 
        className="fixed inset-0 z-5"
        style={{ y: backgroundY3 }}
      >
        <BackgroundLayerThree />
      </motion.div>

      {/* Text Layer */}
      <div className="fixed inset-0 z-20">
        <TextLayer />
      </div>

      {/* Images Layer */}
      <div className="fixed inset-0 z-30">
        <ImagesLayer />
      </div>

      {/* Expanding Circle Layer */}
      <ExpandingCircleLayer 
        currentFrame={currentFrame}
        isFrameTransition={false}
        transitionProgress={transitionProgress}
        onTransitionComplete={handleCircleTransitionComplete}
      />
    </div>
  );
}