// components/Hero.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
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
    <div className="relative min-h-[10vh] max-h-[20vh] sm:max-h-[50vh] flex flex-col items-center justify-center bg-[#1a1f36]   sm:pt-32 pb-10 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-5xl px-4 sm:px-6"
      >
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-[#8BB4F6]" />
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[#8BB4F6] to-[#A78BF6] bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 text-lg sm:text-xl mt-1 sm:mt-8"
        >
          Your Intelligent Academic Assistant
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
