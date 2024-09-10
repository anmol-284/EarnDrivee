import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode without curly braces

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Replace 'token' with your token's key in localStorage
};

// Function to decode the token
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Dashboard Component
const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      setUserInfo(decodedToken);
      setGreeting(getGreeting());
    }
  }, []);

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) return 'Good morning';
    else if (currentTime >= 12 && currentTime < 18) return 'Good afternoon';
    else return 'Good evening';
  };

  const handleLogout = () => {
    // Remove the token and user data from localStorage
    localStorage.removeItem('token');

    // Remove the token from cookies
    removeCookie('token');

    // Redirect to the login page
    window.location.href = '/login';
  };

  const removeCookie = (name) => {
    document.cookie = name + '=; Max-Age=0; path=/';
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-center bg-gray-900 relative">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-14 left-8 p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {greeting}, <span className='text-amber-300'>{userInfo ? userInfo.firstname.charAt(0).toUpperCase() + userInfo.firstname.slice(1) : 'User'}</span>
        </h1>
      </div>
      <div className="flex flex-col items-start ml-8">
        <div className="card text-gray-300 w-[370px] h-[450px] mt-[100px] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden relative">
          <div className="px-8 py-10">
            <div className="bg-orange-500 w-10 h-10 flex justify-center items-center rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
            <div className='flex flex-col gap-10 items-center mt-8'>
              <Link to="/info" className="mb-4">
                <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">My info</button>
              </Link>
              <Link to='/myrides'>
                <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">My Rides</button>
              </Link>
              <Link to='/mybikes'>
                <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">My Bikes</button>
              </Link>
            </div>
          </div>
          <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
          <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
