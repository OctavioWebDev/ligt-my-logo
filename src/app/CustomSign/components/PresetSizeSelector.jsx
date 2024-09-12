'use client';
import React, { useState } from 'react';

const PresetSizeSelector = ({ onSelectSize, onResetCustomSize }) => {
    const sizes = [
        { label: 'Small 10x3', dimensions: { width: 10, height: 3 } },
        { label: 'Medium 13x4', dimensions: { width: 13, height: 4 } },
        { label: 'Large 21x6', dimensions: { width: 21, height: 6 } },
    ];

    const [selectedSize, setSelectedSize] = useState(null);
    const inputId = "textInput";

    const handleSizeSelection = (dimensions) => {
        setSelectedSize(dimensions); // Correctly set the selected size dimensions
        onSelectSize(dimensions);
        onResetCustomSize();
    };

    return (
        <div className="mt-6 ml-2 mx-2.5">
            <label htmlFor={inputId} className="block text-white font-medium text-lg mb-4">
                Select Size
            </label>
            <div className="flex max-w-3xl">
                {sizes.map((size, index) => (
                    <button
                        key={index}
                        className={`w-80 px-5 py-2 mx-4 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
                            selectedSize && selectedSize.width === size.dimensions.width && selectedSize.height === size.dimensions.height
                                ? 'bg-purple-700 border-purple-700 text-white'
                                : 'bg-transparent text-white hover:bg-purple-600'
                        }`}
                        onClick={() => handleSizeSelection(size.dimensions)}
                    >
                        {size.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PresetSizeSelector;

