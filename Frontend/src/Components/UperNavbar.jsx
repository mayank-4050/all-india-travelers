import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false); // mobile dropdown
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  const getProfileRoute = () => {
    const savedRole = (localStorage.getItem("role") || "").toLowerCase();
    switch (savedRole) {
      case "admin":
        return "/adminprofile";
      case "agent":
        return "/agentprofile";
      case "customer":
        return "/customerprofile";
      default:
        return "/login";
    }
  };

  const navButtonClass =
    "px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition text-sm font-semibold w-full md:w-auto text-center";

  return (
    <div
      data-aos="fade-down"
      className={`w-full py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white"
        }`}
    >
      {/* Title */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-800 font-serif">
          All India Travels
        </h1>
        <p className="text-xs md:text-sm text-gray-500 italic -mt-1">
          and online services
        </p>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute right-4 top-4">
        {menuOpen ? (
          <X
            onClick={() => setMenuOpen(false)}
            className="w-7 h-7 cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setMenuOpen(true)}
            className="w-7 h-7 cursor-pointer"
          />
        )}
      </div>

      {/* Navigation */}
      <div
        className={`w-full md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden md:flex"
          }`}
      >
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-center">
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

          {/* Dropdown */}
          <div className="relative w-full md:w-auto group">
            <button
              onClick={() =>
                window.innerWidth < 768
                  ? setServicesOpen(!servicesOpen)
                  : null
              }
              className={`${navButtonClass} flex items-center justify-center gap-1`}
            >
              Our Services
              <span className="text-xs">▼</span>
            </button>

            <div
              className={`md:absolute left-0 bg-white shadow-lg border border-gray-200 rounded mt-1 w-full md:w-48 z-50 
      ${window.innerWidth < 768
                  ? servicesOpen
                    ? "block"
                    : "hidden"
                  : "hidden group-hover:block"
                }`}
            >
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
                Maihar Ropeway Ticket
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
            <NavLink to="/register" className="w-full md:w-auto">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold w-full md:w-auto">
                Register
              </button>
            </NavLink>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => navigate(getProfileRoute())}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold w-full md:w-auto"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-semibold w-full md:w-auto"
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
