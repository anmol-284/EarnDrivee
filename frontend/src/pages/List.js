import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ListBikePage = () => {

    const [bikeName, setBikeName] = useState('');
    const [bikeModel, setBikeModel] = useState('');
    const [bikeNumber, setBikeNumber] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [listingTime, setListingTime] = useState('');
    const [expirationTime, setExpirationTime] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const bikeData = {
            bikeName,
            bikeModel,
            bikeNumber,
            State: state,
            City: city,
            Area: area,
            pinCode,
            pricePerHour,
            listingTime,
            expirationTime,
            description,
        };

        console.log('Bike data to be sent:', bikeData);

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            toast.error('No token found');
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/bike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in the headers
                },
                credentials: 'include',
                body: JSON.stringify({
                    bikeName,
                    bikeModel,
                    bikeNumber,
                    State: state,
                    City: city,
                    Area: area,
                    pinCode,
                    pricePerHour,
                    listingTime,
                    expirationTime,
                    description,
                }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const result = await response.json();
                toast.success('Bike listed successfully!');
                console.log('Bike listed successfully', result);
                // Reset form fields
                setBikeName('');
                setBikeModel('');
                setBikeNumber('');
                setState('');
                setCity('');
                setArea('');
                setPinCode('');
                setPricePerHour('');
                setListingTime('');
                setExpirationTime('');
                setDescription('');
            } else {
                const result = await response.json();
                toast.error(`Failed to list bike: ${result.message}`);
                console.error('Failed to list bike:', result.message);
            }
        } catch (error) {
            console.error('Failed to list bike:', error);
            toast.error('Failed to list bike');
        }
    };

    return (
        <div className="bg-cream min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto relative bg-cover" style={{ backgroundImage: "url('https://i.postimg.cc/k4wvNvj2/5172658.jpg')" }}>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75 z-10"></div>
            <main className="relative z-20 flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
                <section className="border-gray-300 p-4 shadow relative">
                    <div className="flex justify-center">
                        <h2 className="text-lg md:text-2xl font-bold uppercase mb-6 text-white">List Your Bike</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex mb-8">
                            <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="bikeName" className="block text-xs font-bold text-white">Bike Name</label>
                                        <input type="text" id="bikeName" className="w-full shadow-inner p-3 border border-gray-300 rounded bg-gray-300 text-black text-sm" placeholder="TVS" value={bikeName} onChange={(e) => setBikeName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="bikeModel" className="block text-xs font-bold text-white">Bike Model Year</label>
                                        <input type="text" id="bikeModel" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="2020" value={bikeModel} onChange={(e) => setBikeModel(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="bikeNumber" className="block text-xs font-bold text-white">Bike Number</label>
                                        <input type="text" id="bikeNumber" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="UP93AS5049" value={bikeNumber} onChange={(e) => setBikeNumber(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-xs font-bold text-white">
                                            Country
                                        </label>
                                        <select id="city" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                            <option value="">Select City</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
       
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-xs font-bold text-white">City</label>
                                        <select id="city" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                                            <option value="">Select City</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="area" className="block text-xs font-bold text-white">Area</label>
                                        {/* <input type="text" id="area" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="Enter Area" value={area} onChange={(e) => setArea(e.target.value)} /> */}
                                        <select id="area" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" value={area} onChange={(e) => setArea(e.target.value)}>
                                            <option value="">Select Area</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="pinCode" className="block text-xs font-bold text-white">PinCode</label>
                                        <input type="text" id="pinCode" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="284303" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="pricePerHour" className="block text-xs font-bold text-white">Price Per Hour</label>
                                        <input type="text" id="pricePerHour" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="100" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="listingTime" className="block text-xs font-bold text-white">Listing Time</label>
                                        <input type="datetime-local" id="listingTime" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" value={listingTime} onChange={(e) => setListingTime(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="expirationTime" className="block text-xs font-bold text-white">Expiration Time</label>
                                        <input type="datetime-local" id="expirationTime" className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" value={expirationTime} onChange={(e) => setExpirationTime(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex mb-6">
                            <div className="md:w-1/3">
                                <legend className="uppercase tracking-wide text-sm text-white">Description</legend>
                            </div>
                            <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                <textarea className="w-full shadow-inner p-3 border border-gray-300 bg-gray-300 rounded text-black text-sm" placeholder="Enter bike description..." rows="6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="md:flex mb-6">
                                <div className="md:w-1/3">
                                <legend className="uppercase tracking-wide text-sm text-white">Bike Image</legend>
                            </div>
                            <button
                                className="rounded-lg ml-[330px] relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                            >
                                <span
                                    className="text-gray-200 font-semibold ml-4 transform group-hover:translate-x-5 transition-all duration-300"
                                >Add Image</span
                                >
                                <span
                                    className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
                                >
                                    <svg
                                        className="svg w-8 text-white"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line x1="12" x2="12" y1="5" y2="19"></line>
                                        <line x1="5" x2="19" y1="12" y2="12"></line>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className='flex justify-center mt-[100px]'>
                            <button
                                type="submit"
                                className="flex items-center just bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointerfont-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                            >
                                List My Bike
                                <svg
                                    className="w-5 h-5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>  
    );
};

export default ListBikePage;
