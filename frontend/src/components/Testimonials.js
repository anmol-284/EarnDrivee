import React from 'react';

function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-500 font-abc">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Testimonial from a renter */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img src="https://www.pngitem.com/pimgs/m/429-4294523_boy-symbol-png-telemarketer-icon-transparent-png.png" alt="John Doe" className="w-16 h-16 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 font-abc">Anmol Sahu</h3>
          <p className="text-gray-600 mb-2 font-abc">Great service! The bike was in excellent condition and the booking process was seamless.</p>
          <div className="text-yellow-500">
            {"★".repeat(5)}
            {"☆".repeat(0)}
          </div>
        </div>
        {/* Testimonial from a scooty lister */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img src="https://static.vecteezy.com/system/resources/previews/006/195/212/original/woman-or-girl-symbol-line-icon-stroke-graphics-pictogram-for-web-design-quality-outline-symbol-concept-premium-mono-linear-beautiful-simple-concise-logo-vector.jpg" alt="Alice Johnson" className="w-16 h-16 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 font-abc">Raunak Sahu</h3>
          <p className="text-gray-600 mb-2 font-abc">Listing my bike on this platform was so easy! I've been earning extra income every month.</p>
          <div className="text-yellow-500">
            {"★".repeat(4)}
            {"☆".repeat(1)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
