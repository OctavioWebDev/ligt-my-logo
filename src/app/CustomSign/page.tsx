"use client";

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import TextInput from './components/TextInput';
import TextDisplay from './components/TextDisplay';
import FontSelector from './components/FontSelector';
import ColorSelector from './components/ColorSelector';
import BackingTypeSelector from './components/BackingTypeSelector';
import LocationSelector from './components/LocationSelector';
import CustomSizeSelector from './components/CustomSizeSelector';
import Footer from './components/Footer';
import Header from '@/components/Header';
import PresetSizeSelector from './components/PresetSizeSelector';
import TubeColorMatcher from './components/TubeColorMatcher';

const LEDSignBuilderTool: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [tubeColor, setTubeColor] = useState('#FFFFFF');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [backingType, setBackingType] = useState('acrylic');
  const [location, setLocation] = useState('indoor');
  const [customSize, setCustomSize] = useState({ width: 24, height: 12 });

  const signRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (text: string) => setTextInput(text);
  const handleFontChange = (font: string) => setSelectedFont(font);
  const handleColorChange = (color: string) => setSelectedColor(color);
  const handleTubeColorChange = (color: string) => setTubeColor(color);
  const handleSizeChange = (newSize: { width: number; height: number }) => setSize(newSize);
  const handleBackingTypeChange = (type: string) => setBackingType(type);
  const handleLocationChange = (loc: string) => setLocation(loc);
  const handleCustomSizeChange = (newSize: { width: number; height: number }) => setCustomSize(newSize);

  const handleAddToCart = async () => {
    if (signRef.current) {
      const canvas = await html2canvas(signRef.current);
      const image = canvas.toDataURL('image/png');

      const selections = {
        textInput,
        selectedFont,
        selectedColor,
        tubeColor,
        size,
        backingType,
        location,
        customSize,
        cost: calculateCost(),
        image,
      };
      // Here you would typically call a function to add the item to the cart
      console.log('Adding to cart:', selections);
    }
  };

  const calculateCost = () => {
    const totalSize = size.width * size.height;
    const pricePerSquareInch = 0.6;
    let cost = totalSize * pricePerSquareInch;
    if (location === 'outside') {
      cost += cost * 0.10;
    }
    return cost;
  };
  
  const handleResetCustomSize = () => {
    setCustomSize({ width: 24, height: 12 });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="lg:w-1/2 p-4">
          <div ref={signRef}>
            <TextDisplay
              text={textInput}
              font={selectedFont}
              glowColor={selectedColor}
            />
          </div>
        </div>
        <div className="lg:w-1/2 p-4 overflow-y-auto">
          <div className="mt-20 mb-20 space-y-4">
            <TextInput onTextChange={handleTextChange} placeholder={undefined} />
            <FontSelector onSelectFont={handleFontChange} />
            <ColorSelector onSelectColor={handleColorChange} />
            <TubeColorMatcher onSelectTubeColor={handleTubeColorChange} signColor={undefined} />
            <PresetSizeSelector onSelectSize={handleSizeChange} onResetCustomSize={handleResetCustomSize} />
            <BackingTypeSelector onSelectBackingType={handleBackingTypeChange} />
            <LocationSelector onSelectLocation={handleLocationChange} />
            <CustomSizeSelector onSizeChange={handleCustomSizeChange} />
          </div>
        </div>
      </div>
      <Footer
        textInput={textInput}
        selectedFont={selectedFont}
        selectedColor={selectedColor}
        tubeColor={tubeColor}
        size={size}
        backingType={backingType}
        location={location}
        customSize={customSize}
        addToCart={handleAddToCart}
      />
    </div>
  );
}

export default LEDSignBuilderTool;
