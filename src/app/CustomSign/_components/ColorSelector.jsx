// 'use client';
// import React, { useState } from 'react';

// const ColorSelector = ({ onSelectColor }) => {
//     const [selectedColor, setSelectedColor] = useState('');
//     const inputId = "textInput";

//     const colorMap = {
//         '#FFD700': 'Gold', 
//         '#FF69B4': 'Pink', 
//         '#ADD8E6': 'Light Blue', 
//         '#8F00FF': 'Violet', 
//         '#FFA500': 'Orange', 
//         '#FFC0CB': 'Pink', 
//         '#FF0000': 'Red', 
//         '#FFFFFF': 'White', 
//         '#0D98BA': 'Blue-Green', 
//         '#00008B': 'Navy', 
//         '#FAFA33': 'Lemon', 
//         '#FFFDD0': 'Cream',
//         '#90EE90': 'Light Green'
//     };

//     const colors = Object.keys(colorMap);

//     const handleSelectColor = (color) => {
//         setSelectedColor(color);
//         onSelectColor(colorMap[color] || color);
//     };

//     return (
//         <div className="mt-6 ml-2 mx-2.5 max-w-full">
//             <label htmlFor={inputId} className="block text-white text-lg mb-4">
//                 Your Color
//             </label>
//             <div className="flex overflow-x-auto whitespace-nowrap">
//                 {colors.map((color, index) => (
//                     <div
//                         key={index}
//                         className={`w-10 h-10 mx-2 rounded-full cursor-pointer border-2 ${
//                             selectedColor === color ? 'border-white' : 'border-transparent'
//                         }`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => handleSelectColor(color)}
//                         title={colorMap[color]}
//                     />
//                 ))}
//                 {/* Special RGB box */}
//                 <div
//                     className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
//                         selectedColor === 'RGB' ? 'border-white' : 'border-transparent'
//                     } mr-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600`}
//                     onClick={() => handleSelectColor('RGB')}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ColorSelector;