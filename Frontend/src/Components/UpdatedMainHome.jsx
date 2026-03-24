import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Car, Plane, MapPin, Briefcase, HeartHandshake, 
  TreePine, ArrowRight, Sparkles, ShieldCheck, UserCheck 
} from "lucide-react";
import { motion } from "framer-motion";

export default function UpdatedMainHome() {
  const citizenServices = [
    { name: "Customer One Way Advance Booking", link: "/oneway", icon: <Car />, desc: "Intercity simple drops" },
    { name: "One Way Travel Offer Booking", link: "/todayoffer", icon: <Car />, desc: "Plan your future trips" },
    { name: "Airport / Railway", link: "/airport", icon: <Plane />, desc: "On-time pickup/drop" },
    { name: "Office Use Cab", link: "/office", icon: <Briefcase />, desc: "Daily corporate travel" },
    { name: "Marriage Booking", link: "/marriage-booking", icon: <HeartHandshake />, desc: "Special event fleet" },
    { name: "Local City Cab", link: "/local", icon: <MapPin />, desc: "Travel within city" },
    { name: "Tour Package", link: "/tour", icon: <Car />, desc: "Customized holiday trips" },
    { name: "National Park", link: "/park", icon: <TreePine />, desc: "Wildlife safari cabs" },
  ];

  const agentServices = [
    "One Way Taxi Service", "Round Trip Taxi Service", "Local City Taxi Service",
    "Railway Station Pickup & Drop", "Airport Pickup / Drop", "National Park Taxi",
    "Monthly Cab/Taxi Service", "Tour Package Taxi"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* --- PRO OFFER BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 shadow-2xl shadow-orange-200"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="bg-orange-400/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Premium Deal</span>
              <h1 className="text-3xl md:text-5xl font-black text-white mt-2 italic tracking-tighter">ONE WAY TAXI</h1>
              <p className="text-orange-100 mt-2 font-medium">Safe & Affordable Intercity Travels at Lowest Prices.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-xl mb-4 animate-pulse">LIMITED TIME OFFER!</span>
              <NavLink to="/todayoffer">
                <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-orange-50 transition-all flex items-center gap-2 group">
                  EXPLORE OFFERS <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </NavLink>
            </div>
          </div>
        </motion.div>

        {/* --- SERVICES SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* CUSTOMER BOOKING */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Customer Booking</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {citizenServices.map((item) => (
                <NavLink key={item.name} to={item.link} className="group">
                  <div className="h-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm group-hover:shadow-xl group-hover:border-orange-200 group-hover:-translate-y-1 transition-all duration-300">
                    <div className="bg-orange-50 p-3 rounded-xl text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </section>

          {/* AGENT SERVICES */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Agent Services</h2>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm relative overflow-hidden">
               {/* Background Decorative Element */}
              <div className="absolute -bottom-10 -right-10 text-gray-50 opacity-5">
                <Briefcase size={200} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {agentServices.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    {item}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] text-blue-700 font-semibold text-center italic">
                  Partner with All India Travels for seamless business operations.
                </p>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}