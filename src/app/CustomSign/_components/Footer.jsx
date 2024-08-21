// 'use client';
// import React from 'react';
// import AddToCartButton from './AddToCartButton';

// const Footer = ({ textInput, selectedFont, selectedColor, tubeColor, size, backingType, location, customSize, addToCart }) => {
//     // Calculate the total size in square inches
//     const totalSize = size.width * size.height;

//     // Price per square inch
//     const pricePerSquareInch = .6;

//     // Calculate base cost
//     let cost = totalSize * pricePerSquareInch;

//     // Add 10% if location is 'outside'
//     if (location === 'outside') {
//         cost += cost * 0.10;
//     }

//     const handleAddToCart = () => {
//         const selections = {
//             textInput,
//             selectedFont,
//             selectedColor,
//             tubeColor,
//             size,
//             backingType,
//             location,
//             customSize,
//             cost,
//         };
//         addToCart(selections); // Use the passed addToCart function here
//     };

//     return (
//         <footer className="flex justify-between items-center bg-gray-800 text-white p-2.5 fixed bottom-0 w-full z-50">
//             <div className="ml-1">
//                 Total Cost: ${cost.toFixed(2)}
//             </div>
//             <AddToCartButton addToCart={handleAddToCart} selections={{ textInput, selectedFont, selectedColor, tubeColor, size, backingType, location, customSize }} />
//         </footer>
//     );
// };

// export default Footer;

