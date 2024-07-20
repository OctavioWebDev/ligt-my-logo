import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/Context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('API URL:', process.env.REACT_APP_BACKEND_URL);

      login(email, password, () => {
        console.log('Navigating to profile');
        navigate('/profile');
      }, (error) => {
        // Handle login error
        console.error('Login error:', error);
        setErrorMessage(error.message || 'An error occurred. Please try again later.');
      });
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again later.');
    }
  };

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Login</h2>
        {/* Wrap the conditional expression inside a React.Fragment */}
        <>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        </>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-purple-600 hover:text-purple-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;