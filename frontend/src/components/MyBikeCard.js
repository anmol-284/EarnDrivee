// src/components/BikeCard.js

import React, { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const BikeCard = ({ bike, maxBookingHours, orderHandler, id, amount, currentUserId }) => {
    const [showLocationInfo, setShowLocationInfo] = useState(false);
    const [showBikeInfo, setShowBikeInfo] = useState(false);
    const [bookingHours, setBookingHours] = useState(1);
    const [showModal, setShowModal] = useState(false);

    // Time Left Calculation (Assuming you have `expirationTime` available)
    const expirationDate = new Date(bike.expirationTime);
    const timeLeft = {
        days: Math.floor((expirationDate - new Date()) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((expirationDate - new Date()) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor((expirationDate - new Date()) % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor((expirationDate - new Date()) % (1000 * 60) / 1000),
    };

    // Determine if the bike is listed by the current user
    const isOwnBike = 1;
    const tooltipMessage = isOwnBike ? 'You cannot book your own bike' : '';

    console.log(id);
    console.log(currentUserId);

    const handleWhatsAppClick = () => {
        // Implement WhatsApp click handler
        if (!isOwnBike) {
            window.open(`https://wa.me/?text=Booking%20Request%20for%20${bike.bikeName}`, '_blank');
        }
    };

    const handleSliderChange = (e) => {
        setBookingHours(e.target.value);
    };

    const handleBookNow = () => {
        if (!isOwnBike) {
            setShowModal(true);
        }
    };

    return (
        <div className={`m-2 font-abc group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 ml-12`}>
    <img
        src={bike.imageUrl}
        alt={bike.bikeName}
        className={`w-44 card1img font-abc aspect-square text-[#abd373] group-hover:bg-gray-800 text-5xl rounded-full p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto`}
    />
    <p className={`cardtxt font-abc font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl`}>
        {bike.bikeName}
    </p>
    <p className={`blueberry font-abc font-semibold text-gray-400 text-xs group-hover:text-gray-700`}>
        {bike.description}
    </p>
    <div className="ordernow font-abc flex flex-row justify-between items-center w-full mt-4">
        <p className={`ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800 mr-10`}>
            ₹{bike.pricePerHour.toFixed(2)} /hr
        </p>
        <button
            className={`mr-2 text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100`}
            onClick={handleWhatsAppClick}
            disabled={isOwnBike}
            title={tooltipMessage}
        >
            <IoLogoWhatsapp size={20} />
        </button>
        <div className="flex gap-2 font-abc">
            <button
                className={`text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100`}
                onMouseEnter={() => setShowLocationInfo(true)}
                onMouseLeave={() => setShowLocationInfo(false)}
            >
                Location Info
            </button>
            {showLocationInfo && (
                <div className="absolute top-[255px] left-[3px] mr-2 mt-[-10px] bg-zinc-900 text-gray-300 p-2 rounded-md shadow-md text-xs">
                    <p>State: {bike.State}</p>
                    <p>City: {bike.City}</p>
                    <p>Area: {bike.Area}</p>
                    <p className="text-red-500">Pincode: {bike.pinCode}</p>
                </div>
            )}
            <button
                className={`text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100`}
                onMouseEnter={() => setShowBikeInfo(true)}
                onMouseLeave={() => setShowBikeInfo(false)}
            >
                Bike Info
            </button>
            {showBikeInfo && (
                <div className="absolute top-[240px] left-[3px] mr-2 mt-[-10px] bg-zinc-900 text-gray-300 p-2 rounded-md shadow-md text-xs">
                    <p>Bike Model: {bike.bikeModel}</p>
                    <p>Bike Number: {bike.bikeNumber}</p>
                    <p>Listing Time: {new Date(bike.listingTime).toLocaleString()}</p>
                    <p>Expiration Time: {new Date(bike.expirationTime).toLocaleString()}</p>
                    <p className="text-red-500">
                        Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </p>
                </div>
            )}
        </div>
    </div>
    <button
        className={`bg-[#abd373] hover:bg-[#92c160] text-gray-800 font-bold py-2 px-2 mt-4 rounded focus:outline-none focus:shadow-outline ${isOwnBike ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={handleBookNow}
        disabled={isOwnBike}
        title={tooltipMessage}
    >
        Book Now
    </button>

    {/* Modal for selecting booking hours */}
    {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
            <div className="bg-zinc-300 rounded-lg p-8 w-1/2">
                <h2 className="text-xl font-semibold mb-4">Select Booking Hours</h2>
                <input
                    type="range"
                    min="1"
                    max={maxBookingHours}
                    value={bookingHours}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <p className="text-center mt-4">Selected Hours: {bookingHours}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 mr-2 rounded"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => {
                            orderHandler(id, bookingHours); // Pass the correct parameters
                            setShowModal(false);
                        }}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    )}
</div>

    );
};

export default BikeCard;
