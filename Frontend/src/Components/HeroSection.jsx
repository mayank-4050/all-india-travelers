import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {

  const travelOptions = [
  { label: "One way travel", path: "/oneway" },
  { label: "Round trip Travel" },   //path: "/outstation"
  { label: "Local travel" },    //, path: "/local"
  { label: "Airport/Railway Station" },      //path: "/ambulance"
];
  return (
    <motion.div
      className="w-full h-fit flex justify-center mt-7"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-[95%] h-fit bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-xl py-4 px-7 flex flex-col items-center gap-4 shadow-xl">
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row w-full sm:w-[27%] justify-between text-white text-sm gap-2 sm:gap-0">
          <div className="flex items-center gap-1 hover:text-gray-200 transition">
            <i className="fa-solid fa-phone"></i>
            <p>+91 7987189304</p>
          </div>
          <div className="flex items-center gap-1 hover:text-gray-200 transition">
            <i className="fa-solid fa-envelope"></i>
            <p>xyz@gmail.com</p>
          </div>
        </div>

        {/* Travel Type Buttons */}
        <motion.div
  className="w-full sm:w-[60%] h-fit rounded-xl bg-white px-4 py-2 flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-2 sm:gap-0 shadow-lg"
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.3, duration: 0.4 }}
>
  {travelOptions.map(({ label, path }, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <NavLink
        to={path}
        className="px-2 py-1 bg-gray-100 hover:bg-orange-200 rounded cursor-pointer transition whitespace-nowrap text-sm"
      >
        {label}
      </NavLink>
    </motion.div>
  ))}
</motion.div>

        {/* Heading Text */}
        <motion.div
          className="flex flex-col text-white items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h1 className="font-extrabold text-4xl italic tracking-widest hover:tracking-wider transition-all duration-300">
            All India Travel & Online Services
          </h1>
          <p className="text-white text-lg font-medium hover:text-gray-200 transition">
            Your Journey Begins Here.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
