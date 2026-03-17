import React from "react";
import { NavLink } from "react-router-dom";
import {
  Car,
  Plane,
  MapPin,
  Briefcase,
  HeartHandshake,
  TreePine,
} from "lucide-react";

export default function UpdatedMainHome() {
  const citizenServices = [
    { name: "One Way Cab Booking", link: "/oneway", icon: <Car size={20} /> },
    { name: "Advance Cab Booking", link: "/advance", icon: <Car size={20} /> },
    { name: "Airport / Railway Pickup", link: "/airport", icon: <Plane size={20} /> },
    { name: "Office Use Cab Booking", link: "/office", icon: <Briefcase size={20} /> },
    { name: "Marriage Cab Booking", link: "/marriage-booking", icon: <HeartHandshake size={20} /> },
    { name: "Local City Cab", link: "/local", icon: <MapPin size={20} /> },
    { name: "Tour Package Cab", link: "/tour", icon: <Car size={20} /> },
    { name: "National Park Cab", link: "/park", icon: <TreePine size={20} /> },
  ];

  const agentServices = [
    "One Way Taxi Service",
    "Round Trip Taxi Service",
    "Local City Taxi Service",
    "Railway Station Pickup",
    "Airport Pickup / Drop",
    "National Park Taxi",
    "Cab Service",
    "Tour Package Taxi",
  ];

  return (
    <div className=" bg-white p-3 md:p-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">

        {/* Offer Banner */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 border rounded-xl p-4 md:p-6 border-green-700 bg-[#F6F8D5] shadow-sm">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-wide">
            ONE WAY TAXI
          </h1>

          <div className="flex-1 text-center">
            <span className="text-lg md:text-2xl font-extrabold tracking-wider">
              LIMITED TIME OFFER
            </span>
          </div>

          <NavLink to="/todayoffer">
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-semibold transition">
              OFFER VISIT
            </button>
          </NavLink>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Citizen Booking */}
          <div className="bg-[#F6F8D5] border-2 border-lime-700 rounded-xl p-5 shadow-md">

            <h2 className="text-center bg-orange-400 text-white font-semibold py-2 rounded-md mb-5 text-lg">
              Customer Booking
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {citizenServices.map((item) => (
                <NavLink key={item.name} to={item.link}>

                  <div className="flex items-center gap-3 bg-white border border-lime-700 rounded-lg p-3
                  hover:bg-lime-50 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer">

                    <div className="text-orange-500">
                      {item.icon}
                    </div>

                    <span className="text-sm font-medium">
                      {item.name}
                    </span>

                  </div>

                </NavLink>
              ))}

            </div>

          </div>

          {/* Agent Services */}
          <div className="bg-[#F6F8D5] border-2 border-lime-700 rounded-xl p-5 shadow-md">

            <h2 className="text-center bg-orange-400 text-white font-semibold py-2 rounded-md mb-5 text-lg">
              Agent Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {agentServices.map((item) => (

                <div
                  key={item}
                  className="bg-white border border-lime-700 rounded-lg p-3
                  hover:bg-lime-50 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer text-sm font-medium"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}