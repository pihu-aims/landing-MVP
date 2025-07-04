import React from 'react';

const ExpandingCircleLayer = ({ currentFrame, isFrameTransition, transitionProgress }) => {
  //   This logic is currently shaky, had to add a 7th frame to make sure the transition completes
  const isActive = currentFrame === 5 || currentFrame === 6; // This layer is active on the 6th frame (index 5)

  let scale = 0;
  let opacity = 0;

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
      className={`fixed left-1/2 -translate-x-1/2 rounded-full bg-black`}
      style={{
        width: '10px', // Small initial size
        height: '10px', // Small initial size
        zIndex: 50, // Above all other layers
        transformOrigin: 'bottom center', // Expand from the bottom center
        transform: `translate(-50%, 0) scale(${scale})`,
        bottom: '-5px', // Center of the 10px circle at the bottom of the screen
        opacity: opacity, // Dynamic opacity
        transition: 'transform 0.5s ease-linear, opacity 0.5s ease-linear', // Combined transition
      }}
    ></div>
  );
};

export default ExpandingCircleLayer;