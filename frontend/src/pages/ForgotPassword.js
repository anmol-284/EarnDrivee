import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.Status === "Success") {
                alert("Reset link sent to your email.");
                navigate('/login'); 
            } else {
                alert(data.Message || "User does not exist.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send reset link. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-900">
            {/* Forgot Password Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-sm bg-gray-200">
                <h4 className="text-center text-xl font-semibold mb-4">Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full transition duration-300"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
