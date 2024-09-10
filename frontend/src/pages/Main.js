// components/Main.js
import React from 'react';
import Hero from '../components/Hero';
import Header from '../components/Header';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import FAQSection from '../components/FaqSection';

function Main() {
  return (
    <div className='bg-gray-900'>
      <Header />
        <Hero />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default Main;
