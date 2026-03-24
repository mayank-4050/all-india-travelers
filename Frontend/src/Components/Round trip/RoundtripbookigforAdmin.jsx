import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search, Calendar, MapPin, Phone, User,
  ChevronRight, MoreVertical, Trash2, Eye,
  ArrowLeftRight, Clock, MapPinned, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoundtripbookigforAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 1. Fetch Bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/roundtrip/all');
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 2. DELETE FUNCTION
  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya aap sach mein ye booking delete karna chahte hain?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/roundtrip/${id}`);
        if (response.data.success) {
          // List ko local state se bhi update karo taaki reload na karna pade
          setBookings(bookings.filter(booking => booking._id !== id));
          alert("Booking successfully delete ho gayi!");
        }
      } catch (error) {
        alert("Delete karne mein error aaya!");
        console.error(error);
      }
    }
  };

  // 🔥 3. VIEW FUNCTION
  const handleView = (id) => {
    // Iske liye aapko ek alag detail page banana padega
    navigate(`/admin/round-trip-bookings/${id}`);
  };

  const filteredBookings = bookings.filter(b =>
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">
              Round Trip <span className="text-orange-600">Registry</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">
              Total {bookings.length} Bookings Recorded
            </p>
          </div>

          <div className="relative group flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR ID..."
              className="w-full bg-white border border-slate-100 py-4 pl-12 pr-6 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-xs uppercase tracking-widest transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- STATS --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4 font-sans uppercase">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-600"><MapPinned size={20} /></div>
          <div><p className="text-[8px] font-black text-slate-400">Trips</p><p className="text-lg font-black italic tracking-tighter">{bookings.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4 font-sans uppercase">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600"><Clock size={20} /></div>
          <div><p className="text-[8px] font-black text-slate-400">Revenue</p><p className="text-lg font-black italic tracking-tighter">₹{bookings.reduce((acc, curr) => acc + curr.totalFare, 0).toLocaleString()}</p></div>
        </div>
      </div>

      {/* --- LIST --- */}
      <div className="max-w-7xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-20 font-black text-slate-300 uppercase italic tracking-widest">Loading...</div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="group bg-white hover:bg-slate-900 transition-all duration-500 rounded-[2.5rem] p-6 border border-slate-50 shadow-sm hover:shadow-2xl flex flex-col lg:flex-row lg:items-center gap-8 relative overflow-hidden">

              <div className="absolute top-6 right-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-200 group-hover:text-slate-800 transition-colors">
                {booking.bookingId}
              </div>

              <div className="lg:w-1/4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors"><User size={20} /></div>
                  <div>
                    <h3 className="font-black text-slate-900 group-hover:text-white uppercase italic tracking-tighter transition-colors">{booking.customerName}</h3>
                    <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500 flex items-center gap-1 transition-colors uppercase"><Phone size={10} /> {booking.mobile}</p>
                  </div>
                </div>
              </div>

              <div className="lg:flex-1 border-y lg:border-y-0 lg:border-x border-slate-100 group-hover:border-slate-800 px-0 lg:px-8 py-4 lg:py-0">
                <div className="flex items-center gap-3 mb-2 font-sans font-black text-[10px] uppercase text-slate-800 group-hover:text-slate-200 transition-colors">
                  <MapPin size={14} className="text-orange-500" /> {booking.route[0]?.place} <ArrowLeftRight size={10} className="mx-2 text-slate-300" /> {booking.route[booking.route.length - 1]?.place}
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase text-slate-500 group-hover:text-slate-400 italic">
                  <span>{booking.tripDuration} Days</span>
                  <span>•</span>
                  <span>{booking.vehicleName}</span>
                </div>
              </div>

              <div className="lg:w-1/5 text-right font-sans">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Fare</p>
                <p className="text-2xl font-black italic tracking-tighter text-slate-900 group-hover:text-orange-500 transition-colors">₹{booking.totalFare.toLocaleString()}</p>
              </div>

              {/* 🔥 ACTIVE BUTTONS */}
              {/* 🔥 ACTIVE BUTTONS */}
              <div className="flex items-center gap-2">
                {/* NavLink ko dynamic ID ke saath use karein */}
                <button
                  onClick={() => navigate(`/admin/viewroundtripsinglebooking/${booking._id}`)}
                  className="p-4 rounded-2xl bg-slate-50 group-hover:bg-slate-800 text-slate-400 hover:text-orange-600 transition-all shadow-sm"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="p-4 rounded-2xl bg-slate-50 group-hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-all shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoundtripbookigforAdmin;