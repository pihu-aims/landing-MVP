"use client";

import React from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import useFrameScrollAnimation from "../../hooks/useFrameScrollAnimation";

export default function TopBar() {
    const { currentFrame } = useFrameScrollAnimation();
    const navItems = [
        { name: "Home", active: true },
        { name: "About us", active: false },
        { name: "Works", active: false },
        { name: "Blog", active: false },
        { name: "Contact", active: false },
        { name: "Pricing", active: false },
    ];

    // Only show TopBar in the first frame (frame 0)
    if (currentFrame > 0) {
        return null;
    }

    {/* Header Navigation */}
    {/*Made the header background black at 50% transparency*/}
    return (
    <header className="topbar fixed top-0 left-0
      w-full flex justify-between items-center px-8 py-4 z-50
      pointer-events-auto">

        {/* Logo */}
        <div className="flex items-center ">
            <img
                className=" mr-2"
                alt="Studio1 Logo"
                src="/images/logo.png"
            />
            <span className="text-white font-bold"></span>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="Home" className="w-auto">
            <TabsList className="flex bg-transparent">
                {navItems.map((item) => (
                    <TabsTrigger
                        key={item.name}
                        value={item.name}
                        className={`text-white px-4 ${
                            item.active ? "border-b-2 border-white font-bold" : ""
                        }`}
                    >
                        {item.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>

        {/* CTA Button */}
        <Button
            variant="outline"
            className="bg-white text-black/75 px-4 py-2 rounded-md"
            suppressHydrationWarning
        >
            Get Started
        </Button>
    </header>
    )
}