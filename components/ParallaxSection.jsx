"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import the background layer you've already converted
import BackgroundLayerOne from './layers/BackgroundLayerOne';
// You can uncomment these when you create them
// import TextLayer from './layers/TextLayer';
// import ImagesLayer from './layers/ImagesLayer';

export default function ParallaxSection() {
  // Reference to the container element for scroll tracking
  const containerRef = useRef(null);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Start tracking when container enters viewport, end when it leaves
  });

  // Transform values for each layer - adjust percentages to control movement speed
  // Lower percentage = slower movement, higher percentage = faster movement
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // First background - very slow
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Second background - slow
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);        // Medium
  const imagesY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);     // Fastest

  return (
    <div 
      ref={containerRef}
      className="relative h-[100vh] overflow-hidden"
    >
      {/* First Background Layer - Slowest Movement */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY1 }}
      >
        {/* Use your converted background layer */}
        <BackgroundLayerOne />
      </motion.div>

      {/* Second Background Layer - Slow Movement */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ y: backgroundY2 }}
      >
        {/* Replace with your second background layer when ready */}
        <div className="w-full h-full bg-gradient-to-b from-transparent via-purple-900/30 to-transparent">
          {/* Placeholder for second background content */}
        </div>
      </motion.div>

      {/* Text Layer - Medium Movement */}
      <motion.div 
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ y: textY }}
      >
        {/* Replace this with your TextLayer component when ready */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Your Headline</h2>
          <p className="text-xl text-cyan-300 max-w-md mx-auto">
            Your compelling description goes here. This text will move at a medium speed.
          </p>
        </div>
      </motion.div>

      {/* Images Layer - Fastest Movement */}
      <motion.div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ y: imagesY }}
      >
        {/* Replace this with your ImagesLayer component when ready */}
        <div className="relative w-full h-full">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-cyan-500 rounded-full opacity-70"></div>
          <div className="absolute top-[50%] right-[15%] w-48 h-48 bg-purple-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-[15%] left-[30%] w-24 h-24 bg-yellow-500 rounded-full opacity-80"></div>
        </div>
      </motion.div>
    </div>
  );
}