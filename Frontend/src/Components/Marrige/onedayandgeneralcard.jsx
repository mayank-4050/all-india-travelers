import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../UperNavbar";

const OnedayAndGeneralCard = () => {
  return (
    <div className="">
        <Navbar/>
        <div className="mt-40 flex items-center justify-center  p-6">
        

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* Per Day Booking Card */}
        <NavLink to="/perday-booking">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition cursor-pointer border">

            <h2 className="text-2xl font-bold text-orange-600 mb-3">
              Per Day Car Booking
            </h2>

            <p className="text-gray-600">
              Car for full day usage for weddings, events
              travel with flexible time and comfort.
            </p>

            

          </div>
        </NavLink>

        {/* General Booking Card */}
        <NavLink to="/general-booking">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition cursor-pointer border">

            <h2 className="text-2xl font-bold text-green-600 mb-3">
              General Booking
            </h2>

            <p className="text-gray-600">
              Car booking as packege, usage for weddings, events
              travel with flexible time and comfort.
            </p>

            

          </div>
        </NavLink>

      </div>

    </div>
    </div>
  );
};

export default OnedayAndGeneralCard;