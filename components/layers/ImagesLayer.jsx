"use client";

import React, { useEffect, useState } from "react";
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function ImagesLayer() {
  const [isClient, setIsClient] = useState(false);
  const { currentFrame, isFrameTransition } = useFrameScrollAnimation();
  const [scaleMultiplier, setScaleMultiplier] = useState(1); // Scaling of iamges

  useEffect(() => {
    const handleResize = () => {
      const baselineWidth = 1920; // Fullscreen baseline
      const currentWidth = window.innerWidth;

      // Scale proportionally
      const multiplier = currentWidth / baselineWidth;
      setScaleMultiplier(multiplier);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation settings
  const frameTransitionAnimationTrue = 'all 0.5s ease-out';
  const frameTransitionAnimationFalse = 'all 0.2s linear';

  const contentVideos = [
    {
      id: "video-a",
      src: "/videos/a.mp4",
      alt: "Video A: Our Vision",
      positionPercentTop: 50,  //down from viewport top
      positionPercentLeft: 70, //from left edge
      scale: 1.9, // The scale is the scale from the image resolution (in terms of pixels)
      width: 475,              // px (optional)
      frame: 1, // which frame it appears on

      borderRadius: `44px`,
      border: `3px solid white`,

    },
  ]
  // Array of images with their position/scale
  const contentImages = [
    // {
    //   id: "image-a",
    //   src: "/images/a.png",
    //   alt: "Image A - Our Vision",
    //   positionPercentTop: 50,  //down from viewport top
    //   positionPercentLeft: 70, //from left edge
    //   scale: 1.9, // The scale is the scale from the image resolution (in terms of pixels)
    //   width: 475,              // px (optional)
    //   frame: 1, // which frame it appears on
    // },
    {
      id: "image-b",
      src: "/images/b.png",
      alt: "Image B - What We've Built",
      positionPercentTop: 38,
      positionPercentLeft: 35,
      scale: 1.75,
      width: 480,
      frame: 2,
    },
    /*
    {
      id: "image-c",
      src: "/images/c.png",
      alt: "Image C - Who It's For",

      positionPercentTop: 28,
      positionPercentLeft: 85,
      scale: 1.5,
      width: 380,
      frame: 3,
    },
    */
    {
      id: "image-d",
      src: "/images/d.png",
      alt: "Image D - Who We Are",
      positionPercentTop: 70,
      positionPercentLeft: 17,
      scale: 1.5,
      width: 410,
      frame: 3,
    },
    {
      id: "image-e",
      src: "/images/e.png",
      alt: "Image E - Additional Content",
      positionPercentTop: 50,
      positionPercentLeft: 25,
      scale: 2,
      width: 460,
      frame: 4,
    },
  ];

  // Set isClient on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (

      // Images content
      <div className="fixed top-0 left-0 w-full h-full z-25 pointer-events-none">

        {/* Render Videos */}
        {contentVideos.map((video, index) => (
            <video
                key={video.id}
                src={video.src}
                className="absolute rounded-3xl shadow-lg"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  top: `${((video.frame - 1) * 100) + video.positionPercentTop}vh`,   // Center vertically
                  // Also accounts for frame as well and frame index starts at 1
                  left: `${video.positionPercentLeft}vw`, // Center horizontally
                  width: `${video.width}px`,
                  height: 'auto',
                  transform: `
              translate(-50%, -50%)             /* Center the image */
              scale(${video.scale * (scaleMultiplier * 0.80) || 1})        /* Scale the image */
              ${isFrameTransition && currentFrame === index ? 'translateY(5px)' : ''}
            `,
                  opacity: 1,
                  //opacity: currentFrame === (image.frame-1) ? 1 : 0.5,
                  transition: isFrameTransition
                      ? frameTransitionAnimationTrue
                      : frameTransitionAnimationFalse,

                  // Optional fields with a default empty
                  borderRadius: video.borderRadius ?? ``,
                  border: video.border ?? ``,
                }}
            />
        ))}

        {contentImages.map((image, index) => (
            <img
                key={image.id}
                src={image.src}
                alt={image.alt}
                className="absolute object-cover rounded-3xl shadow-lg"
                style={{
                  top: `${((image.frame - 1) * 100) + image.positionPercentTop}vh`,   // Center vertically
                  // Also accounts for frame as well and frame index starts at 1
                  left: `${image.positionPercentLeft}vw`, // Center horizontally
                  width: `${image.width}px`,
                  height: 'auto',
                  transform: `
              translate(-50%, -50%)             /* Center the image */
              scale(${image.scale * (scaleMultiplier * 0.80) || 1})        /* Scale the image */
              ${isFrameTransition && currentFrame === index ? 'translateY(5px)' : ''}
            `,
                  opacity: 1,
                  //opacity: currentFrame === (image.frame-1) ? 1 : 0.5,
                  transition: isFrameTransition
                      ? frameTransitionAnimationTrue
                      : frameTransitionAnimationFalse,
                }}
            />
        ))}
      </div>
  );
}
