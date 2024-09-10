import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { jwtDecode } from 'jwt-decode';
import { Toaster, toast } from 'react-hot-toast';
import TermsModal from '../components/TermsModal';
import { useNavigate } from 'react-router-dom';


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

const Document = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filee, setFilee] = useState(null);
    const [fileee, setFileee] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = decodeToken(token);
            setUserInfo(decodedToken);
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileChangee = (e) => {
        setFilee(e.target.files[0]);
    };

    const handleFileChangeee = (e) => {
        setFileee(e.target.files[0]);
    };

    const handleUploaddd = async () => {
        if (!fileee) {
            toast.error('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('imageFile', fileee);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const token = getToken();
        if (!token) {
            toast.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/upload/document3', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('File Uploaded Successfully.');
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                const result = await response.json();
                toast.error(`Failed to upload image: ${result.message}`);
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
            toast.error('Failed to upload image');
        }
    };


    const handleUploadd = async () => {
        if (!filee) {
            toast.error('Please select a file to uploadd.');
            return;
        }

        const formData = new FormData();
        formData.append('imageFile', filee);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const token = getToken();
        if (!token) {
            toast.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/upload/document2', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('File Uploaded Successfully.');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else {
                const result = await response.json();
                toast.error(`Failed to upload image: ${result.message}`);
            }
        }
        catch (error) {
            console.error('Failed to upload image:', error);
            toast.error('Failed to upload image');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('imageFile', file);

        const token = getToken();
        if (!token) {
            toast.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/upload/document1', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('File Uploaded Successfully.');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else {
                const result = await response.json();
                toast.error(`Failed to upload image: ${result.message}`);
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
            toast.error('Failed to upload image');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        removeCookie('token');
        window.location.href = '/login';
    };

    const removeCookie = (name) => {
        document.cookie = name + '=; Max-Age=0; path=/';
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSubmit = () => {
        toast.success('Bike Listed Successfully.');
        navigate('/bikes');
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
            <div className='flex justify-center items-center gap-20 mt-60'>
                <Toaster position="top-right" />
                <div className="h-[10em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex flex-col justify-center items-center gap-[0.75em] backdrop-blur-[12px]">

                    <div className='flex justify-center items-center'>
                        <h1 className="text-[1.7em] font-medium">Bike Registration</h1>
                    </div>
                    <div className='flex justify-center items-center ml-28'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-2"
                        />
                    </div>
                    <button
                        onClick={handleUpload}
                        className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
                    >
                        <p>Upload Now</p>
                        <svg className="w-6 h-6 group-hover:translate-x-[10%] duration-300" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
                <div className="h-[10em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex flex-col justify-center items-center gap-[0.75em] backdrop-blur-[12px]">

                    <div className='flex justify-center items-center'>
                        <h1 className="text-[1.7em] font-medium">Bike Insurance</h1>
                    </div>
                    <div className='flex justify-center items-center ml-28'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChangee}
                            className="mb-2"
                        />
                    </div>
                    <button
                        onClick={handleUploadd}
                        className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
                    >
                        <p>Upload Now</p>
                        <svg className="w-6 h-6 group-hover:translate-x-[10%] duration-300" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
                <div className="h-[10em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex flex-col justify-center items-center gap-[0.75em] backdrop-blur-[12px]">

                    <div className='flex justify-center items-center'>
                        <h1 className="text-[1.7em] font-medium">Bike Pollution</h1>
                    </div>
                    <div className='flex justify-center items-center ml-28'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChangeee}
                            className="mb-2"
                        />
                    </div>
                    <button
                        onClick={handleUploaddd}
                        className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
                    >
                        <p>Upload Now</p>
                        <svg className="w-6 h-6 group-hover:translate-x-[10%] duration-300" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </button>
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
                                <Link to="/profile" className="flex justify-start gap-2 px-4 py-2 text-white hover:bg-zinc-700"><ImProfile className='mt-[3px]' />My Profile</Link>
                                <button onClick={handleLogout} className="flex justify-start w-full text-left px-4 py-2 gap-2 text-white hover:bg-zinc-700"><IoMdLogOut className='mt-[3px]' />Logout</button>
                            </div>
                        )}
                    </div>
                </div>


            </div>
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
                <label
                    className="relative text-[#5324a6] flex cursor-pointer items-center justify-center gap-[1em] mb-28"
                    htmlFor="tick"
                >   
                    <input className="peer appearance-none" id="tick" name="tick" type="checkbox" />
                    <span
                        className="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-[#5324a6]"
                    ></span>
                    <svg
                        viewBox="0 0 69 89"
                        className="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                        fill="none"
                        height="89"
                        width="69"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
                            stroke-width="6px"
                            stroke="#008080"
                            pathLength="100"
                        ></path>
                    </svg>

                    <p className="text-[1em] font-bold [user-select:none]">
                        I agree to the{' '}
                        <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={openModal}
                        >
                            Terms and Conditions
                        </span>
                        . for listing my bike.
                    </p>
                </label>

                <TermsModal showModal={showModal} closeModal={closeModal} />
                <button onClick={handleSubmit} class="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 py-[2px]">
                    <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">Submit</span>
                    <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                    <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
            </div>
        </div>
    );
};

export default Document;
