import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to capture errors
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/v1/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ password }),
            });

            const res = await response.json();

            if (res.status === "Success") { // Assuming the field is camelCase
                navigate('/login');
            } else {
                setError(res.status || "An error occurred, please try again.");
            }
        } 
        catch (err) {
            setError("Network error, please try again later.");
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-900">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-sm bg-gray-200">
                <h4 className="text-center text-xl font-semibold mb-4">Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Displaying errors */}
                    <button
                        type="submit"
                        className="btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
