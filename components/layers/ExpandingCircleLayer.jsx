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

    const offset = 3.6

    return (
        <>
            {/* Expanding circle positioned exactly at the "o" */}
            <div
                className="fixed z-50 rounded-full bg-white"
                style={{
                    width: '8px',
                    height: '8px',
                    transformOrigin: 'center center',
                    top: '50%',
                    left:`calc(50% + ${offset}rem)`, // 👈 Adjust this offset to match the "o" position
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
                    <h1 className="text-8xl font-bold text-white">Let The Story Begin</h1>

                    {/* Inner black text clipped by circle */}
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            clipPath: `circle(${scale * 4}px at calc(50% + ${offset}rem) 50%)`, // 👈 Same offset for clipPath
                        }}
                    >
                        <h1 className="text-8xl font-bold text-black">Let The Story Begin</h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpandingCircleLayer;
