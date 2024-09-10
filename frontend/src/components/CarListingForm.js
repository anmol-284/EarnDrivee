import React, { useState } from 'react';

const CarListingForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    rentalPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend or perform validation
    console.log(formData); // For demonstration, logging form data to console
  };

  return (
    <div className="flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Make</p>
            <input
              type="text"
              name="make"
              placeholder="e.g. Tesla"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.make}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Model</p>
            <input
              type="text"
              name="model"
              placeholder="e.g. Model S"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.model}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Year</p>
            <input
              type="text"
              name="year"
              placeholder="e.g. 2020"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.year}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Color</p>
            <input
              type="text"
              name="color"
              placeholder="e.g. Red"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.color}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">License plate number</p>
            <input
              type="text"
              name="licensePlate"
              placeholder="Enter the license plate number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.licensePlate}
              onChange={handleChange}
            />
          </label>
        </div>
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Rental price per day</h3>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              type="text"
              name="rentalPrice"
              placeholder="$"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
              value={formData.rentalPrice}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#338ae6] text-white text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">List car</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarListingForm;
