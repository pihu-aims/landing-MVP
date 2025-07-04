"use client";

import React, { useEffect, useState } from "react";
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function ImagesLayer() {
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useFrameScrollAnimation();
  
  // Set isClient to true when component mounts to avoid hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only render on client side to avoid hydration mismatch
  if (!isClient) return null;
  
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-25 pointer-events-none"
      style={{
        transform: `translateY(${scrollY * -1.5}px)`,
      }}
    >
      {/* Image A - First section */}
      <img 
        src="/images/a.png"
        alt="Image A - Our Vision"
        className="absolute w-[400px] h-auto top-[20vh] right-[10vw] object-cover rounded-3xl shadow-lg"
      />
      
      {/* Image B - Second section */}
      <img 
        src="/images/b.png"
        alt="Image B - What We've Built"
        className="absolute w-[400px] h-auto top-[120vh] left-[10vw] object-cover rounded-3xl shadow-lg"
      />
      
      {/* Image C - Third section */}
      <img 
        src="/images/c.png"
        alt="Image C - Who It's For"
        className="absolute w-[350px] h-auto top-[220vh] right-[10vw] object-cover rounded-3xl shadow-lg"
      />
      
      {/* Image D - Fourth section */}
      <img 
        src="/images/d.png"
        alt="Image D - Who We Are"
        className="absolute w-[380px] h-auto top-[320vh] left-[10vw] object-cover rounded-3xl shadow-lg"
      />
      
      {/* Image E - Fifth section */}
      <img 
        src="/images/e.png"
        alt="Image E - Additional Content"
        className="absolute w-[450px] h-auto top-[420vh] left-[calc(50%-225px)] object-cover rounded-3xl shadow-lg"
      />
    </div>
  );
}