"use client";

import React from "react";

export default function BackgroundLayerOne() {
    return (
        <div className="bg-transparent flex justify-center w-full h-full">
            <div className="w-[1509px] h-[4096px] relative">
                <div className="absolute w-[1440px] h-[1394px] rounded-lg border shadow-sm">
                    <div className="p-0">
                        <div style={{ position: 'relative', width: '100%', paddingBottom: `${(1394/1440)*100}%` }}>
                            <img
                                className="absolute w-full h-full object-cover"
                                alt="Thumbnail background"
                                src="/images/thumbnail-3-4.png"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}