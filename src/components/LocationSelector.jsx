'use client';
import React, { useState } from 'react';

const LocationSelector = ({ onSelectLocation }) => {
    const [selectedLocation, setSelectedLocation] = useState('inside');
    const inputId = "textInput";

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
        
        if (onSelectLocation) {
            onSelectLocation(location);
        }
    };

    return (
        <div className="mt-6 mb-20 ml-2 mx-2.5">
            <label htmlFor={inputId} className="block text-white font-medium text-lg mb-4">
                Location 
            </label>
            <label htmlFor={inputId} className="block text-white font-small text-sm mb-3">
                Add 10% if location is outside 
            </label>
        <div className="flex justify-center max-w-3xl">
            <button
                className={`w-80 px-5 py-2 mx-4 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
                    selectedLocation === 'inside' ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
                }`}
                onClick={() => handleSelectLocation('inside')}
            >
                Inside
            </button>
            <button
                className={`w-80 px-5 py-2 mx-4 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
                    selectedLocation === 'outside' ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
                }`}
                onClick={() => handleSelectLocation('outside')}
            >
                Outside
            </button>
        </div>
        </div>
    );
};

export default LocationSelector;

