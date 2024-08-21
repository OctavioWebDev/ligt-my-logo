// 'use client';
// import React, { useState } from 'react';


// const CustomSizeSelector = ({ onSizeChange }) => {
//     const [size, setSize] = useState({ width: 10, height: 3 });

//     const handleSizeChange = (newWidth) => {
//         // Every 3 units of width equals 1 unit of height
//         const newHeight = 3 + Math.floor((newWidth - 10) / 3);

//         const newSize = {
//             width: newWidth,
//             height: Math.min(Math.max(newHeight, 3), 37) // Ensuring height stays within bounds
//         };

//         setSize(newSize);

//         if (onSizeChange) {
//             onSizeChange(newSize);
//         }
//     };

//     return (
//         <div className="p-3 max-w-3xl overflow-x-auto whitespace-nowrap">
//             <div className="mt-6">
//             <label 
//                 htmlFor="medium-range" 
//                 className="block
//                 mb-4 
//                 text-lg 
//                 font-medium
//                  text-gray-900
//                   dark:text-white"
//                   > Custom Size
//             </label>
//                 <input 
//                     id="medium-range" 
//                     type="range" 
//                     min="10"
//                     max="118"
//                     value={size.width}
//                     onChange={(e) => handleSizeChange(parseInt(e.target.value))} 
//                     className="w-full
//                     h-2 
//                     mb-4
//                      bg-gray-200 
//                      rounded-lg 
//                      appearance-none 
//                      cursor-pointer 
//                      dark:bg-gray-700"
//                     >
//                 </input>
//             <div className="ml-10 text-white">
//                 Size: {size.width} x {size.height}
//             </div>
//         </div>
//     </div>
//     );
// };

// export default CustomSizeSelector;

