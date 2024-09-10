import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/bwqYY07R/pixlr-image-generator-a28270ca-2fb5-444a-9907-8de7fb5ae608.png')",
          filter: 'brightness(70%) contrast(90%)', 
        }}>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mix-blend-screen font-abc">Rent or List Your <span className='text-green-400'>Bike</span></h1>
        <p className="mt-4 text-xl md:text-2xl mix-blend-screen font-abc">The easiest way to earn money or get the perfect ride</p>
        <div className="mt-[50px] mb-[430px]">
          <Link to="/signup" className="inline-block text-sm mt-10">
            <button
              type="button"
              class="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
            >
              <div
                class="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
              >
                <img src='https://i.postimg.cc/DwFFsr5C/road-removebg-preview.png' alt='get started'></img>
                
              </div>
              <Link to="/forgot-password" class="translate-x-2 ml-10 font-abc">Get Started</Link>
            </button>

          </Link>

        </div>
      </div>
    </div>
  );
};

export default Hero;
