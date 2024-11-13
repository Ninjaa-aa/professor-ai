'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Cpu } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "Professor AI";
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen/2 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Bot className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-400/20 animate-float" />
          <Cpu className="absolute bottom-1/4 right-1/4 w-8 h-8 text-purple-400/20 animate-float-delayed" />
        </div>

        {/* Title section */}
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur group-hover:opacity-100 animate-pulse" />
            <div className="relative">
              <Sparkles className="w-12 h-12 text-blue-400 animate-spin-slow" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {displayText}
            </span>
            <span className="animate-blink text-purple-400">|</span>
          </h1>
        </div>

        {/* Subtitle with animated gradient border */}
        <div className="relative mt-8 inline-block">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 blur" />
          <p className="relative px-6 py-2 text-xl sm:text-2xl text-gray-300 bg-slate-900/50 rounded-lg backdrop-blur-sm border border-gray-700">
            Your Intelligent Academic Assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;