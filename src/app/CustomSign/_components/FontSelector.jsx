// 'use client';
// import React, { useState } from 'react';

// const fontAliases = [
//   { alias: 'Pacifico', className: 'pacifico' },
//   { alias: 'Satisfy', className: 'satisfy' },
//   { alias: 'Sacramento', className: 'sacramento' },
//   { alias: 'Allura', className: 'allura' },
//   { alias: 'Yellowtail', className: 'yellowtail' },
//   { alias: 'Tangerine', className: 'tangerine' },
//   { alias: 'Cookie', className: 'cookie' },
//   { alias: 'Parisienne', className: 'parisienne' },
//   { alias: 'Monoton', className: 'monoton' },
//   { alias: 'Righteous', className: 'righteous' },
//   { alias: 'Lobster', className: 'lobster' },
//   { alias: 'Playball', className: 'playball' },
//   { alias: 'Ranchers', className: 'ranchers' },
// ];

// const FontSelector = ({ onSelectFont }) => {
//     const [selectedFont, setSelectedFont] = useState(''); // Initial state set to an empty string

//     const handleSelectFont = (font) => {
//         setSelectedFont(font.className); // Correctly set the selected font class name
//         if (onSelectFont) {
//             onSelectFont(font.className); // Pass the class name to the parent component
//         }
//     };

//     return (
//         <div className="flex max-w-3xl mt-6 overflow-x-auto whitespace-wrap">
//             <div className="ml-2 mx-2.5">
//                 <label className="block text-white text-lg mb-4">
//                     Your Font
//                 </label>
//                 <div className="flex flex-row">
//                     {fontAliases.map((font, index) => (
//                         <div
//                             key={index}
//                             className={`px-4 py-2 mx-2 text-center cursor-pointer border border-white rounded transition duration-300 ease-in-out ${
//                                 selectedFont === font.className ? 'bg-purple-700 border-purple-700 text-white' : 'bg-transparent text-white hover:bg-purple-600'
//                             }`}
//                             style={{ fontFamily: font.alias }}
//                             onClick={() => handleSelectFont(font)}
//                         >
//                             {font.alias}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FontSelector;
