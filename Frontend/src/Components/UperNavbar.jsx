import React, { useState, useEffect } from 'react';
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login');
  };

  const getProfileRoute = () => {
    switch (role) {
      case 'Admin':
        return '/adminprofile';
      case 'Agent':
        return '/agentprofile';
      case 'Customer':
        return '/customerprofile';
      default:
        return '/login';
    }
  };

  const navButtonClass =
    'px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition text-sm font-semibold';

  return (
    <div
      data-aos="fade-down"
      className={`w-full py-5 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
    >
      {/* Title */}
      <div className="flex flex-col items-center md:items-start py-2">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-800 font-serif">
          All India Travels
        </h1>
        <p className="text-sm text-gray-500 italic -mt-1">
          and online services
        </p>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute right-4 top-5">
        {menuOpen ? (
          <X onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
        ) : (
          <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
        )}
      </div>

      {/* Navigation */}
      <div
        className={`w-full md:w-auto mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden md:flex'
          }`}
      >
        {/* Navigation */}
        <div
          className={`w-full md:w-auto mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden md:flex'
            }`}
        >
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-center relative">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${navButtonClass} text-blue-500`
                  : navButtonClass
              }

            >
              Home
            </NavLink>

            <NavLink
              to="/todayoffer"
              className={({ isActive }) =>
                isActive
                  ? `${navButtonClass} text-blue-500`
                  : navButtonClass
              }
            >
              Limited-Time Offer
            </NavLink>

            {/* Dropdown for Our Services */}
            <div className="relative group">
              <button className={`${navButtonClass} flex items-center gap-1`}>
                Our Services
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg border border-gray-200 rounded mt-1 w-48 z-50">
                <NavLink
                  to="/railwayticket"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Railway Ticket
                </NavLink>
                <NavLink
                  to="/flightticket"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Flight Ticket
                </NavLink>
                <NavLink
                  to="/maiharropeway"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Maihar Ropway Ticket
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                isActive
                  ? `${navButtonClass} text-blue-500`
                  : navButtonClass
              }
            >
              Contact Us
            </NavLink>

            {!isLoggedIn ? (
              <NavLink to="/register">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold">
                  Register
                </button>
              </NavLink>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(getProfileRoute())}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
