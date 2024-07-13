'use client';
import React, { useState } from 'react';

const BackingTypeSelector = ({ onSelectBackingType }) => {
    const [selectedBackingType, setSelectedBackingType] = useState('');
    const inputId = "textInput";

    const backingTypes = [
        'Hollow-Out', 
        'Cut to Shape', 
        'Full Board', 
        'Stand'
    ];

    const handleSelectBackingType = (type) => {
        setSelectedBackingType(type);
        if (onSelectBackingType) {
            onSelectBackingType(type);
        }
    };

    return (
        <div className="mt-6 ml-2 mx-2.5">
            <label htmlFor={inputId} className="block text-white font-medium text-lg mb-4">
                Backing Type
            </label>
        <div className="grid grid-cols-2 gap-2 max-w-3xl p-2">
            {backingTypes.map((type, index) => (
                <button
                    key={index}
                    className={`px-6 py-2 mx-4 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
                        selectedBackingType === type ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
                    }`}
                    onClick={() => handleSelectBackingType(type)}
                >
                    {type}
                </button>
            ))}
        </div>
        </div>
    );
};

export default BackingTypeSelector;

