import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaySuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNo = searchQuery.get("reference");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="relative z-10 text-white text-center">
        <div class="group duration-500 cursor-pointer group overflow-hidden relative text-gray-50 h-72 w-[500px] rounded-2xl hover:duration-700">
  <div class="w-[500px] h-72 bg-green-200 text-gray-800 flex flex-col justify-center items-center">
   
    <img src='https://cdn-icons-png.freepik.com/512/7518/7518748.png' className='mb-10 w-28 h-28'/>
    <h1 className="text-green-600 text-2xl font-bold mb-10">Payment Success !</h1>
  </div>
  <div class="absolute bg-green-600 -bottom-24 w-[500px] p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
    <p className="text-normal text-black">Reference Number: {referenceNo}</p>
  </div>
  
</div>
      </div>
    </div>
  );
};

export default PaySuccess;
