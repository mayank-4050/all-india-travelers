import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'; 
import {
  ArrowLeft, Search, Calendar, MapPin, Car,
  IndianRupee, Trash2, RefreshCcw, Eye, ChevronUp, User, Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LocalBookingsForAdmin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // ✅ Updated to correct endpoint
      const response = await axios.get("http://localhost:5000/api/localbookings/all");
      if (response.data.success) setBookings(response.data.data);
    } catch (error) { 
      console.error("Fetch Error:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Kya aap sure hain?',
      text: "Ye booking permanent delete ho jayegi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Haan, delete karein!',
      cancelButtonText: 'Nahi, rehne dein',
      background: '#ffffff',
      borderRadius: '2rem',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ Updated to correct delete endpoint
          const res = await axios.delete(`http://localhost:5000/api/localbookings/delete/${id}`);
          if (res.data.success) {
            setBookings(bookings.filter(b => b._id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Booking delete ho gayi hai.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              borderRadius: '2rem'
            });
          }
        } catch (error) {
          Swal.fire('Error!', 'Kuch galat hua, backend check karein.', 'error');
        }
      }
    });
  };

  useEffect(() => { fetchBookings(); }, []);

  // ✅ Search includes Customer Name, Location, or Car
  const filteredBookings = bookings.filter((b) =>
    b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.trips?.some(t => t.vehicle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.startPoint?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <div className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full"><ArrowLeft size={18} /></button>
          <h1 className="text-lg font-black uppercase italic tracking-tighter text-slate-800">
            Local <span className="text-orange-600">Admin</span>
          </h1>
          <button onClick={fetchBookings} className="p-2 text-orange-600"><RefreshCcw size={18} /></button>
        </div>
        <div className="mt-3 max-w-4xl mx-auto relative">
          <input
            type="text" placeholder="Search Name, Location, Car..."
            className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-3">
        {loading ? (
            <div className="text-center py-20 font-black uppercase text-slate-300 italic tracking-widest animate-pulse">Loading Records...</div>
        ) : filteredBookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all">

            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-100"><User size={20} /></div>
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight">
                    {booking.customerName || 'N/A'}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-0.5 uppercase italic">
                    <Calendar size={10} className="text-orange-500" /> {new Date(booking.createdAt).toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 flex items-center justify-end tracking-tighter">
                    <IndianRupee size={12} /> {booking.grandTotal}
                </p>
                <p className="text-[9px] font-black text-orange-500 uppercase italic">Total {booking.trips?.length} Trip(s)</p>
              </div>
            </div>

            <div className="flex border-t border-slate-50">
              <button
                onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)}
                className="flex-1 py-3 text-[10px] font-black uppercase text-slate-400 flex items-center justify-center gap-2 hover:text-orange-600 transition-colors"
              >
                {expandedId === booking._id ? <ChevronUp size={14} /> : <Eye size={14} />} {expandedId === booking._id ? "Close Details" : "View Details"}
              </button>
              <button
                onClick={() => handleDelete(booking._id)} 
                className="px-6 py-3 text-red-500 border-l border-slate-50 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* EXPANDABLE SECTION */}
            {expandedId === booking._id && (
              <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                
                {/* 👤 NEW: CUSTOMER INFO SECTION */}
                <div className="bg-white rounded-[1.5rem] p-5 border border-orange-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-5"><User size={50} className="text-orange-600"/></div>
                    <h4 className="text-[10px] font-black uppercase text-orange-600 tracking-[0.2em] mb-4 border-b border-orange-50 pb-2 flex items-center gap-2">
                        <User size={14} /> Passenger Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-xl text-orange-600"><Phone size={14}/></div>
                            <a href={`tel:${booking.customerMobile}`} className="text-xs font-black text-slate-700 underline decoration-orange-200 decoration-2">
                                {booking.customerMobile || 'N/A'}
                            </a>
                        </div>
                        <div className="flex items-start gap-3 md:col-span-2 border-t border-slate-50 pt-3">
                            <div className="p-2 bg-orange-50 rounded-xl text-orange-600 mt-0.5"><MapPin size={14}/></div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Address</p>
                                <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase italic">
                                    {booking.customerAddress || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Trip Itinerary</h4>

                {booking.trips.map((trip, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs font-black text-slate-800 uppercase italic">Trip #{idx + 1}</p>
                        <p className="text-[10px] font-bold text-slate-400">{trip.vehicle}</p>
                      </div>
                      <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black">
                        ₹{trip.amount}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 underline decoration-orange-100">
                          <MapPin size={12} className="text-orange-500" /> {trip.startPoint}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                          <Calendar size={12} className="text-orange-500" />
                          {trip.date ? new Date(trip.date).toLocaleDateString('en-GB') : 'N/A'}
                        </div>
                      </div>

                      <div className="bg-slate-100 rounded-xl p-2 space-y-1">
                        <div className="flex justify-between text-[9px] font-black uppercase">
                          <span className="text-slate-400">Plan:</span>
                          <span className="text-slate-700">{trip.time}H / {trip.runningKm}K</span>
                        </div>
                        <div className="flex justify-between text-[9px] font-black uppercase border-t border-slate-200 pt-1">
                          <span className="text-slate-400">Extra:</span>
                          <span className="text-orange-600">₹{trip.extraHr}/H • ₹{trip.extraKm}/K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center px-2 pt-2 border-t border-slate-200">
                  <p className="text-[9px] font-bold text-slate-300 uppercase italic">Ref ID: {booking.bookingId || booking._id.slice(-8).toUpperCase()}</p>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Bill Total</p>
                    <p className="text-lg font-black text-slate-900 leading-none tracking-tighter">₹{booking.grandTotal}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalBookingsForAdmin;