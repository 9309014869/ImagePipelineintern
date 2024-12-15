import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as THREE from 'three';

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const token = sessionStorage.getItem("token");

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        username,
        password,
      });

      sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
      const token = response.data.data.token;
      sessionStorage.setItem('token', token);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
      navigate('/PhotoEditorLanding');
      console.log('Login successful:', response.data);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
      console.error('Error during login:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  const  handlefunction=()=>{
    navigate()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);

   
    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 20); // x
      positions.push((Math.random() - 0.5) * 20); // y
      positions.push((Math.random() - 0.5) * 20); // z
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x44aa88,
      size: 0.1,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

   
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
     
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <ToastContainer />
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="Wallet Icon"
              className="w-12 h-12"
            />
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  value={username}
                  placeholder='Enter Email'
                  onChange={(e) => setusername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="text-white text-lg">➔</span>
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            
            <Link
            to="/singup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;




// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import * as THREE from 'three';
// // import './Login.css'; // Import the CSS file for animations

// function Login() {
//   const [username, setusername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);

//   const handleSignIn = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/user/login', {
//         username,
//         password,
//       });

//       sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
//       const token = response.data.data.token;
//       sessionStorage.setItem('token', token);
//       toast.success('Login successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });  
//       navigate('/home');
//       console.log('Login successful:', response.data);
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });  
//       console.error('Error during login:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSignIn();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas });

//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Create particles
//     const particles = new THREE.BufferGeometry();
//     const particleCount = 5000;
//     const positions = [];

//     for (let i = 0; i < particleCount; i++) {
//       positions.push((Math.random() - 0.5) * 20); // x
//       positions.push((Math.random() - 0.5) * 20); // y
//       positions.push((Math.random() - 0.5) * 20); // z
//     }

//     particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

//     const particleMaterial = new THREE.PointsMaterial({
//       color: 0x44aa88,
//       size: 0.1,
//     });

//     const particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate particles for animation
//       particleSystem.rotation.y += 0.001;
//       particleSystem.rotation.x += 0.0005;

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle window resizing
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="relative min-h-screen">
//       {/* Three.js Canvas */}
//       <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

//       {/* Login Form */}
//       <div className="relative z-10 flex min-h-screen items-center justify-center">
//         <div className="bg-animated p-8 rounded-lg shadow-md w-full max-w-md">
//           <ToastContainer />
//           <div className="flex justify-center mb-6">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
//               alt="Wallet Icon"
//               className="w-12 h-12"
//             />
//           </div>

//           <h2 className="text-center text-2xl font-bold text-gray-900">
//             Sign in to your account
//           </h2>

//           <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Username
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="username"
//                   name="username"
//                   type="username"
//                   required
//                   value={username}
//                   placeholder='Enter Email'
//                   onChange={(e) => setusername(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   placeholder='Enter Password'
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <span className="text-white text-lg">➔</span>
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             <a
//               href="/register"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               Don't have an account? Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
