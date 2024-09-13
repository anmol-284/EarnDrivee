// src/components/MyBikes.js
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import React, { useEffect, useState } from 'react';
import BikeCard from '../components/MyBikeCard'; // Ensure this path is correct
import {jwtDecode} from 'jwt-decode';

const getToken = () => {
    return localStorage.getItem('token');
};

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};


const MyBikes = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const removeCookie = (name) => {
        document.cookie = name + '=; Max-Age=0; path=/';
    };


    const handleLogout = () => {
        // Remove the token and user data from localStorage
        localStorage.removeItem('token');

        // Remove the token from cookies
        removeCookie('token');

        // Redirect to the login page
        window.location.href = '/login';
    };

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
                console.log('Token:', token); // Debugging: Check if the token is retrieved correctly

                // Using fetch to make the API call to the correct backend URL
                const response = await fetch('http://localhost:8000/api/v1/mybikes', { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Ensure the token is included in the headers
                    },
                });

                if (!response.ok) {
                    // Handle error responses
                    throw new Error(`Failed to fetch bikes: ${response.statusText}`);
                }

                const data = await response.json(); // Parse JSON response
                setBikes(data); // Set the fetched bikes data
            } catch (err) {
                // Catch and set any errors that occur during the fetch
                setError(err.message);
            } finally {
                // Reset the loading state regardless of the outcome
                setLoading(false);
            }
        };

        const token = getToken();
        if (token) {
            const decodedToken = decodeToken(token);
            setUserInfo(decodedToken);
        }

        fetchBikes(); // Call the fetch function when the component mounts
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Display loading, error, or the list of bikes based on the current state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
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
            <div className="w-full flex flex-col items-center justify-start mt-10"> {/* Center the heading */}
                <h1 className="text-4xl font-bold text-white mb-20">My Bikes</h1> {/* Styling for the heading */}
                {bikes.length === 0 ? (
                    <p className="text-white">You have not listed any bikes yet.</p> // Message for no bikes
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {bikes.map((bike) => (
                            <BikeCard
                                key={bike._id}
                                bike={bike}
                                maxBookingHours={24} // Example value, adjust as needed
                                orderHandler={(id, hours) => {
                                    // Implement booking logic here
                                    console.log(`Booking bike ${id} for ${hours} hours`);
                                }}
                                id={bike._id} // Assuming bike ID is used for booking
                                amount={bike.pricePerHour * 1} // Example calculation, adjust as needed
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBikes;
