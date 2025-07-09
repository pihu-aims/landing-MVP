"use client";

import React, { useState, useEffect } from 'react';
import { captureEmail } from '../lib/supabase';

const WaitlistPage = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [animationStarted, setAnimationStarted] = useState(false);

  // Trigger animation when the page becomes visible
  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure the circle expansion has progressed enough
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setAnimationStarted(false);
    }
  }, [isVisible]);

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

  // Base animation style for fade-in
  const fadeIn = {
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
  };

  // Animated styles for each element with staggered delays
  const animatedVideo = {
    ...fadeIn,
    opacity: animationStarted ? 1 : 0,
    transform: animationStarted ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.1s'
  };
  
  const animatedHeading = {
    ...fadeIn,
    opacity: animationStarted ? 1 : 0,
    transform: animationStarted ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.25s'
  };
  
  const animatedDescription = {
    ...fadeIn,
    opacity: animationStarted ? 1 : 0,
    transform: animationStarted ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.4s'
  };
  
  const animatedForm = {
    ...fadeIn,
    opacity: animationStarted ? 1 : 0,
    transform: animationStarted ? 'translateY(0)' : 'translateY(10px)',
    transitionDelay: '0.55s'
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-60 flex flex-col items-center justify-center overflow-auto ${
        isVisible ? '' : 'pointer-events-none'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        display: isVisible ? 'flex' : 'none'
      }}
    >
      <div className="max-w-3xl w-full flex flex-col items-center px-4">
        {/* Video - larger size as requested */}
        <div className="w-full max-w-2xl aspect-video mb-8 rounded-lg overflow-hidden border border-gray-200" style={animatedVideo}>
          <video 
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
           <source src="/videos/cl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Heading - positioned as in the image */}
        <h1 className="text-3xl font-bold text-center mb-4" style={animatedHeading}>Join the Creative AI Revolution</h1>
        
        {/* Description - smaller width as in the image */}
        <p className="text-md text-center mb-8 max-w-lg" style={animatedDescription}>
          We're raising SEIS and EIS pre-seed investment. With clear demand, standout tech, and a top-tier team, 
          Studio 1 is building the future of creative AI. Join us and help shape a safe, ethical, creator-first world.
        </p>
        
        {/* Email Form - styled to match the image with horizontal layout */}
        <div className="w-full flex justify-center" style={animatedForm}>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md gap-2">
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
                className="bg-black text-white whitespace-nowrap px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Join Waitlist"}
              </button>
              
              {error && (
                <p className="text-red-500 text-center absolute -bottom-6 left-0 right-0">{error}</p>
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
    </div>
  );
};

export default WaitlistPage;
