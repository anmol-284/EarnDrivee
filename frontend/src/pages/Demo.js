import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { ImProfile } from "react-icons/im";
import { Link } from 'react-router-dom';

// Function to get the token from Cookies
const getToken = () => {
  return Cookies.get('token'); // Retrieve token from Cookies
};

// Dashboard Component
const Demo = () => {
  const navigate = useNavigate();

  const [bikeName, setBikeName] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikeNumber, setBikeNumber] = useState('');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Area, setArea] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [listingTime, setListingTime] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); // State to store the selected file

  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Decode the token here if it's JWT or fetch user data
      // Assuming JWT, you can use jwt-decode or similar library
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserInfo(decodedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bikeName', bikeName);
    formData.append('bikeModel', bikeModel);
    formData.append('bikeNumber', bikeNumber);
    formData.append('State', State);
    formData.append('City', City);
    formData.append('Area', Area);
    formData.append('pricePerHour', pricePerHour);
    formData.append('pinCode', pinCode);
    formData.append('listingTime', listingTime);
    formData.append('expirationTime', expirationTime);
    formData.append('description', description);
    formData.append('imageFile', file);

    // Log the formData keys and values for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const token = getToken();
    console.log(token);

    if (!token) {
      toast.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/upload/listBike', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Bike Listed Successfully, Now on next page please upload documents');
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/document');
      } else {
        const result = await response.json();
        toast.error(`Failed to list bike: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to list bike:', error);
      toast.error('Failed to list bike');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state when a file is selected
  };

  const handleLogout = () => {
    // Remove the token from Cookies
    Cookies.remove('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
      <Toaster position="top-right" />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[600px] bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 text-center uppercase">List Your Bike</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              placeholder="Bike Name"
              value={bikeName}
              onChange={(e) => setBikeName(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Bike Model"
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Bike Number"
              value={bikeNumber}
              onChange={(e) => setBikeNumber(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="State"
              value={State}
              onChange={(e) => setState(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="City"
              value={City}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Area"
              value={Area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Price Per Hour"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              placeholder="Listing Time"
              value={listingTime}
              onChange={(e) => setListingTime(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="datetime-local"
            />
            <input
              placeholder="Expiration Time"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="datetime-local"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              rows="3"
            />
            <input
              onChange={handleFileChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="file"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              List Bike
            </button>
          </form>
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
                <Link to="/profile" className="flex justify-start gap-2 px-4 py-2 text-white hover:bg-zinc-700">
                  <ImProfile className='mt-[3px]' />My Profile
                </Link>
                <button onClick={handleLogout} className="flex justify-start w-full text-left px-4 py-2 gap-2 text-white hover:bg-zinc-700">
                  <IoMdLogOut className='mt-[3px]' />Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
