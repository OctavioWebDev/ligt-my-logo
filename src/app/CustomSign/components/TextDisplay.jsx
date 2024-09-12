'use client'
import React, { useState } from 'react';
import '@/app/globals.css';

const TextDisplay = ({ text, font, glowColor }) => {
  const [isGlowActive, setIsGlowActive] = useState(false);

  const handleGlowToggle = () => {
    setIsGlowActive(!isGlowActive);
  };

  const isRgbGlow = glowColor === "RGB";
  const textDisplayClasses = `${isRgbGlow && isGlowActive ? 'rgb-glow' : ''}`;

  const textDisplayStyle = {
    fontFamily: font,
    textShadow: isGlowActive ? (isRgbGlow ? "0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(0, 255, 0, 0.7), 0 0 30px rgba(0, 0, 255, 0.7)" : `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`) : "none",
    animation: isRgbGlow && isGlowActive ? 'rgbGlow 3s ease-in-out infinite' : 'none'
  };

  return (
    <div className="relative flex flex-col mt-20 justify-center items-center text-center text-3xl md:text-6xl h-[50vh] max-w-3xl border-none rounded bg-gray-800 text-white -z-10">
      {/* Text Display Container */}
      <div className={textDisplayClasses} style={textDisplayStyle}>
        {text}
      </div>

      {/* Switch: Positioned at the bottom left */}
      <label className="absolute bottom-4 left-4 inline-flex cursor-pointer">
        <input type="checkbox" onChange={handleGlowToggle} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Git Lit</span>
      </label>
    </div>
  );
};

export default TextDisplay;
