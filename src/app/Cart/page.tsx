// import React from 'react';
// import PropTypes from 'prop-types';
// import Image from 'next/image';
// import Link from 'next/link';
// import Header from '@/components/Header';
// import MainFooter from '@/components/MainFooter';

// const Cart = ({ cart, removeFromCart }) => {
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate('/checkout', { state: { cart } });
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="max-w-2xl mt-20 text-fuchsia-950 mx-auto p-5">
//         {cart.length === 0 ? (
//           <p className="mt-24 text-sm text-gray-300">Your cart is empty.</p>
//         ) : (
//           cart.map((item, index) => (
//             <div key={index} className="border border-gray-300 p-4 mb-5 rounded">
//               <div className="mb-2.5">
//                 <h2 className="text-lg font-bold">Sign Specifications</h2>
//                 {item.image && <Image src={item.image} alt="Sign preview" className="mb-4 w-full h-auto" />}
//                 <ul>
//                   <li>Text: {item.textInput}</li>
//                   <li>Font: {item.selectedFont}</li>
//                   <li>Color: {item.selectedColor}</li>
//                   <li>Tube Color: {item.tubeColor}</li>
//                   {!item.customSize || (item.customSize.width === 0 && item.customSize.height === 0) ? (
//                     <li>Size: Width: {item.size.width}, Height: {item.size.height}</li>
//                   ) : null}
//                   <li>Backing: {item.backingType}</li>
//                   {item.customSize && (item.customSize.width || item.customSize.height) ? (
//                     <li>Custom Size: Width: {item.customSize.width}, Height: {item.customSize.height}</li>
//                   ) : null}
//                   <li>Location: {item.location}</li>
//                   <li>Price: ${item.cost.toFixed(2)}</li>
//                 </ul>
//               </div>
//               <button
//                 className="px-5 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700"
//                 onClick={() => removeFromCart(item)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//         {cart.length > 0 && (
//           <button
//             className="px-5 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700 mt-5"
//             onClick={handleCheckout}
//           >
//             Checkout
//           </button>
//         )}
//       </div>
//       <MainFooter />
//     </div>
//   );
// };

// Cart.propTypes = {
//   cart: PropTypes.array.isRequired,
//   removeFromCart: PropTypes.func.isRequired,
// };

// export default Cart;