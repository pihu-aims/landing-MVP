"use client";

// app/page.js
import TopBar from '../components/layers/Topbar';
import ImagesLayer from '../components/layers/ImagesLayer';
import TextLayer from '../components/layers/TextLayer';
import BackgroundLayerOne from '../components/layers/BackgroundLayerOne';
import BackgroundLayerTwo from '../components/layers/BackgroundLayerTwo';
import BackgroundLayerThree from '../components/layers/BackgroundLayerThree';
import useFrameScrollAnimation from '../hooks/useFrameScrollAnimation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollY, currentFrame, isFrameTransition } = useFrameScrollAnimation();
  const [contentHeight, setContentHeight] = useState('400vh'); // Default height for 4 frames

  // Set the total height of the content based on the number of frames
  useEffect(() => {
    // Assuming 4 frames, each taking 100vh
    setContentHeight(`400vh`);
  }, []);

  return (
    <div className="relative w-full" style={{ height: contentHeight }}>
      {/* Background Layers - stacked one after another */}
      <div className="relative">
        {/* Background Layer One - First visible */}
        <div className="w-full h-screen">
          <BackgroundLayerOne />
        </div>

        {/* Background Layer Two - positioned directly below Layer One */}
        <div className="w-full h-screen">
          <BackgroundLayerTwo />
        </div>
      </div>

      {/* TopBar so it's fixed */}
      <div className="fixed top-0 left-0 w-full z-30">
        <TopBar />
      </div>

      {/* Images Layer - positioned directly */}
      <ImagesLayer />

      {/* Text Layer - scroll at 1x speed */}
      <div
        className="absolute top-0 left-0 w-full z-10"
        style={{
          transform: `translateY(${-scrollY * 1}px)`,
          transition: isFrameTransition ? 'transform 0.6s ease-out' : 'transform 0.2s linear',
        }}
      >
        <TextLayer />
      </div>
      
      {/* Frame indicator (optional) */}
      {isFrameTransition && (
        <div className="fixed bottom-8 right-8 bg-black/60 text-white px-4 py-2 rounded-full z-40 transition-opacity duration-300">
          Frame {currentFrame + 1}
        </div>
      )}
    </div>
  );
}