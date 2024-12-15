import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function Signup() {
  const [fullname, setfullname] = useState('');
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleSignUp = async () => {
    try {
      console.log(username, password);
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        fullname,
        email,
        password,
        username
      });

      sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
      sessionStorage.setItem('token', response.data.data.token);

      navigate('/PhotoEditorLanding');
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

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

      // Rotate particles for animation
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
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
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Signup Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="bg-white  backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="Wallet Icon"
              className="w-12 h-12"
            />
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-900">
            Create your Account
          </h2>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  value={fullname}
                  placeholder="Enter Full Name"
                  onChange={(e) => setfullname(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  placeholder="Enter User Name"
                  onChange={(e) => setusername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter Password"
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
                <span className="text-white text-lg">👤</span>
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            <NavLink
              to={"/login"}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
