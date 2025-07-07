"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TopBar from './Topbar';
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function TextLayer() {
  const [isClient, setIsClient] = useState(false)
  const prevFrame = useRef(null); // store previous frame index
  // This is an animation lock
  const [isNavigating, setIsNavigating] = useState(false);



  const [frameConfig, setFrameConfig] = useState({
    framePositionMultipliers: [0, 1, 2, 3,4,5], // Default: frames at 0, 1x, 2x, and 3x viewport height
    useIntersectionObserver: true,
    transitionDelay: 600,
    scrollPauseDelay: 400,
    minTimeBetweenTransitions: 500,
    enableSnapToFrame: true,
    scrollSnapThreshold: 0.3
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
      // Alignment variables
      positionPercentTop: 50,
      positionPercentLeft: 30
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
      // Alignment variables
      positionPercentTop: 65,
      positionPercentLeft: 70,

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
    {
      id: "get-started",
      title: "Get Started",
      subtitle: "Start Creating Today",
      description:
          "Join our community and start bringing your stories to life.\nSign up for early access and be the first to experience the future of content creation.",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-screen",
      imagePosition: "right", // Image position for this frame
    },
  ];

  const {
    currentFrame,
    registerFrame,
    isFrameTransition,
    scrollToFrame,
    transitionProgress
  } = useFrameScrollAnimation(frameConfig);

  useEffect(() => {
    setIsClient(true);
    setFrameConfig(prev => ({
      ...prev,
      framePositionMultipliers: [0, 1, 2, 3,4,5]
    }));
  }, []);

  // Handle navigation
  const handleFrameNavigation = (index) => {
    scrollToFrame(index);
  };

  // 🔥 Auto trigger when scroll crosses into a new frame
  useEffect(() => {
    if (
        prevFrame.current !== null &&
        prevFrame.current !== currentFrame &&
        !isNavigating // Prevent if already snapping
    ) {
      setIsNavigating(true);
      handleFrameNavigation(currentFrame);
      setTimeout(() => setIsNavigating(false), 700); // match transition duration
    }


    prevFrame.current = currentFrame;
  }, [currentFrame]); // runs every time scroll updates currentFrame

  if (!isClient) return null;

  // Style strings for reusability
  const frameTransitionAnimationTrue = 'all 0.5s ease-out';
  const frameTranstionAnimationFalse = 'all 0.2s';

  return (
      <div className="w-full h-full">

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
                    className={`max-w-2xl absolute ${section.imagePosition === 'right' ? '' : 'ml-auto'}`}
                    style={{
                      top: `${section.positionPercentTop || 0}vh`,        // Vertical center position
                      left: `${section.positionPercentLeft || 0}vw`,      // Horizontal center position
                      transform: `translate(-50%, -50%)          
                        ${isFrameTransition && currentFrame === index ? 'translateY(5px)' : ''}`,
                      opacity: Math.abs(currentFrame - index) <= 1
                          ? 1 - Math.abs(currentFrame - index) * 0.3
                          : 0.4,
                      transition: isFrameTransition
                          ? frameTransitionAnimationTrue
                          : frameTranstionAnimationFalse,
                    }}
                >

                <h2
                      className={`text-5xl font-bold mb-4 ${section.textColor}`}
                      style={{
                        transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                      }}
                  >
                    {section.title}
                  </h2>
                  <h3
                      className={`text-3xl font-bold mb-6 ${section.textColor}`}
                      style={{
                        transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                      }}
                  >
                    {section.subtitle}
                  </h3>
                  {index === 0 ? (
                      <>
                        <p
                            className={`text-xl whitespace-pre-line ${section.textColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                            }}
                        >
                          {section.heading}
                        </p>
                        <p
                            className={`text-xl mt-6 whitespace-pre-line ${section.textColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                            }}
                        >
                          {section.description}
                        </p>
                      </>
                  ) : (
                      <p
                          className={`text-xl whitespace-pre-line ${section.textColor}`}
                          style={{
                            transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
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
          {contentSections.map((_, index) => (
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