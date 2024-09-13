import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode'; // Note: jwtDecode should be imported without curly braces

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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="flex flex-col items-center justify-center space-y-[-100px]">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">
            {greeting}, <span className='text-amber-300'>{userInfo ? userInfo.firstname.charAt(0).toUpperCase() + userInfo.firstname.slice(1) : 'User'}</span>
          </h1>
          <p className="text-lg mb-8">
            Welcome back to your dashboard. From here, you can manage your bookings or list your bike for rent.
          </p>
          <p className="text-lg mb-52">
            Choose an option below to get started:
          </p>
        </div>
        <div class="card text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden relative">
          <div class="px-8 py-10">
            <div class="bg-orange-500 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
            <Link to="/book">
              <button class="uppercase smky-btn3 mb-8 mt-4 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">Rent a bike</button>
            </Link>
            <Link to="/listBikes">
              <button class="uppercase smky-btn3 ml-[3px] relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">List a bike</button>
            </Link>
          </div>
          <div class="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
          <div class="h-0.5 group-hover:w-full bg-gradient-to-l  via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
        </div>
      </div>
      <div className="absolute top-10 right-12">
        <div className="group duration-500 -rotate-12 hover:-rotate-0 hover:skew-x-1 skew-x-0 hover:translate-x-6 hover:translate-y-12">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer group-hover:duration-400 relative rounded-2xl w-[180px] h-[100px] bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12 before:rounded-2xl before:absolute before:content-[''] before:bg-neutral-700 before:right-3 before:top-0 before:w-[190px] before:h-[110px] before:-z-10"
          >
            <span className="text-3xl font-bold">
              {userInfo ? userInfo.firstname.charAt(0).toUpperCase() + userInfo.lastname.charAt(0).toUpperCase() : 'DP'}
            </span>
            <p className="text-amber-300 font-thin">
              {userInfo ? userInfo.firstname.toUpperCase() + " " + userInfo.lastname.toUpperCase() : 'Default User'}
            </p>
          </div>
          {showDropdown && (
            <div className="absolute top-16 right-0 mt-12 w-48 bg-zinc-800 rounded-md shadow-lg z-10">
              <Link to="/profile" className="flex justify-start gap-2 px-4 py-2 text-white hover:bg-zinc-700"><ImProfile className='mt-[3px]' />My Profile</Link>
              <button onClick={handleLogout} className="flex justify-start w-full text-left px-4 py-2 gap-2 text-white hover:bg-zinc-700"><IoMdLogOut className='mt-[3px]' />Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
