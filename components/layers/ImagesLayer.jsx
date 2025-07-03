"use client";

import React from "react";

// Image data with positions matching Figma design exactly
const imageData = [
  {
    id: "image-1",
    src: "/images/a.png",
    alt: "Image 1",
    className: "absolute w-[200px] h-[200px] top-[247px] right-[300px] object-cover rounded-lg shadow-md",
  },
  {
    id: "image-2",
    src: "/images/b.png",
    alt: "Image 2",
    className: "absolute w-[230px] h-[200px] top-[982px] left-[236px] object-cover rounded-lg shadow-md",
  },
  {
    id: "image-3",
    src: "/images/c.png",
    alt: "Image 3",
    className: "absolute w-[200px] h-[200px] top-[1560px] right-[250px] object-cover rounded-lg shadow-md",
  },
  {
    id: "image-4",
    src: "/images/d.png",
    alt: "Image 4",
    className: "absolute w-[200px] h-[200px] top-[1809px] left-[88px] object-cover rounded-lg shadow-md",
  },
  {
    id: "image-5",
    src: "/images/e.png",
    alt: "Image 5",
    className: "absolute w-[200px] h-[230px] top-[2313px] left-[230px] object-cover rounded-lg shadow-md",
  },
];

export default function ImagesLayer() {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full z-20 pointer-events-none">
      <div className="w-[1440px] h-[4096px] relative">
        {imageData.map((image) => (
          <img
            key={image.id}
            className={image.className}
            alt={image.alt}
            src={image.src}
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}