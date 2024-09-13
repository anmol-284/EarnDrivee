import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import {jwtDecode} from 'jwt-decode';
import BikeCard from '../components/BikeCard';
import axios from 'axios';

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

const Bikes = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [bikes, setBikes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filters, setFilters] = useState({
        City: '',
        State: '',
        Area: '',
        pinCode: ''
    });

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = decodeToken(token);
            setUserInfo(decodedToken);
        }

        fetchBikes();
    }, []);

    const fetchBikes = async (filterParams = {}) => {
    try {
        const query = new URLSearchParams(filterParams).toString();
        const response = await fetch(`http://localhost:8000/api/v1/bikes?${query}`); // Adjust the endpoint according to your backend setup

        if (!response.ok) {
            throw new Error('Failed to fetch bikes');
        }

        const bikesData = await response.json();
        console.log(bikesData);

        // Update state with fetched data
        setBikes(bikesData);
    } catch (error) {
        console.error('Error fetching bikes:', error);
    }
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchBikes(filters);
    };

    // Frontend: orderHandler function
const orderHandler = async (bikeId, amount) => {
    try {
        // Get the Razorpay key
        const getKeyResponse = await axios.get("http://localhost:8000/api/v1/getkey");
        const key = getKeyResponse.data.key;
        console.log('Razorpay Key:', key);

        // Create an order by sending bikeId and amount to the backend
        const createOrderResponse = await axios.post(
            "http://localhost:8000/api/v1/create-order", 
            { bikeId, amount }, 
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Extract order details from the response
        const order = createOrderResponse.data;
        console.log('Order:', order);

        // Setup Razorpay options
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "EarnDrive",
            description: "Test Transaction",
            image: "https://pbs.twimg.com/profile_images/1598575470731489280/7Ifc3TnR_400x400.jpg",
            order_id: order.id,
            callback_url: "http://localhost:8000/api/v1/paymentverification",
            prefill: {
                name: "Anmol Sahu",
                email: "anmolsahuwork@gmail.com",
                contact: "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#121212"
            },
            handler: async function(response) {
                try {
                    // Send payment verification to your server
                    const paymentVerificationResponse = await axios.post('http://localhost:8000/api/v1/paymentverification', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        bikeId: bikeId, // Include bikeId for tracking
                    });

                    if (paymentVerificationResponse.data.success) {
                        // Redirect to success page with payment reference
                        window.location.href = `http://localhost:3000/paymentsuccess?reference=${paymentVerificationResponse.data.reference}`;
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('An error occurred while verifying payment. Please try again.');
                }
            },
        };

        // Initialize Razorpay checkout
        const razorpay = new window.Razorpay(options);
        
        // Handle payment failure
        razorpay.on('payment.failed', function(response) {
            alert('Payment Failed: ' + response.error.description);
            console.log('Payment Failed:', response.error);
        });

        // Open Razorpay checkout
        razorpay.open();
    } catch (error) {
        // Handle errors during Razorpay checkout initialization
        console.error('Error in opening Razorpay checkout:', error);
        alert('Error in opening Razorpay checkout: ' + error.message);
    }
};

    return (
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-10">
            <h1 className='text-center text-white mt-10 font-bold text-3xl'>Active Bikes 🏍️</h1>

            <form className="mt-10 w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-lg" onSubmit={handleFilterSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="City">
                            City
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="City"
                            name="City"
                            type="text"
                            value={filters.City}
                            onChange={handleFilterChange}
                            placeholder="Enter City"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="State">
                            State
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="State"
                            name="State"
                            type="text"
                            value={filters.State}
                            onChange={handleFilterChange}
                            placeholder="Enter State"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="Area">
                            Area
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="Area"
                            name="Area"
                            type="text"
                            value={filters.Area}
                            onChange={handleFilterChange}
                            placeholder="Enter Area"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="pinCode">
                            pinCode
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="pinCode"
                            name="pinCode"
                            type="text"
                            value={filters.pinCode}
                            onChange={handleFilterChange}
                            placeholder="Enter pinCode"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-[#abd373] hover:bg-[#92c160] text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>

            <div className="flex-1 flex items-center justify-center w-full p-8">
                {bikes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                        {bikes.map((bike, index) => (
                            <BikeCard key={index} bike={bike} orderHandler={orderHandler} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-[300px]">
                        <p className="text-white text-xl font-semibold text-center">
                            No active bikes are available for now.
                        </p>
                    </div>
                )}
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
    );
}

export default Bikes;
