import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X, ChevronDown, LogOut, User, Zap, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/Photos/all india travels.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Scroll detection for sticky effect
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const getProfileRoute = () => {
    const savedRole = (localStorage.getItem("role") || "").toLowerCase();
    switch (savedRole) {
      case "admin": return "/adminprofile";
      case "agent": return "/agentprofile";
      case "customer": return "/customerprofile";
      default: return "/login";
    }
  };

  // Modern Navigation Link Component
  const NavItem = ({ to, children, icon: Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        relative px-4 py-2 flex items-center gap-2 text-sm font-bold transition-all duration-300 rounded-full
        ${isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"}
      `}
    >
      {Icon && <Icon size={16} />}
      {children}
    </NavLink>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? "top-0 py-2 bg-white/80 backdrop-blur-lg shadow-lg"
          : "top-0 py-4 bg-white shadow-sm"
        } mb-10`}>
        <div className="max-w-7xl  mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* LOGO AREA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-40 md:w-48 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" className="w-full h-auto" />
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-full border border-gray-100">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/todayoffer" icon={Zap}>Offers</NavItem>

            {/* Advanced Dropdown */}
            <div className="relative group px-2">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
                Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 overflow-hidden">
                <NavLink to="/railwayticket" className="block px-5 py-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-600 border-b border-gray-50">Railway Ticket</NavLink>
                <NavLink to="/flightticket" className="block px-5 py-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-600 border-b border-gray-50">Flight Ticket</NavLink>
                <NavLink to="/maiharropeway" className="block px-5 py-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-600">Maihar Ropeway</NavLink>
              </div>
            </div>

            <NavItem to="/contactus" icon={PhoneCall}>Support</NavItem>
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <NavLink to="/register" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-200 transition-all active:scale-95">
                Get Started
              </NavLink>
            ) : (
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
                <button
                  onClick={() => navigate(getProfileRoute())}
                  className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-bold shadow-sm hover:bg-orange-600 hover:text-white transition-all"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors" onClick={() => setMenuOpen(true)}>
            <Menu size={28} className="text-gray-700" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR (Advanced Slide-in) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-[210] shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <img src={logo} alt="logo" className="w-32" />
                <button onClick={() => setMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
              </div>

              <div className="space-y-4 flex-grow">
                <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
                <MobileLink to="/todayoffer" label="Offers" onClick={() => setMenuOpen(false)} />
                <div className="py-2 border-y border-gray-50">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 px-4">Services</p>
                  <MobileLink to="/railwayticket" label="Railway Ticket" onClick={() => setMenuOpen(false)} sub />
                  <MobileLink to="/flightticket" label="Flight Ticket" onClick={() => setMenuOpen(false)} sub />
                </div>
                <MobileLink to="/contactus" label="Contact Us" onClick={() => setMenuOpen(false)} />
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                {!isLoggedIn ? (
                  <button onClick={() => { navigate("/register"); setMenuOpen(false); }} className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold">Join Now</button>
                ) : (
                  <div className="space-y-3">
                    <button onClick={() => { navigate(getProfileRoute()); setMenuOpen(false); }} className="w-full bg-gray-100 py-4 rounded-2xl font-bold flex justify-center gap-2 items-center"><User size={18} /> My Profile</button>
                    <button onClick={handleLogout} className="w-full text-red-500 font-bold py-2">Sign Out</button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-[70px]"></div> {/* Spacer for fixed nav */}
    </>
  );
};

// Helper for Mobile Links
const MobileLink = ({ to, label, onClick, sub }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `block px-4 py-3 rounded-xl font-bold transition-all ${sub ? 'text-sm ml-4' : 'text-lg'} ${isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600'}`}
  >
    {label}
  </NavLink>
);

export default Navbar;