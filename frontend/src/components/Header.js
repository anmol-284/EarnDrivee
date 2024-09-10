import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap px-10 py-3 bg-gray-900">
      <div className="flex items-center gap-4">
        <img src='https://i.postimg.cc/m2VvQLp7/freepik-export-20240716050218ysx-Y-removebg-preview.png' className='h-16 w-20'></img>
      </div>
      <nav className="flex flex-1 justify-end gap-8">
        <div className="flex gap-2">
          <button onClick={handleAbout} className="inline-block text-sm ml-2">
            <button class="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 py-[3px]">
              <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500 font-abc">About</span>
              <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </button>
          <Link to="/signup" className="inline-block text-sm">
            <button class="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 py-[3px]">
              <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500 font-abc">Sign Up</span>
              <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </Link>
          <button onClick={handleLogin} className="inline-block text-sm ml-2">
            <button class="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-4 py-[3px]">
              <span class="relative z-10 text-green-500 group-hover:text-white text-xl duration-500 font-abc">Login</span>
              <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
