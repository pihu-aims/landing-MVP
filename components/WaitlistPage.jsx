import React from 'react';

const WaitlistPage = ({ isVisible }) => {
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
        <div className="flex w-full max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium">Join Waitlist</button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
