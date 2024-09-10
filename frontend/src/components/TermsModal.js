import React, { useState } from 'react';

const TermsModal = ({ showModal, closeModal }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl">
                <h2 className="text-xl font-bold mb-4 font-abc">Terms and Conditions</h2>
                <p font-abc>
                    Here are the terms and conditions for listing your bike. Please read them carefully.
                    
                </p>
                <button
                    onClick={closeModal} 
                    className="mt-4 px-4 py-2 bg-purple-600 text-white font-abc rounded hover:bg-purple-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TermsModal;
