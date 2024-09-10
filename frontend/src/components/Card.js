import React from 'react';

function Card({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto">
      <div className="text-black mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
