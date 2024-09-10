import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-y-[1px]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold">EarnDrive</h3>
          <p className="text-gray-400 mt-1">© 2024 EarnDrive. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-indigo-500">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-indigo-500">
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="text-center md:text-left">
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
