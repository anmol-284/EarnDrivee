import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const UploadCard = ({ title }) => {
  

  

  const getToken = () => {
    return Cookies.get('token');
  };

  
  return (
    <div className="h-[10em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex flex-col justify-center items-center gap-[0.75em] backdrop-blur-[12px]">
      <Toaster position="top-right" />
      <div className='flex justify-center items-center'>
        <h1 className="text-[1.7em] font-medium">Pollution</h1>
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
  );
};

export default UploadCard;
