// 'use client';
// import React, { useState } from 'react';

// const TextInput = ({ placeholder, onTextChange }) => {
//     const [text, setText] = useState('');
//     const inputId = "textInput";

//     const handleChange = (e) => {
//         setText(e.target.value);
//         if (onTextChange) {
//             onTextChange(e.target.value);
//         }
//     };

//     return (
//         <div className="mt-6 ml-2 mx-2.5 max-w-3xl">
//             <label htmlFor={inputId} className="block text-pink-200 font-medium text-2xl mb-5">
//                 Looking for a custom logo for your business get a
//                 <a href="/custom-logo" className="text-fuchsia-950 text-4xl underline ml-1">FREE QUOTE</a>
//             </label>

//             <label htmlFor={inputId} className="block text-white font-medium text-lg mb-2">
//                 Your Text
//             </label>
//             <input
//                 type="text"
//                 id={inputId}
//                 value={text}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 className="block w-full h-16 border border-white border-solid rounded text-base bg-transparent text-white"
//             />
//         </div>
//     );
// };

// export default TextInput;


