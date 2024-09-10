import React from 'react';
import Card from './Card';
import { RiMotorbikeFill } from "react-icons/ri";
import { FaDollarSign, FaShieldAlt, FaClipboardList, FaMoneyBillWave, FaHandshake } from 'react-icons/fa'; // Using react-icons for SVGs

function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-500 font-abc">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          icon={<RiMotorbikeFill size={40} className="text-green-500" />}
          title="Wide Selection"
          description="Choose from a wide variety of cars to suit your needs and preferences."
        />
        <Card
          icon={<FaDollarSign size={40} className="text-green-500" />}
          title="Affordable Prices"
          description="Enjoy competitive rates and great deals on car rentals."
        />
        <Card
          icon={<FaShieldAlt size={40} className="text-green-500" />}
          title="Safe and Secure"
          description="Experience peace of mind with our top-notch safety and security measures."
        />
        <Card
          icon={<FaClipboardList size={40} className="text-green-500" />}
          title="Easy Listing"
          description="Quick and easy process to list your car and start earning."
        />
        <Card
          icon={<FaMoneyBillWave size={40} className="text-green-500" />}
          title="Earn Extra Income"
          description="Turn your idle car into a source of additional income."
        />
        <Card
          icon={<FaHandshake size={40} className="text-green-500" />}
          title="Trusted Community"
          description="Join a trusted community of car owners and renters."
        />
      </div>
    </section>
  );
}

export default WhyChooseUs;
