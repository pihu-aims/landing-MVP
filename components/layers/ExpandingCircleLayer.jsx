import React, { useEffect, useRef } from 'react';

const ExpandingCircleLayer = ({ currentFrame, isFrameTransition, transitionProgress, onTransitionComplete }) => {
    const isActive = currentFrame >= 4 && currentFrame <= 6;

    let scale = 0;
    // Calculate text opacity based on transition progress
    let textOpacity = 1;

    useEffect(() => {
        // Trigger completion earlier (0.5 instead of 0.6) for faster transition
        if (isActive && transitionProgress > 0.5) {
            onTransitionComplete && onTransitionComplete(true);
        } else if (!isActive) {
            onTransitionComplete && onTransitionComplete(false);
        }
    }, [isActive, transitionProgress, onTransitionComplete]);

    if (isActive) {
        if (transitionProgress <= 0.4) { // Speed up scale transition by completing at 0.4 instead of 0.5
            scale = transitionProgress * 2.5 * 500; // Faster scaling (2.5x instead of 2x)
        } else {
            scale = 500;
        }
        
        // Calculate text opacity - fade out text as circle expands
        if (transitionProgress <= 0.3) {
            textOpacity = 1; // Text fully visible initially
        } else if (transitionProgress > 0.3 && transitionProgress < 0.7) {
            // Linear fade out between 0.3 and 0.7 progress points
            textOpacity = 1 - ((transitionProgress - 0.3) / 0.4);
        } else {
            textOpacity = 0; // Text fully invisible after 0.7 progress
        }
    }

    const offsetLeft = 4.25
    const offsetTop = 0.5

    return (
        <>
            {/* Expanding circle positioned exactly at the "o" */}
            <div
                className="fixed z-50 rounded-full bg-white"
                style={{
                    width: '8px',
                    height: '8px',
                    transformOrigin: 'center center',
                    top: `calc(50% + ${offsetTop}rem)`,
                    left:`calc(50% + ${offsetLeft}rem)`, // 👈 Adjust this offset to match the "o" position
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transition: 'transform 0.35s ease-out', // Faster transition with ease-out for smoother feel
                    opacity: 1,
                }}
            ></div>

            {/* Text */}
            {isActive && (
                <div
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-60 text-center"
                    style={{ 
                        opacity: textOpacity,
                        transition: 'opacity 0.4s ease-out' // Add transition for smooth opacity changes
                    }}
                >
                    {/* Outer white text */}
                    <h1
                        className="font-bold text-white"
                        style={{
                            fontSize: "7.21rem", // 👈 Custom font size
                            lineHeight: "1.1",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Let The Story Begin
                    </h1>

                    {/* Inner black text clipped by circle */}
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            clipPath: `circle(${scale * 4}px at calc(50% + ${offsetLeft}rem) 50%)`,
                        }}
                    >
                        <h1
                            className="font-bold text-black"
                            style={{
                                fontSize: "7.21rem", // 👈 Same custom font size
                                lineHeight: "1.1",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Let The Story Begin
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpandingCircleLayer;
