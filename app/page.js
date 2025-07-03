"use client";

// app/page.js
// app/page.js
import ImagesLayer from '../components/layers/ImagesLayer';
import TextLayer from '../components/layers/TextLayer';
import BackgroundLayerOne from '../components/layers/BackgroundLayerOne';
import BackgroundLayerTwo from '../components/layers/BackgroundLayerTwo';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Home() {
  const scrollY = useScrollAnimation();

  return (
    <div className="relative w-full">
      {/* Background Layers - scroll at 0.5x speed */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          transform: `translateY(${-scrollY * 0.5}px)`
        }}
      >
        <BackgroundLayerOne />
        <BackgroundLayerTwo />
      </div>

      {/* Content Layers - scroll at 1x speed */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          transform: `translateY(${-scrollY * 1}px)`
        }}
      >
        {/* Images Layer */}
        <div className="absolute inset-0">
          <ImagesLayer />
        </div>

        {/* Text Layer */}
        <div className="absolute inset-0">
          <TextLayer />
        </div>
      </div>
    </div>
  );
}