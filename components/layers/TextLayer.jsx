"use client";

import React from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TopBar from './Topbar';

export default function TextLayer() {
  // Navigation menu items
  const navItems = [
    { name: "Home", active: true },
    { name: "About us", active: false },
    { name: "Works", active: false },
    { name: "Blog", active: false },
    { name: "Contact", active: false },
    { name: "Pricing", active: false },
  ];

  // Content sections data
  const contentSections = [
    {
      id: "studio1",
      title: "Studio1",
      subtitle: "Create Together",
      heading: "Our Vision: Empowering the Next Billion Storytellers",
      description:
        "Anyone can become a creator. By simplifying powerful AI tools, we give people the freedom to tell stories quickly, confidently, and with full control.",
      bgColor: "bg-transparent",
      // bgColor: "bg-[#4e5b4b]",
      textColor: "text-white",
      height: "h-auto",
    },
    {
      id: "what-we-built",
      title: "What We've Built",
      subtitle: "All the Best Creative AI Tools. One Place.",
      description:
        "We combine the best creative AI tools in one easy workspace.\nMake content, collaborate, monetize, and stay safe.\nAll in one place, with one subscription.",
      // bgColor: "bg-[#4e5b4b]",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-auto",
    },
    {
      id: "who-its-for",
      title: "Who It's For",
      subtitle: "Studio1 is for Everyone Ready to Create",
      description:
        "We built this for filmmakers, students, influencers, designers and\nanyone with a story to tell.\nNo code needed. Just your ideas and our tools.",
      // bgColor: "bg-gradient-to-b from-[#e84393] to-[#0984e3]",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-auto",
    },
    {
      id: "who-we-are",
      title: "Who We Are",
      subtitle: "Creative Vision Meets Technical Firepower",
      description:
        "We're a team of BAFTA-winning creators, AI experts, and proven operators.\nWe know how to build, ship and scale creative tech.",
      // bgColor: "bg-gradient-to-b from-[#0984e3] to-[#00cec9]",
      bgColor: "bg-transparent",
      textColor: "text-white",
      height: "h-auto",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between py-20 ">
      {/* Content Sections */}
      {/*TODO: We may need to manually place these*/}
      {contentSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`w-full ${section.height} ${section.bgColor} relative flex items-center`}
          style={{
            paddingTop: index === 0 ? "6rem" : "2rem",
            // TODO: May have to adjust this
            paddingBottom: "24rem"
          }}
        >
          <div className="container mx-auto px-8">
            <div className={`max-w-2xl ${index % 2 !== 0 ? "ml-auto" : ""}`}>
              <h2 className={`text-5xl font-bold mb-4 ${section.textColor}`}>
                {section.title}
              </h2>
              <h3 className={`text-3xl font-bold mb-6 ${section.textColor}`}>
                {section.subtitle}
              </h3>
              {index === 0 ? (
                <>
                  <p className={`text-xl whitespace-pre-line ${section.textColor}`}>
                    {section.heading}
                  </p>
                  <p className={`text-xl mt-6 whitespace-pre-line ${section.textColor}`}>
                    {section.description}
                  </p>
                </>
              ) : (
                <p className={`text-xl whitespace-pre-line ${section.textColor}`}>
                  {section.description}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}