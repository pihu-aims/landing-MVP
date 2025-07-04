"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TopBar from './Topbar';
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function ButtonLayer() {

    const [isClient, setIsClient] = useState(false);
    const [frameConfig, setFrameConfig] = useState({
        framePositionMultipliers: [0, 1, 2, 3], // Default: frames at 0, 1x, 2x, and 3x viewport height
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
            framePositionMultipliers: [0, 1, 2, 3] // One multiplier for each content section
        }));
    }, []);

    // Function to handle navigation to a specific frame
    const handleFrameNavigation = (index) => {
        scrollToFrame(index);
    };

    return(

        <div className="fixed top-1/2 right-8 z-50 transform -translate-y-1/2 flex flex-col space-y-4">
            {contentSections.map((_, index) => (
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

    );


}