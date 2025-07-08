import React, { useEffect, useRef } from 'react';

const ExpandingCircleLayer = ({ currentFrame, isFrameTransition, transitionProgress, onTransitionComplete }) => {
    const isActive = currentFrame >= 4 && currentFrame <= 6;

    let scale = 0;

    useEffect(() => {
        if (isActive && transitionProgress > 0.6) {
            onTransitionComplete && onTransitionComplete(true);
        } else if (!isActive) {
            onTransitionComplete && onTransitionComplete(false);
        }
    }, [isActive, transitionProgress, onTransitionComplete]);

    if (isActive) {
        if (transitionProgress <= 0.5) {
            scale = transitionProgress * 2 * 500;
        } else {
            scale = 500;
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
                    transition: 'transform 0.5s ease-linear',
                    opacity: 1,
                }}
            ></div>

            {/* Text */}
            {isActive && (
                <div
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-60 text-center"
                    style={{ opacity: 1 }}
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
