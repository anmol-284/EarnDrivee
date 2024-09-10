// src/pages/About.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Header />
      <div className="p-8 bg-gray-900 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-green-500 mb-6">About Us</h1>
        
        <section className="mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to our Bike Rental Platform, where we connect bike owners with people who need a ride.
            Our mission is to provide a seamless and secure way for bike owners to earn money from their bikes
            and for riders to find affordable and convenient transportation options. Whether you have an extra
            bike sitting in your garage or you need a bike for your next adventure, our platform is here to help!
          </p>
        </section>
        <img src='https://imgd.aeplcdn.com/1280x720/n/cw/ec/181601/bajaj-cng-freedom-125-left-front-three-quarter2.jpeg?isig=0' alt="Community" className="w-full max-w-md mx-auto rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 mt-8" />

        <section className="text-center max-w-2xl mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 mt-10">Why Choose Us?</h2>
          <p className="text-gray-300 leading-relaxed">
            Our platform is built on trust and convenience. With user-friendly features and a focus on security,
            we aim to make bike renting and listing as easy as possible. Join our community today and experience
            the benefits of our bike-sharing economy!
          </p>
          <img src='https://png.pngtree.com/png-clipart/20230915/original/pngtree-cute-cartoon-boy-of-an-orange-hair-vector-png-image_12199282.png' alt="Community" className="w-40 max-w-md mx-auto rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 mt-8" />
        </section>

        <section className="text-center max-w-2xl mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            I am Anmol Sahu, currently in my 3rd year of college pursuing BTech from Motilal Nehru Institute of Technology, Allahabad. My aim is to build 'Earndrive' into a successful platform that not only connects bike owners and riders but also contributes to a greener and more connected world. As a passionate entrepreneur, I believe in the power of innovative ideas and the drive to turn dreams into reality. Building 'Earndrive' is more than just a project—it's a mission to make transportation more accessible and efficient for everyone. Let's ride together towards a brighter, more sustainable future!
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
