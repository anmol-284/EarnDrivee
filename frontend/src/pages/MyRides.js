// src/components/MyRides.js

import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import React, { useEffect, useState } from 'react';
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

const MyRides = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const removeCookie = (name) => {
        document.cookie = name + '=; Max-Age=0; path=/';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        removeCookie('token');
        window.location.href = '/login';
    };

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/myrides', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }

                const data = await response.json();

                if (data.success) {
                    setPayments(data.payments);
                } else {
                    setError('Failed to fetch payments.');
                }
            } catch (err) {
                setError(err.message || 'Error fetching payments');
            } finally {
                setLoading(false);
            }
        };

        const token = getToken();
        if (token) {
            const decodedToken = decodeToken(token);
            setUserInfo(decodedToken);
        }

        fetchPayments();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-gray-700 relative p-6">
    {/* Background Pattern */}
    <div className="fixed inset-0 bg-pattern opacity-20"></div>
    
    {/* User Info Dropdown */}
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

    {/* Large Heading */}
    <h1 className="text-5xl font-extrabold text-white mb-12 mt-12 text-center z-10">My Rides</h1>

    {/* Table Container */}
    <div className="container mx-auto p-6 rounded-lg shadow-lg mt-28 bg-white z-10">
        {payments.length === 0 ? (
            <p className="text-center text-gray-700">No payments found.</p>
        ) : (
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="border px-4 py-2 text-left text-gray-400">Bike Name</th>
                            <th className="border px-4 py-2 text-left text-gray-400">Payment ID</th>
                            <th className="border px-4 py-2 text-left text-gray-400">Order ID</th>
                            <th className="border px-4 py-2 text-left text-gray-400">Amount</th>
                            <th className="border px-4 py-2 text-left text-gray-400">Paid Status</th>
                            <th className="border px-4 py-2 text-left text-gray-400">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-white bg-gray-700">
                        {payments.map((payment) => (
                            <tr key={payment._id} className="hover:bg-gray-600">
                                <td className="border px-4 py-2">{payment.bikeId?.bikeName || 'N/A'}</td>
                                <td className="border px-4 py-2">{payment.razorpay_payment_id || 'N/A'}</td>
                                <td className="border px-4 py-2">{payment.razorpay_order_id}</td>
                                <td className="border px-4 py-2">{payment.amount || 'N/A'}</td>
                                <td className="border px-4 py-2">{payment.isPaid ? 'Paid' : 'Pending'}</td>
                                <td className="border px-4 py-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
</div>

    );
};

export default MyRides;
