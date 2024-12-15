import axios from "axios";
import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PhotoEditorLanding = () => { //hello@imagepipeline.io
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/editphoto");
      };
      const token = sessionStorage.getItem("token");

      const [userData, setUserData] = useState(null);
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/v1/user/getUser",{
              headers: {
                Authorization: `Bearer ${token}`
              }});
            setUserData(response.data.data.user.username);
            // console.log(response.data.data.user.username);
            toast.success('User data fetched successfully!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                backgroundColor: '#4CAF50', // Green for success
                color: '#FFFFFF',          // White text
              },
            });
          } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error('Failed to fetch user data!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                backgroundColor: '#FF5252', // Red for error
                color: '#FFFFFF',          // White text
              },
            });
          }
        };
    
        fetchUserData();
      },[]);
      // const handleClick1 = () => {
      //   navigate("/login");
      // };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
     
      <nav className="flex justify-between items-center px-6 py-4 md:px-12">
        <div className="text-2xl font-bold">Imagepipeline</div>
        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:underline">Pricing</button>
          <div>
      {!userData ? (
        <button className="hover:underline text-blue-600">
          Sign up / Log in
        </button>
      ) : (
        <button className="flex flex-col p-4 items-center hover:underline text-blue-600">
          {/* Profile Icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Profile Icon"
            className="w-9 h-10 mb-2"
          />
          {/* User Name */}
          <span>{userData}</span>
        </button>
      )}
    </div>
          <button className="px-4 py-2 bg-yellow-500 rounded-md font-medium">
            Try premium
          </button>
        </div>
        
        <div className="md:hidden">
          <button className="text-2xl">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-4 md:px-8 lg:px-20">
        <h1 className="text-xl font-semibold mb-4">Free Online</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-6">
          PHOTO EDITOR
        </h2>
        <p className="text-base md:text-lg max-w-2xl mb-8">
          AI Image Generator and AI Design tools. The suite for all your
          creative photo and design editing needs directly in your web browser,
          on your smartphone, or on your desktop. All free. The only limit is
          your imagination!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={handleClick} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Open AI Photo Editor
          </button>
          <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-800 transition">
            AI Image Generator
          </button>
        </div>
      </section>

      {/* Icons Section */}
      <div className="flex flex-wrap justify-center gap-6 py-8 px-4">
        {["F", "X", "D", "Bg"].map((icon, index) => (
          <div
            key={index}
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl md:text-2xl rounded-full"
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoEditorLanding;
