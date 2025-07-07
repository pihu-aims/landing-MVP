"use client";

import React, { useState } from 'react';
import { captureEmail } from '../lib/supabase';

const WaitlistPage = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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
        {/* Video Placeholder */}
        <div className="w-full aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-2 border-gray-700 flex items-center justify-center">
            <div className="ml-1 w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-700 border-b-8 border-b-transparent"></div>
          </div>
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
