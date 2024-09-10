import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      toast.success('Signed In Successful.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err.message);
      toast.error('Signup failed');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900 relative">
      <Toaster position="top-right" /> {/* Toaster for displaying toast notifications */}
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>

      <div className="relative z-10 p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-white mb-8">Welcome to EarnDrive</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter your firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter your lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex px-4 pt-10 justify-center">
            <button type="submit" className="relative inline-flex items-center px-10 py-1 overflow-hidden text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-full hover:text-white group hover:bg-gray-50">
              <span className="absolute left-0 block w-full h-0 transition-all bg-blue-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="relative">Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
