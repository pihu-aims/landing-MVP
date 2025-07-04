"use client";

import React from "react";

export default function ExpandingCircleLayer({ circleExpansionProgress }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      <div
        id="expanding-circle"
        className="absolute rounded-full bg-black"
        style={{
          transform: `scale(${circleExpansionProgress * 50})`,
          opacity: circleExpansionProgress,
          transformOrigin: "bottom center",
          width: "100px", // Initial size, will be scaled
          height: "100px", // Initial size, will be scaled
        }}
      ></div>
    </div>
  );
}
