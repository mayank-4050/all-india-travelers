import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, IndianRupee, Users, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

import crysta from "/Photos/crysta.jpg";
import dzire from "/Photos/dzire.jpg";
import ertiga from "/Photos/ertiga.webp";
import zest from "/Photos/zest.jpg";

const carInfo = {
  "Dzire Car": { img: dzire, seater: "5" },
  "Zest": { img: zest, seater: "5" },
  "Ertiga": { img: ertiga, seater: "7" },
  "Innova": { img: crysta, seater: "7/8" },
  "Inova Crista": { img: crysta, seater: "7" },
  "Tavera 10": { img: zest, seater: "10" },
  "Teveller 12": { img: ertiga, seater: "12" }
};

const LocalBookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { bookingDetails } = location.state || { bookingDetails: [] };
  const grandTotal = bookingDetails.reduce((sum, trip) => sum + Number(trip.amount), 0);

  // WhatsApp Message Formatting & API Call
  const handleFinalBooking = async () => {
    if (bookingDetails.length === 0) return;
    
    setLoading(true);
    try {
      // 1. Backend me data save karna
      const response = await axios.post("http://localhost:5000/api/localbookings", {
        bookingDetails: bookingDetails
      });

      if (response.data.success) {
        // 2. WhatsApp message taiyar karna
        let message = `*New Local Cab Booking - All India Travels*%0A%0A`;
        bookingDetails.forEach((trip, index) => {
          message += `*Trip ${index + 1}*%0A`;
          message += `🚗 Car: ${trip.vehicle}%0A`;
          message += `📍 Pickup: ${trip.startPoint}%0A`;
          message += `📅 Date: ${trip.date}%0A`;
          message += `⏰ Plan: ${trip.time}Hr / ${trip.runningKm}Km%0A`;
          message += `💰 Fare: ₹${trip.amount}%0A`;
          message += `--------------------------%0A`;
        });
        message += `*Grand Total: ₹${grandTotal}*`;

        const whatsappNumber = "919301858537"; // Apna WhatsApp number yahan dalein
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        
        alert("Booking Successful!");
        navigate('/'); // Home par wapas bhej dena
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Backend connection error. Check if your server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (bookingDetails.length === 0) {
    return <div className="p-10 text-center font-bold">No booking data found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full"><ArrowLeft size={18}/></button>
        <h2 className="text-lg font-black tracking-tight text-slate-800 underline decoration-orange-500 decoration-4">Booking <span className="text-orange-500">Summary</span></h2>
        <div className="w-8"></div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-6 space-y-6">
        {bookingDetails.map((trip, index) => (
          <div key={index} className="bg-white rounded-[2rem] p-5 border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex gap-4 items-center border-b border-slate-50 pb-4">
              <img src={carInfo[trip.vehicle]?.img || dzire} className="w-24 h-16 object-cover rounded-2xl border-2 border-slate-100" alt=""/>
              <div>
                <h3 className="font-black text-lg leading-tight text-slate-800">{trip.vehicle}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 mt-1"><Users size={12} className="text-orange-500"/> {carInfo[trip.vehicle]?.seater} Seater</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
               <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Time</p>
                  <p className="text-[13px] font-bold">{trip.time} Hr</p>
               </div>
               <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Run</p>
                  <p className="text-[13px] font-bold">{trip.runningKm} Km</p>
               </div>
               
               <div className="bg-orange-50 p-2 rounded-xl border border-orange-200">
                  <p className="text-[8px] font-black text-orange-500 uppercase mb-0.5 underline">Extra</p>
                  <p className="text-[9px] font-black text-orange-700 font-mono">₹{trip.extraHr}/H ₹{trip.extraKm}/K</p>
               </div>

               <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-100 flex flex-col justify-center">
                  <p className="text-[8px] font-black uppercase opacity-80 mb-0.5">Fare</p>
                  <p className="text-[14px] font-black tracking-tighter">₹{trip.amount}</p>
               </div>
            </div>

            <div className="mt-5 space-y-2 border-t pt-4 border-slate-50">
               <div className="flex gap-2 text-xs font-bold text-slate-600"><MapPin size={14} className="text-orange-500 shrink-0"/> {trip.startPoint}</div>
               <div className="flex gap-2 text-xs font-bold text-slate-600"><Calendar size={14} className="text-orange-500 shrink-0"/> {trip.date ? new Date(trip.date).toLocaleDateString('en-GB') : "Today"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 py-3 px-6 shadow-[0_-5px_30px_rgba(0,0,0,0.4)] z-[100] border-t border-slate-800">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Bill</p>
            <div className="flex items-center text-white text-3xl font-black tracking-tighter">
              <IndianRupee size={22} className="text-orange-500" strokeWidth={3}/> {grandTotal}
            </div>
          </div>
          <button 
            disabled={loading}
            onClick={handleFinalBooking}
            className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-black shadow-lg active:scale-95 transition-all text-lg flex items-center gap-2 disabled:bg-slate-600"
          >
             {loading ? <Loader2 className="animate-spin" size={20} /> : "BOOK NOW"} 
             {!loading && <Send size={18} className="animate-pulse" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalBookingConfirm;