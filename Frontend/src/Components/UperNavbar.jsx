import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X } from "lucide-react";
import logo from "/Photos/all india travels.png";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    AOS.init({ duration: 800, once: true });

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

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

  const navBtn =
    "px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition text-sm font-semibold";

  return (
    <>
      {/* Navbar */}
      <div className="w-full sticky top-0 z-50 bg-white shadow-md px-4 md:px-8">

        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <div className="w-[180px]">
            <img src={logo} alt="logo" className="w-full object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">

            <NavLink to="/" className={navBtn}>
              Home
            </NavLink>

            <NavLink to="/todayoffer" className={navBtn}>
              Limited-Time Offer
            </NavLink>

            {/* Services Dropdown */}
            <div className="relative group">

              <button className={navBtn}>
                Our Services
              </button>

              <div className="absolute hidden group-hover:block bg-white border shadow-md mt-1 w-48">

                <NavLink
                  to="/railwayticket"
                  className="block px-4 py-2 hover:bg-orange-100"
                >
                  Railway Ticket
                </NavLink>

                <NavLink
                  to="/flightticket"
                  className="block px-4 py-2 hover:bg-orange-100"
                >
                  Flight Ticket
                </NavLink>

                <NavLink
                  to="/maiharropeway"
                  className="block px-4 py-2 hover:bg-orange-100"
                >
                  Maihar Ropeway
                </NavLink>

              </div>

            </div>

            <NavLink to="/contactus" className={navBtn}>
              Contact Us
            </NavLink>

            {!isLoggedIn ? (

              <NavLink to="/register">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Register
                </button>
              </NavLink>

            ) : (

              <>
                <button
                  onClick={() => navigate(getProfileRoute())}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>

            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>

        </div>

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >

        <div className="p-6 flex flex-col gap-3">

          <div className="flex justify-end">
            <X
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navBtn}>
            Home
          </NavLink>

          <NavLink to="/todayoffer" onClick={() => setMenuOpen(false)} className={navBtn}>
            Limited-Time Offer
          </NavLink>

          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className={navBtn}
          >
            Our Services
          </button>

          {servicesOpen && (

            <div className="flex flex-col gap-2">

              <NavLink to="/railwayticket" onClick={() => setMenuOpen(false)}>
                Railway Ticket
              </NavLink>

              <NavLink to="/flightticket" onClick={() => setMenuOpen(false)}>
                Flight Ticket
              </NavLink>

              <NavLink to="/maiharropeway" onClick={() => setMenuOpen(false)}>
                Maihar Ropeway
              </NavLink>

            </div>

          )}

          <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className={navBtn}>
            Contact Us
          </NavLink>

          {!isLoggedIn ? (

            <NavLink to="/register">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Register
              </button>
            </NavLink>

          ) : (

            <>
              <button
                onClick={() => {
                  navigate(getProfileRoute());
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

      {/* Dark Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

    </>
  );
};

export default Navbar;