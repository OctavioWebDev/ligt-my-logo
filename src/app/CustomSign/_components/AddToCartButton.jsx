// 'use client'
// import React from 'react';
// import PropTypes from 'prop-types';
// import Link from 'next/link';

// const AddToCartButton = ({ addToCart, selections }) => {
//     const handleAddToCart = () => {
//         addToCart(selections);
//     };

//     return (
//         <Link href="/cart">
//             <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Add to Cart
//             </button>
//         </Link>
//     );
// };


// // Define PropTypes for the component
// AddToCartButton.propTypes = {
//   addToCart: PropTypes.func.isRequired, // expects a function
//   selections: PropTypes.object.isRequired, // expects an object
// };

// export default AddToCartButton;