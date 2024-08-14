import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/Context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        // Instead of programmatic navigation, you can update the UI or redirect using the Link component
      } else {
        setErrorMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

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
          <Link href="/register" className="text-purple-600 hover:text-purple-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}