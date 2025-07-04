"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TopBar from './Topbar';
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function TextLayer() {
  const [isClient, setIsClient] = useState(false);
  const [frameConfig, setFrameConfig] = useState({
    framePositionMultipliers: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
    useIntersectionObserver: true,
    transitionDelay: 300,
    scrollPauseDelay: 0, // Disable scroll pausing to fix scrolling issues
    minTimeBetweenTransitions: 300,
    enableSnapToFrame: false, // Disable automatic snap to allow normal scrolling
    scrollSnapThreshold: 0.9
  });

  // Navigation menu items
  const navItems = [
    { name: "Home", active: true },
    { name: "About us", active: false },
    { name: "Works", active: false },
    { name: "Blog", active: false },
    { name: "Contact", active: false },
    { name: "Pricing", active: false },
  ];

  // Content sections data
  const contentSections = [
    {
      id: "studio1",
      title: "Studio1",
      subtitle: "Create Together",
      heading: "Our Vision: Empowering the Next Billion Storytellers",
      description:
        "Anyone can become a creator. By simplifying powerful AI tools, we give people the freedom to tell stories quickly, confidently, and with full control.",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-screen",
      imagePosition: "right", // Image position for this frame
    },
    {
      id: "what-we-built",
      title: "What We've Built",
      subtitle: "All the Best Creative AI Tools. One Place.",
      description:
        "We combine the best creative AI tools in one easy workspace.\nMake content, collaborate, monetize, and stay safe.\nAll in one place, with one subscription.",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-screen",
      imagePosition: "left", // Image position for this frame
    },
    {
      id: "who-its-for",
      title: "Who It's For",
      subtitle: "Studio1 is for Everyone Ready to Create",
      description:
        "We built this for filmmakers, students, influencers, designers and\nanyone with a story to tell.\nNo code needed. Just your ideas and our tools.",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-screen",
      imagePosition: "right", // Image position for this frame
    },
    {
      id: "who-we-are",
      title: "Who We Are",
      subtitle: "Creative Vision Meets Technical Firepower",
      description:
        "We're a team of BAFTA-winning creators, AI experts, and proven operators.\nWe know how to build, ship and scale creative tech.",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-screen",
      imagePosition: "left", // Image position for this frame
    },
  ];

  const { 
    currentFrame, 
    registerFrame, 
    isFrameTransition, 
    scrollToFrame,
    transitionProgress 
  } = useFrameScrollAnimation(frameConfig);

  // Set isClient to true when component mounts to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
    
    // Update frame config based on viewport height
    const viewportHeight = window.innerHeight;
    setFrameConfig(prev => ({
      ...prev,
      framePositionMultipliers: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30] // One multiplier for each content section
    }));
  }, []);

  // Function to handle navigation to a specific frame
  const handleFrameNavigation = (index) => {
    scrollToFrame(index);
  };

  // Only render on client side to avoid hydration mismatch
  if (!isClient) return null;

  return (
    <div className="w-full h-full">
      {/* Navigation buttons for frame navigation */}
      <div className="fixed top-1/2 right-8 z-50 transform -translate-y-1/2 flex flex-col space-y-4">
        {frameConfig.framePositionMultipliers.map((_, index) => (
          <button
            key={`nav-${index}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentFrame === index ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-200'
            }`}
            onClick={() => handleFrameNavigation(index)}
            aria-label={`Navigate to frame ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Sections */}
      {contentSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          ref={(el) => registerFrame(index, el)}
          className={`w-full ${section.height} ${section.bgColor} relative flex items-center`}
        >
          <div className="container mx-auto px-8 h-full flex items-center">
            <div 
              className={`max-w-2xl ${section.imagePosition === 'right' ? '' : 'ml-auto'}`}
              style={{
                opacity: Math.abs(currentFrame - index) <= 1 ? 1 - Math.abs(currentFrame - index) * 0.3 : 0.4,
                transform: `translateY(${isFrameTransition && currentFrame === index ? '5px' : '0px'})`,
                transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
              }}
            >
              <h2 
                className={`text-5xl font-bold mb-4 ${section.textColor}`}
                style={{
                  transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
                }}
              >
                {section.title}
              </h2>
              <h3 
                className={`text-3xl font-bold mb-6 ${section.textColor}`}
                style={{
                  transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
                }}
              >
                {section.subtitle}
              </h3>
              {index === 0 ? (
                <>
                  <p 
                    className={`text-xl whitespace-pre-line ${section.textColor}`}
                    style={{
                      transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
                    }}
                  >
                    {section.heading}
                  </p>
                  <p 
                    className={`text-xl mt-6 whitespace-pre-line ${section.textColor}`}
                    style={{
                      transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
                    }}
                  >
                    {section.description}
                  </p>
                </>
              ) : (
                <p 
                  className={`text-xl whitespace-pre-line ${section.textColor}`}
                  style={{
                    transition: isFrameTransition ? 'all 0.4s ease-out' : 'all 0.2s',
                  }}
                >
                  {section.description}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Spacer divs for scroll snapping - these create the scrollable area */}
      <div className="relative">
        {Array(11).fill(null).map((_, index) => (
          <div 
            key={`spacer-${index}`} 
            className="w-full h-screen"
            style={{ visibility: 'hidden' }}
          />
        ))}
      </div>
    </div>
  );
}