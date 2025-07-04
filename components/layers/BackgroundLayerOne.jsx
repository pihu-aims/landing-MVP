"use client";

import React from "react";

export default function BackgroundLayerOne() {
  return (
    <div className="w-full relative">
      <img
        className="w-full"
        alt="Thumbnail background"
        src="/images/thumbnail-3-3.png"
        loading="eager"
      />
      <div className="absolute bottom-0 left-0 w-full h-[16px] bg-black" />
    </div>
  );
}