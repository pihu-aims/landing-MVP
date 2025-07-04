"use client";

import useScrollAnimation from '../hooks/useScrollAnimation';
import TopBar from '../components/layers/Topbar';
import BackgroundLayerOne from '../components/layers/BackgroundLayerOne';
import BackgroundLayerTwo from '../components/layers/BackgroundLayerTwo';
import ImagesLayer from '../components/layers/ImagesLayer';
import TextLayer from '../components/layers/TextLayer';
import { useEffect } from 'react';

export default function Home() {
    const scrollY = useScrollAnimation();

    // Log scrollY whenever it updates
    useEffect(() => {
        console.log('scrollY:', scrollY);
    }, [scrollY]);

    return (
        <div className="relative w-full h-[calc(var(--bg-total-height))]">
            {/* Scrollable Background (parallax effect) */}
            <div
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{ transform: `translateY(${-scrollY * 0.5}px)` }} // slower background movement
            >
                <BackgroundLayerOne />
                <BackgroundLayerTwo />
            </div>

            {/* Fixed TopBar – always stays at top */}
            <TopBar />

            {/* Scrollable Content Layers */}
            <div
                className="absolute top-0 left-0 w-full h-full z-10"
                style={{ transform: `translateY(${-scrollY}px)` }} // scrolls at normal speed
            >
                <div className="absolute inset-0">
                    <ImagesLayer />
                </div>
                <div className="absolute inset-0">
                    <TextLayer />
                </div>
            </div>
        </div>
    );
}
