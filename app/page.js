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

export default function Home() {
    const { scrollY, currentFrame, isFrameTransition } = useFrameScrollAnimation();
    const [contentHeight, setContentHeight] = useState('500vh'); // For 5 frames

    useEffect(() => {
        setContentHeight(`500vh`); // Adjust height if frames change
    }, []);

    const textOffset = currentFrame * 100; // Each frame = 100vh apart

    return (
        <div className="relative w-full" style={{ height: contentHeight }}>

            {/* Background Layers - scroll with parallax */}
            <div
                className="fixed top-0 left-0 w-full h-full z-0"
                style={{
                    transform: `translateY(-${scrollY * 0.5}px)`,
                    transition: isFrameTransition ? 'transform 1.6s ease-out' : 'transform 0.2s linear',
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
                }}
            >
                <TextLayer />
            </div>

            {/* Text Layer - frame based, no scroll dependency */}
            <div
                className="fixed top-0 left-0 w-full z-20"
                style={{
                    transform: `translateY(-${textOffset}vh)`, // moves by frame only
                    transition: isFrameTransition ? 'transform 0.8s ease-out' : 'none',
                }}
            >
                <ImagesLayer />
            </div>


            {/* Frame indicator (optional) */}
            {/*Hide in production!!!!!!!!!!!*/}
            {isFrameTransition && (
                <div className="fixed bottom-8 right-8 bg-black/60 text-white px-4 py-2 rounded-full z-40 transition-opacity duration-300">
                    Frame {currentFrame + 1}
                </div>
            )}
        </div>
    );
}