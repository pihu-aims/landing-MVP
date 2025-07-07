"use client";

import React, { useState, useRef } from 'react';
import { captureEmail } from '../lib/supabase';

const WaitlistPage = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  
  // Video URL - Using the requested video source
  const mp4VideoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { success, error: apiError } = await captureEmail(email);
      
      if (!success) {
        setError(apiError || 'Something went wrong. Please try again.');
      } else {
        setIsSuccess(true);
        setEmail('');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-60 flex flex-col items-center justify-start pt-12 px-4 overflow-auto transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-lg mb-8 relative overflow-hidden">
          {/* Video element with multiple sources */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          >
            {/* MP4 video source */}
            <source src={mp4VideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play button overlay - only shown when video is not playing */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30"
              onClick={() => {
                videoRef.current.play();
                setIsPlaying(true);
              }}
            >
              <div className="h-16 w-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-all">
                <div className="ml-1 w-0 h-0 border-t-10 border-t-transparent border-l-14 border-l-black border-b-10 border-b-transparent"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-4">Join the Creative AI Revolution</h1>
        
        {/* Description */}
        <p className="text-lg text-center mb-8">
          We're raising SEIS and EIS pre-seed investment. With clear demand, standout tech, and a top-tier team, 
          Studio 1 is building the future of creative AI. Join us and help shape a safe, ethical, creator-first world.
        </p>
        
        {/* Email Form */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto gap-4">
            <div className="flex w-full gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-black text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Join Waitlist"}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </form>
        ) : (
          <div className="p-4 bg-green-100 rounded-lg border border-green-300 max-w-md mx-auto">
            <p className="text-green-700 text-center">
              Thank you! Your email has been added to our waitlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPage;
