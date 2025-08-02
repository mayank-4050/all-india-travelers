import React, { useState, useEffect } from 'react';
import logo from '../Photos/All_India_Travel_Logo_Colorful.png';
import { NavLink, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(savedRole);

    console.log("Navbar Loaded - Saved Role:", savedRole); // Debugging
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login');
  };

  // Role-based profile route
  const getProfileRoute = () => {
    switch (role) {
      case 'Admin':
        return '/adminprofile';
      case 'Agent':
        return '/agentprofile';
      case 'Customer':
        return '/customerprofile';
      default:
        return '/login'; // fallback
    }
  };

  return (
    <div
      data-aos="fade-down"
      className={`w-full min-h-[70px] flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      {/* Logo and Hamburger */}
      <div className="w-full md:w-[30%] flex items-center justify-between">
        <img className="w-30 h-auto" src={logo} alt="Logo" />
        <div className="md:hidden">
          {menuOpen ? (
            <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`w-full md:w-auto mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden md:flex'}`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 text-gray-700 text-sm space-y-2 md:space-y-0 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Home</NavLink>
          <NavLink to="/todayoffer" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Today's Offer</NavLink>
          <NavLink to="/ourservices" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Our Services</NavLink>
          <NavLink to="/carrer" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Carrer</NavLink>

          {!isLoggedIn ? (
            <NavLink to="/register" className="md:ml-4">
              <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-2xl text-sm hover:bg-blue-500 hover:text-white transition">
                Register
              </button>
            </NavLink>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(getProfileRoute())}
                className="border border-green-600 text-green-600 px-4 py-1 rounded-2xl text-sm hover:bg-green-600 hover:text-white transition"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-1 rounded-2xl text-sm hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
