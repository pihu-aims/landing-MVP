"use client";

import TopBar from '../components/layers/Topbar';
import ButtonLayer from "../components/layers/ButtonLayer";
import TextLayer from '../components/layers/TextLayer';
import BackgroundLayerOne from '../components/layers/BackgroundLayerOne';
import BackgroundLayerTwo from '../components/layers/BackgroundLayerTwo';
import BackgroundLayerThree from '../components/layers/BackgroundLayerThree';
import useFrameScrollAnimation from '../hooks/useFrameScrollAnimation';
import { useEffect, useState } from 'react';
import ImagesLayer from "@/components/layers/ImagesLayer";
import ExpandingCircleLayer from "@/components/layers/ExpandingCircleLayer";
import WaitlistPage from "@/components/WaitlistPage";

export default function Home() {
    const { scrollY, currentFrame, isFrameTransition, transitionProgress } = useFrameScrollAnimation();
    const [contentHeight, setContentHeight] = useState('700vh'); // For 7 frames
    const [showWaitlist, setShowWaitlist] = useState(false);

    useEffect(() => {
        setContentHeight(`700vh`); // Adjust height if frames change
    }, []);

    const textOffset = currentFrame * 100; // Each frame = 100vh apart

    // Handle the transition completion from the expanding circle
    const handleTransitionComplete = (isComplete) => {
        setShowWaitlist(isComplete);
    };

    return (
        <div className="relative w-full" style={{ height: contentHeight }}>

            {/* Background Layers - scroll with parallax */}
            <div
                className="fixed top-0 left-0 w-full h-full z-0"
                style={{
                    transform: `translateY(-${scrollY * 0.4}px)`,
                    transition: isFrameTransition ? 'transform 1.6s ease-out' : 'transform 0.2s linear',
                    opacity: 1 // Ensure backgrounds are always fully visible
                }}
            >
                <BackgroundLayerOne />
                <BackgroundLayerTwo />
                <BackgroundLayerThree />
            </div>

            {/* Fixed TopBar */}
            <div className="fixed top-0 left-0 w-full z-30">
                <TopBar />
            </div>

            {/* Text Layer - frame based, no scroll dependency */}
            <div
                className="fixed top-0 left-0 w-full z-20"
                style={{
                    transform: `translateY(-${textOffset}vh)`, // moves by frame only
                    transition: isFrameTransition ? 'transform 1.2s ease-out' : 'none',
                    opacity: 1 // Ensure text is always fully visible
                }}
            >
                <TextLayer />
            </div>

            {/* Images Layer - frame based, no scroll dependency */}
            <div
                className="fixed top-0 left-0 w-full z-20"
                style={{
                    transform: `translateY(-${textOffset}vh)`, // moves by frame only
                    transition: isFrameTransition ? 'transform 0.8s ease-out' : 'none',
                    opacity: 1 // Ensure images are always fully visible
                }}
            >
                <ImagesLayer />
            </div>


            {/* Frame indicator (optional) */}
            {/*Hide in production!!!!!!!!!!!*/}
            {isFrameTransition && (
                <div className="fixed bottom-8 right-8 bg-black/60 text-white px-4 py-2 rounded-full z-40">
                    Frame {currentFrame + 1}
                </div>
            )}

            {/* Expanding Circle Layer */}
            <ExpandingCircleLayer 
                currentFrame={currentFrame} 
                isFrameTransition={isFrameTransition} 
                transitionProgress={transitionProgress} 
                onTransitionComplete={handleTransitionComplete}
            />

            {/* Waitlist Page - appears after circle transition */}
            <WaitlistPage isVisible={showWaitlist} />
        </div>
    );
}