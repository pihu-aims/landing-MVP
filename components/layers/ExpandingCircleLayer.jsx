import React, { useEffect } from 'react';

const ExpandingCircleLayer = ({ currentFrame, isFrameTransition, transitionProgress, onTransitionComplete }) => {
  //   This logic is currently shaky, had to add a 7th frame to make sure the transition completes
  const isActive = currentFrame === 5 || currentFrame === 6; // This layer is active on the 6th frame (index 5)

  let scale = 0;
  let opacity = 0;

  // Trigger the callback when the circle has fully expanded
  useEffect(() => {
    if (isActive && transitionProgress > 0.6) {
      onTransitionComplete && onTransitionComplete(true);
    } else if (!isActive) {
      onTransitionComplete && onTransitionComplete(false);
    }
  }, [isActive, transitionProgress, onTransitionComplete]);

  if (isActive) {
    // Scale rapidly from 0 to 0.5 progress, then maintain full scale
    if (transitionProgress <= 0.5) {
      scale = transitionProgress * 2 * 250; // Max scale of 250 at 0.5 progress
      opacity = transitionProgress * 2; // Opacity from 0 to 1
    } else {
      scale = 250; // Maintain full scale
      opacity = 1; // Maintain full opacity
    }
  }

  return (
    <div
      className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white`}
      style={{
        width: '8px', // Small initial size
        height: '8px', // Small initial size
        zIndex: 50, // Above all other layers
        transformOrigin: 'center center', // Expand from the center
        transform: `scale(${scale})`,
        opacity: opacity, // Dynamic opacity
        transition: 'transform 0.5s ease-linear, opacity 0.5s ease-linear', // Combined transition
      }}
    ></div>
  );
};

export default ExpandingCircleLayer;