import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Phone, MapPin, Calendar, Clock, Car } from "lucide-react";

const AdminOneWayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/onewaybookingforadmin/all");
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6 md:p-12 bg-[#FBFBFB] min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
          One Way <span className="text-orange-600">Bookings</span>
        </h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1 italic">
          Manage Inter-City Trips
        </p>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 italic border-b">
                <th className="px-6 py-5">Date & Time</th>
                <th className="px-6 py-5">Route</th>
                <th className="px-6 py-5">Vehicle</th>
                <th className="px-6 py-5">Fare</th>
                <th className="px-6 py-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10 font-bold uppercase text-gray-300">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-10 font-bold uppercase text-gray-300">No Bookings Found</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 font-black text-gray-950 text-xs">
                        <Calendar size={14} className="text-orange-500" /> {booking.pickupDate}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mt-1 italic pl-5">
                        <Clock size={12} /> {booking.startTime}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-gray-800 flex items-center gap-1 uppercase tracking-tight">
                          <MapPin size={12} className="text-green-500" /> {booking.from}
                        </span>
                        <span className="text-xs font-black text-gray-800 flex items-center gap-1 uppercase tracking-tight">
                          <MapPin size={12} className="text-red-500" /> {booking.to}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 font-black text-gray-950 text-xs uppercase italic tracking-tighter">
                        <Car size={16} className="text-orange-600" /> {booking.vehicle}
                      </div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase pl-6">{booking.seats} Seater</p>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-black text-green-600 italic">₹{booking.amount}</p>
                      <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mt-0.5 italic">Total Fare</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        booking.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOneWayBookings;