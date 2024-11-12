// Updated TypewriterEffect.tsx to remove margin
'use client';
import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8BB4F6] to-[#A78BF6]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};