import React from 'react';

const VehicleFilters = () => {
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
        <p className="text-[#111418] text-sm font-medium leading-normal">All vehicles</p>
      </div>
      <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
        <p className="text-[#111418] text-sm font-medium leading-normal">Cars</p>
      </div>
      <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
        <p className="text-[#111418] text-sm font-medium leading-normal">Bikes</p>
      </div>
      <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
        <input
          type="text"
          placeholder="Search by location"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
        />
      </div>
    </div>
  );
};

export default VehicleFilters;
