import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import { jwtDecode } from 'jwt-decode'; // Corrected import

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Replace 'token' with your token's key in localStorage
};

// Function to decode the token
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Info Component
const Info = () => {
  const [userInfo, setUserInfo] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState('');

  const handleEditClick = (field) => {
    setFieldToEdit(field);
    setIsModalOpen(true);
  };

  const handleSave = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        ...decodedToken,
      }));
      setGreeting(getGreeting());
    }
  }, []);

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) return 'Good morning';
    else if (currentTime >= 12 && currentTime < 18) return 'Good afternoon';
    else return 'Good evening';
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start bg-gray-900">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-14 left-8 p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {greeting},{' '}
          <span className="text-amber-300">
            {userInfo ? userInfo.firstname.charAt(0).toUpperCase() + userInfo.firstname.slice(1) : 'User'}
          </span>
        </h1>
      </div>
      <div className="flex justify-between w-screen">
        <div className="flex flex-col items-start ml-8">
          <div className="card text-gray-300 w-[370px] h-[450px] mt-[190px] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden relative">
            <div className="px-8 py-10">
              <div className="bg-orange-500 w-10 h-10 flex justify-center items-center rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
              <div className="flex flex-col gap-10 items-center mt-8">
                <Link to="/info" className="mb-4">
                  <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">
                    My Info
                  </button>
                </Link>
                <Link to="/myrides">
                  <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">
                    My Rides
                  </button>
                </Link>
                <Link to="/mybikes">
                  <button className="uppercase smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-zinc-500">
                    My Bikes
                  </button>
                </Link>
              </div>
            </div>
            <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
            <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
          </div>
        </div>
        <div className="w-[800px] mt-20 mx-auto p-4 border-gray-400	">
          <div className="flex flex-col items-center bg-white opacity-75 p-6 rounded-lg shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <button class="button" onClick={() => handleEditClick('profilePicture')}>
              <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>
            </button>
            <div className="w-full mt-10">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Name</h2>
                <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>

              </div>
              <p className="text-gray-700 mb-4">{userInfo.firstname+" "+userInfo.lastname}</p>

              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Email</h2>
                <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>

              </div>
              <p className="text-gray-700 mb-4">{userInfo.email}</p>

              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Phone</h2>
                <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>

              </div>
              <p className="text-gray-700 mb-4">{userInfo.phone ? userInfo.phone : "Add Mobile No."}</p>

              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Address</h2>
                <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>

              </div>
              <p className="text-gray-700 mb-4">{userInfo.address ? userInfo.address : "Add City"}</p>
              <div className="flex justify-center items-center mb-2 gap-4">
                <h2 className="text-xl font-semibold mt-[2px]">Change Password   </h2>
                <svg class="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>

              </div>
            </div>
          </div>

          {isModalOpen && (
            <EditProfileModal
              field={fieldToEdit}
              currentValue={userInfo[fieldToEdit]}
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
