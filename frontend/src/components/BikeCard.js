import React, { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import axios from 'axios';
    
const BikeCard = ({ bike, orderHandler }) => {
    const [showBikeInfo, setShowBikeInfo] = useState(false);
    const [showLocationInfo, setShowLocationInfo] = useState(false);
    const [timeLeft, setTimeLeft] = useState({});
    const [bookingHours, setBookingHours] = useState(1); // Default booking hours
    const [showModal, setShowModal] = useState(false); // Modal state
    const [maxBookingHours, setMaxBookingHours] = useState(1); // Max booking hours based on time left
    const [isBooked, setIsBooked] = useState(bike.isBooked || false); // State to track if the bike is booked

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const expiration = new Date(bike.expirationTime);
            const difference = expiration - now;

            let timeLeft = {};
            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
                setMaxBookingHours(Math.floor(difference / (1000 * 60 * 60)));
            } else {
                setMaxBookingHours(0);
            }
            setTimeLeft(timeLeft);
        };
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [bike.expirationTime]);

    const handleWhatsAppClick = () => {
        // Assuming the owner's WhatsApp number is stored in the owner object
        if (bike.owner && bike.owner.whatsapp) {
            const whatsappURL = `https://wa.me/${bike.owner.whatsapp}`;
            window.open(whatsappURL, '_blank');
        } else {
            console.error('Owner WhatsApp number not available');
        }
    };

    const handleBookNow = () => {
        if (isBooked) return; // Prevent opening modal if already booked
        setShowModal(true); // Show modal on "Book Now" click
    };

    const handleSliderChange = (event) => {
        setBookingHours(parseInt(event.target.value, 10));
    };

    const amount = bookingHours * bike.pricePerHour;
    const id = bike._id;
    console.log(id);

    return (
        <div className="m-2 font-abc group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all">
            <img
                src={bike.imageUrl}
                alt={bike.bikeName}
                className="w-44 card1img font-abc aspect-square text-[#abd373] group-hover:bg-gray-800 text-5xl rounded-full p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto"
            />
            <p className="cardtxt font-abc font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl">
                {bike.bikeName}
            </p>
            <p className="blueberry font-abc font-semibold text-gray-400 text-xs group-hover:text-gray-700">
                {bike.description}
            </p>
            <div className="ordernow font-abc flex flex-row justify-between items-center w-full mt-4">
                <p className="ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800 mr-10">
                    ₹{bike.pricePerHour.toFixed(2)} /hr
                </p>
                <button
                    className="mr-2 text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100"
                    onClick={handleWhatsAppClick}
                    disabled={isBooked}
                >
                    <IoLogoWhatsapp size={20} />
                </button>
                <div className="flex gap-2 font-abc">
                    <button
                        className="text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-white"
                        onMouseEnter={() => setShowLocationInfo(true)}
                        onMouseLeave={() => setShowLocationInfo(false)}
                        disabled={isBooked}
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
                        className="text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100"
                        onMouseEnter={() => setShowBikeInfo(true)}
                        onMouseLeave={() => setShowBikeInfo(false)}
                        disabled={isBooked}
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
                className="bg-[#abd373] hover:bg-[#92c160] text-gray-800 font-bold py-2 px-2 mt-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleBookNow}
                disabled={isBooked}
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
                                onClick={() => orderHandler(bike._id,amount)}
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
