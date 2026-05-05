import React, { useState, useEffect } from "react";
import axios from "axios";
// Added Trash2 icon to imports
import { Search, Filter, Phone, MapPin, Calendar, Clock, Car, Eye, X, User, Navigation, Trash2 } from "lucide-react";

const AdminOneWayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

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

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking permanentely?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/onewaybookingforadmin/delete/${id}`);
        if (res.data.success) {
          // Update UI by filtering out the deleted booking
          setBookings(bookings.filter((booking) => booking._id !== id));
          alert("Booking deleted successfully");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 md:p-12 bg-[#FBFBFB] min-h-screen relative">
      <header className="mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
          One Way <span className="text-orange-600">Bookings</span>
        </h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1 italic">
          Manage Inter-City Trips & Customers
        </p>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 italic border-b">
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Route (From - To)</th>
                <th className="px-6 py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="3" className="text-center py-10 font-bold uppercase text-gray-300 tracking-widest">Loading Records...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="3" className="text-center py-10 font-bold uppercase text-gray-300">No Bookings Found</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 font-black text-gray-950 text-xs">
                        <Calendar size={14} className="text-orange-500" /> {booking.pickupDate}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-gray-800 uppercase italic">
                          {booking.from}
                        </span>
                        <Navigation size={12} className="text-gray-300 rotate-90" />
                        <span className="text-xs font-black text-gray-800 uppercase italic">
                          {booking.to}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* VIEW BUTTON */}
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="p-3 bg-orange-50 text-orange-600 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        {/* DELETE BUTTON */}
                        <button 
                          onClick={() => handleDelete(booking._id)}
                          className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Delete Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-orange-600 p-8 text-white relative">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Booking Details</h2>
              <p className="text-orange-100 text-[9px] font-bold uppercase tracking-widest mt-1">ID: {selectedBooking._id}</p>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Customer Section */}
              <section>
                <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4 border-b pb-2">Customer Info</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400"><User size={20}/></div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Name</p>
                      <p className="text-sm font-black text-gray-800 uppercase italic">{selectedBooking.customerName || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400"><Phone size={20}/></div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Phone</p>
                      <p className="text-sm font-black text-gray-800 italic">{selectedBooking.customerMobile || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mt-1"><MapPin size={20}/></div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Address</p>
                      <p className="text-xs font-bold text-gray-600 leading-relaxed">{selectedBooking.customerAddress || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trip Section */}
              <section>
                <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4 border-b pb-2">Trip & Vehicle</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Vehicle</p>
                    <div className="flex items-center gap-2 font-black text-xs italic uppercase">
                      <Car size={14} className="text-orange-600"/> {selectedBooking.vehicle}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Seats</p>
                    <p className="text-xs font-black italic uppercase">{selectedBooking.seats} Seater</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Time</p>
                    <div className="flex items-center gap-2 font-black text-xs italic uppercase">
                      <Clock size={14} className="text-orange-600"/> {selectedBooking.startTime}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Fare</p>
                    <p className="text-sm font-black text-green-600 italic">₹{selectedBooking.amount}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="px-8 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-colors shadow-lg"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOneWayBookings;