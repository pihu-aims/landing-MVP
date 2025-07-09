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
    framePositionMultipliers: [0, 2 , 5.0, 8.0, 12.0, 16.0], // Match the updated positions in useFrameScrollAnimation
    useIntersectionObserver: false, // Disable intersection observer to match hook
    transitionDelay: 600,
    scrollPauseDelay: 400,
    minTimeBetweenTransitions: 500,
    enableSnapToFrame: false, // Disable snap-to-frame to match hook
    scrollSnapThreshold: 0.2
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
      title: "Studio 1",

      subtitle: "Create Together",

      heading: "Our Vision: Empowering the Next Billion Storytellers",
      description:
          "Anyone can become a creator. By simplifying powerful AI tools, we give people the freedom to tell stories quickly, confidently, and with full control.",
      bgColor: "bg-transparent",
      titleColor: "text-white",
      subTitleColor: "text-black",
      headingColor: "text-black",
      descriptionColor: "text-black",
      height: "h-screen",
      // Alignment variables
      positionPercentTop: 49.5,
      positionPercentLeft: 30,
      maxWidth: 60,
      prefWidth: 60,
      minWidth: 60,
    },
    {
      id: "what-we-built",
      title: "What We've Built",
      subtitle: "All the Best Creative AI Tools. One Place.",
      description:
          "We combine the best creative AI tools in one easy workspace.\nMake content, collaborate, monetize, and stay safe.\nAll in one place, with one subscription.",
      bgColor: "bg-transparent",
      titleColor: "text-white",
      subTitleColor: "text-white",
      headingColor: "text-white",
      descriptionColor: "text-white",
      height: "h-screen",
      // Alignment variables
      positionPercentTop: 63,
      positionPercentLeft: 65,
      maxWidth: 65,
      prefWidth: 65,
      minWidth: 65,
    },
    {
      id: "who-its-for",
      title: "Who It's For",
      subtitle: "Studio1 is for Everyone Ready to Create",
      description:
          "We built this for filmmakers, students, influencers, designers and\nanyone with a story to tell.\nNo code needed. Just your ideas and our tools.",
      bgColor: "bg-transparent",
      titleColor: "text-white",
      subTitleColor: "text-white",
      headingColor: "text-white",
      descriptionColor: "text-white",
      height: "h-screen",
      // Alignment variables

      positionPercentTop: 20,
      positionPercentLeft: 28,
      maxWidth: 60,
      prefWidth: 60,
      minWidth: 60,

    },
    {
      id: "who-we-are",
      title: "Who We Are",
      subtitle: "Creative Vision Meets Technical Firepower",
      description:
          "We're a team of BAFTA-winning creators, AI experts and proven operators.\nWe know how to build, ship and scale creative tech.",
      bgColor: "bg-transparent",
      titleColor: "text-black",
      subTitleColor: "text-black",
      headingColor: "text-black",
      descriptionColor: "text-black",
      height: "h-screen",
      // Alignment variables
      positionPercentTop: 75,
      positionPercentLeft: 75.5,
      maxWidth: 60,
      prefWidth: 60,
      minWidth: 60,
    },
    {
      id: "spacer-frame",
      title: "",
      subtitle: "",
      description: "",
      bgColor: "bg-transparent",
      titleColor: "text-white",
      subTitleColor: "text-white",
      headingColor: "text-white",
      descriptionColor: "text-white",
      height: "h-screen",
      // Alignment variables - position off-screen so it’s not visible
      positionPercentTop: -100,
      positionPercentLeft: -100,
      maxWidth: 0,
      prefWidth: 0,
      minWidth: 0,
    },
    {
      id: "spacer-frame2",
      title: "",
      subtitle: "",
      description: "",
      bgColor: "bg-transparent",
      titleColor: "text-white",
      subTitleColor: "text-white",
      headingColor: "text-white",
      descriptionColor: "text-white",
      height: "h-screen",
      // Alignment variables - position off-screen so it’s not visible
      positionPercentTop: -100,
      positionPercentLeft: -100,
      maxWidth: 0,
      prefWidth: 0,
      minWidth: 0,
    }


    // {
    //   id: "get-started",
    //   title: "Get Started",
    //   subtitle: "Start Creating Today",
    //   description:
    //       "Join our community and start bringing your stories to life.\nSign up for early access and be the first to experience the future of content creation.",
    //   bgColor: "bg-transparent",
    //   titleColor: "text-white",
    //   subTitleColor: "text-white",
    //   headingColor: "text-white",
    //   descriptionColor: "text-white",
    //   height: "h-screen",
    //   // Alignment variables
    //   positionPercentTop: 50,
    //   positionPercentLeft: 50,
    //   maxWidth: 100
    // },
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
      framePositionMultipliers: [0, 2 , 5.0, 8.0, 12.0, 16.0],
      useIntersectionObserver: false,
      enableSnapToFrame: false
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
  const scalingFontSizeTitle = `clamp(2rem, 5vw, 6rem)`;
  const scalingFontSizeSubtitle = `clamp(1.5rem, 3vw, 3.5rem)`
  const scalingFontSizeHeading = `clamp(1.25rem, 2.5vw, 2.5rem)`
  const scalingFontSizeDescription = `clamp(1rem, 1.8vw, 1.8rem)`

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
                    className={`max-w-2xl absolute`}
                    style={{
                      top: `${section.positionPercentTop || 0}vh`,        // Vertical center position
                      left: `${section.positionPercentLeft || 0}vw`,      // Horizontal center position
                      transform: `translate(-50%, -50%)          
                        ${isFrameTransition && currentFrame === index ? 'translateY(5px)' : ''}`,
                      opacity: 1,
                      //opacity: Math.abs(currentFrame - index) <= 1
                          //? 1 - Math.abs(currentFrame - index) * 0.3
                          //: 0.4,
                      transition: isFrameTransition
                          ? frameTransitionAnimationTrue
                          : frameTranstionAnimationFalse,
                      maxWidth: `clamp(${section.minWidth || 30}vh, ${section.prefWidth || 50}vh, ${section.maxWidth || 80}vh)`, // 👈 Max width as % of viewport height
                    }
                }
                >

                {index === 0 ? (
                  <>
                    <h2
                      className={`text-8xl mb-1 ${section.titleColor}`}
                      style={{
                        transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                        fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                        fontWeight: "700"
                      }}
                    >
                      {section.title}
                    </h2>
                  </>
                ) : (index !== 1 && index !== 2 && index !== 3) ? (
                  <h2
                    className={`text-5xl font-bold mb-4 ${section.titleColor}`}
                    style={{
                      transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                      fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em"
                    }}
                  >
                    {section.title}
                  </h2>
                ) : null}
                  {index === 0 ? (
                    <h3
                      className={`text-7xl mb-6 ${section.subTitleColor}`}
                      style={{
                        transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                        fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                        fontWeight: "500",
                        marginTop: "-8px"
                      }}
                    >
                      {section.subtitle}
                    </h3>
                  ) : (index !== 1 && index !== 2 && index !== 3) ? (
                    <h3
                      className={`text-4xl mb-2 ${section.subTitleColor}`}
                      style={{
                        transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                        fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em"
                      }}
                    >
                      {section.subtitle}
                    </h3>
                  ) : null}
                  {index === 0 ? (
                      <>
                        <p
                            className={`text-3xl whitespace-nowrap ${section.headingColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              marginBottom: "8px",
                              fontWeight: "600"
                            }}
                        >
                          {section.heading}
                        </p>
                        <p
                            className={`text-xl mt-1 whitespace-pre-line ${section.descriptionColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em"
                            }}
                        >
                          {section.description}
                        </p>
                      </>
                  ) : index === 1 ? (
                      <div>
                        <h2
                            className={`text-7xl font-bold mb-2 ${section.titleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "700",
                              marginBottom: "24px"
                            }}
                        >
                          {section.title}
                        </h2>
                        <h3
                            className={`text-3xl mb-4 ${section.subTitleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "600",
                              marginBottom: "12px"
                            }}
                        >
                          {section.subtitle}
                        </h3>
                        <p
                            className={`text-base whitespace-pre-line ${section.descriptionColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              lineHeight: "1.5"
                            }}
                        >
                          {section.description}
                        </p>
                      </div>
                  ) : index === 2 ? (
                      <div>
                        <h2
                            className={`text-7xl font-bold mb-2 ${section.titleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "600",
                              marginBottom: "24px"
                            }}
                        >
                          {section.title}
                        </h2>
                        <h3
                            className={`text-2xl mb-4 ${section.subTitleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "600",
                              marginBottom: "12px"
                            }}
                        >
                          {section.subtitle}
                        </h3>
                        <p
                            className={`text-base whitespace-pre-line ${section.descriptionColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              lineHeight: "1.5"
                            }}
                        >
                          {section.description}
                        </p>
                      </div>
                  ) : index === 3 ? (
                      <div>
                        <h2
                            className={`text-7xl font-bold mb-2 ${section.titleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "600",
                              marginBottom: "24px"
                            }}
                        >
                          {section.title}
                        </h2>
                        <h3
                            className={`text-3xl mb-4 ${section.subTitleColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              fontWeight: "600",
                              marginBottom: "12px"
                            }}
                        >
                          {section.subtitle}
                        </h3>
                        <p
                            className={`text-base whitespace-pre-line ${section.descriptionColor}`}
                            style={{
                              transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                              fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em",
                              lineHeight: "1.5"
                            }}
                        >
                          {section.description}
                        </p>
                      </div>
                  ) : (
                      <p
                          className={`text-xl whitespace-pre-line ${section.descriptionColor}`}
                          style={{
                            transition: isFrameTransition ? frameTransitionAnimationTrue : frameTranstionAnimationFalse,
                            fontFamily: "var(--font-apparat), system-ui, sans-serif", letterSpacing: "-0.01em"
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