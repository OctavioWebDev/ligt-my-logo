// 'use client';
// import React, { useState } from 'react';

// const TubeColorMatcher = ({ onSelectTubeColor, signColor }) => {
//     const [selectedTubeColor, setSelectedTubeColor] = useState('White');
//     const inputId = "textInput";

//     const handleSelectTubeColor = (color) => {
//         const tubeColor = color === 'colorMatching' ? signColor : 'White';
//         setSelectedTubeColor(tubeColor); 
//         onSelectTubeColor(tubeColor === 'White' ? 'White' : 'Color Matching');
//     };

//     return (
//         <div className="mt-6 ml-2 mx-2.5">
//             <label htmlFor={inputId} className="block text-white text-lg mb-4">
//                 Your Tube Color
//             </label>
//         <div className="flex max-w-3xl justify-center overflow-x-auto whitespace-wrap">
//             <button
//                 className={`w-80 px-5 py-2 mx-2 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
//                     selectedTubeColor === 'White' ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
//                 } w-92`}
//                 onClick={() => handleSelectTubeColor('White')}
//             >
//                 White Tube
//             </button>
//             <button
//                 className={`w-80 px-5 py-2 mx-4 text-center border border-white rounded cursor-pointer transition duration-300 ease-in-out ${
//                     selectedTubeColor === signColor ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
//                 } w-92`}
//                 onClick={() => handleSelectTubeColor('colorMatching')}
//             >
//                 Color Matching
//             </button>
//         </div>
//         </div>
//     );
// };

// export default TubeColorMatcher;