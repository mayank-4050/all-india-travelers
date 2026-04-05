import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, Navigation, MapPin, Clock, Plane, Star, } from 'lucide-react';

const HeroSection = () => {
  const travelOptions = [
    { label: "One Way", path: "/oneway", icon: <Navigation size={18} /> },
    { label: "Round Trip", path: "/roundtrip", icon: <MapPin size={18} /> },
    { label: "Local City", path: "/local", icon: <Clock size={18} /> },
    { label: "Airport/Station", path: "/airportandraiway", icon: <Plane size={18} /> },
  ];

  return (
    <div className="relative w-full overflow-hidden pt-4 pb-8 px-4 font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-[-5%] w-80 h-80 bg-gray-500/10 rounded-full blur-3xl"></div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-orange-950 rounded-[2rem] shadow-2xl border border-white/5">
          <div className="absolute inset-0 bg-black/30 z-0"></div>

          <div className="relative z-10 py-10 px-6 sm:px-16 flex flex-col items-center gap-8 text-center">
            
            {/* Top Bar: Contact Info */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-orange-400 text-xs font-bold shadow-lg">
                <Phone size={14} fill="currentColor" />
                <span>+91 9301858537</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-white/90 text-xs font-medium shadow-lg">
                <Mail size={14} className="text-orange-400" />
                <span className="italic">allindiatrevls6607@gmail.com</span>
              </div>
            </div>

            {/* Main Heading Section */}
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-center gap-2 text-orange-500 font-bold tracking-[0.3em] text-[10px] uppercase border-b border-orange-500/20 pb-1 mx-auto w-fit">
                <Star size={10} fill="currentColor" />
                Premium Travel Experience
                <Star size={10} fill="currentColor" />
              </div>

              <h1 className="font-black text-3xl sm:text-5xl italic tracking-widest text-white leading-tight">
                ALL INDIA TRAVELS <br />
                <span className="text-xl sm:text-2xl font-light not-italic tracking-[0.4em] text-orange-500/80 block mt-2">& ONLINE SERVICES</span>
              </h1>
            </div>

            {/* --- TRAVEL OPTIONS BUTTONS (Error Fixed) --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl gap-3 sm:gap-4 mt-2">
              {travelOptions.map(({ label, path, icon }, index) => (
                <NavLink
                  key={index}
                  to={path || "#"}
                  className="group relative"
                >
                  {/* NavLink gives access to isActive through a function as a child */}
                  {({ isActive }) => (
                    <div className={`
                      flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-300 border
                      ${isActive
                        ? "bg-orange-600 border-orange-400 shadow-[0_10px_30px_rgba(234,88,12,0.4)] scale-105"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/50 backdrop-blur-md"
                      }
                    `}>
                      <div className={`mb-2 transition-transform duration-300 group-hover:-translate-y-1 ${isActive ? "text-white" : "text-orange-500"}`}>
                        {icon}
                      </div>
                      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {label}
                      </span>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex gap-6 opacity-30 mt-4 text-[8px] font-bold tracking-widest uppercase italic text-white">
              <p>Speed</p> <p>Safety</p> <p>Support</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;