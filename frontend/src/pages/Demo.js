import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { ImProfile } from "react-icons/im";
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

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
      try {
        // Decode the token using jwt-decode
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
        toast.error('Invalid token format');
      }
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
              rows="4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-[3px] mb-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition ease-in-out duration-150"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {userInfo && (
        <div className="absolute top-2 right-2">
          <button
            className="text-gray-200 hover:text-white focus:outline-none"
            onClick={toggleDropdown}
          >
            {userInfo.name}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ImProfile className="inline-block mr-2" />
                Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                <IoMdLogOut className="inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Demo;
