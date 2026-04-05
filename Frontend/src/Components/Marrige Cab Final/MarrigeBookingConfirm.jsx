import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, IndianRupee, Users, Send, Loader2, Heart, Sparkles, Clock, Navigation } from 'lucide-react';
import axios from 'axios';

import crysta from "/Photos/crysta.jpg";
import dzire from "/Photos/dzire.jpg";
import ertiga from "/Photos/ertiga.webp";
import innova from "/Photos/innova.png";
import tavera from "/Photos/tavera.jpg";
import zest from "/Photos/zest.jpg";
import traveller from "/Photos/traveller2.jpg";

const carInfo = {
  "Dzire Car": { img: dzire, seater: "5" },
  "Zest": { img: zest, seater: "5" },
  "Ertiga": { img: ertiga, seater: "7" },
  "Innova": { img: innova, seater: "7/8" },
  "Inova Crista": { img: crysta, seater: "7" },
  "Tavera 10": { img: tavera, seater: "10" },
  "Teveller 12": { img: traveller, seater: "12" }
};

const LocalBookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { bookingDetails } = location.state || { bookingDetails: [] };
  const grandTotal = bookingDetails.reduce((sum, trip) => sum + Number(trip.amount), 0);

  const handleFinalBooking = async () => {
    if (bookingDetails.length === 0) return;
    setLoading(true);
    try {
      // Backend API call
      const response = await axios.post("http://localhost:5000/api/localbookings", {
        bookingDetails: bookingDetails
      });

      if (response.data.success) {
        // Message Formatting
        let message = `*Wedding Cab Booking Request*%0A%0A`;
        bookingDetails.forEach((trip, index) => {
          message += `*Trip ${index + 1}*%0A`;
          message += `🚗 Car: ${trip.vehicle}%0A`;
          message += `📍 Venue: ${trip.startPoint}%0A`;
          message += `📅 Date: ${trip.date}%0A`;
          message += `⏰ Plan: ${trip.time}Hr / ${trip.runningKm}Km%0A`;
          message += `💰 Fare: ₹${trip.amount}%0A`;
          message += `--------------------------%0A`;
        });
        message += `*Grand Total: ₹${grandTotal}*`;

        const whatsappNumber = "918982844050"; 

        // Ye wala link mobile par direct WhatsApp App kholta hai
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
        
        window.location.href = whatsappUrl; // window.open ki jagah location use karein (ziada smooth hai mobile ke liye)
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (bookingDetails.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fff9fa] text-center">
        <Heart className="text-rose-200 w-16 h-16 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 font-serif">No Booking Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-rose-500 font-bold underline">Go Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] pb-36 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@700;900&display=swap');
        .font-wedding { font-family: 'Dancing Script', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .gold-shimmer {
          background: linear-gradient(135deg, #d4af37 0%, #f1e5ac 50%, #d4af37 100%);
        }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 border-b border-rose-100 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 bg-rose-50 text-rose-500 rounded-full active:scale-90 transition-transform">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center">
            <h1 className="text-xl font-wedding text-rose-600">Booking Summary</h1>
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Review Your Royal Fleet</p>
        </div>
        <div className="w-9 h-9 bg-rose-50 rounded-full flex items-center justify-center">
            <Sparkles size={18} className="text-rose-400" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 space-y-6">
        <div className="flex items-center gap-2 px-2">
            <div className="h-[1px] flex-1 bg-rose-100"></div>
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Reserved Trips</p>
            <div className="h-[1px] flex-1 bg-rose-100"></div>
        </div>

        {bookingDetails.map((trip, index) => (
          <div key={index} className="relative group">
            {/* The Trip Card */}
            <div className="bg-white rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-100/20 overflow-hidden">
              <div className="p-5">
                <div className="flex gap-4 items-center mb-6">
                  <div className="relative shrink-0">
                    <img src={carInfo[trip.vehicle]?.img || dzire} className="w-24 h-20 object-cover rounded-2xl border-2 border-rose-50 shadow-sm" alt=""/>
                    <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-lg shadow-md border border-rose-50">
                       <p className="text-[10px] font-black text-rose-500 flex items-center gap-1">
                          <Users size={12}/> {carInfo[trip.vehicle]?.seater}
                       </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-black text-slate-800 leading-tight">{trip.vehicle}</h3>
                    <p className="text-[10px] font-bold text-rose-300 uppercase tracking-widest mt-1">Wedding Special</p>
                  </div>
                </div>

                {/* Plan Stats */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <Clock size={12} className="mx-auto mb-1 text-rose-300" />
                    <p className="text-[11px] font-black text-slate-800">{trip.time} Hrs</p>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <Navigation size={12} className="mx-auto mb-1 text-rose-300" />
                    <p className="text-[11px] font-black text-slate-800">{trip.runningKm} Kms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-rose-400 uppercase mb-0.5">Fare</p>
                    <p className="text-[12px] font-black text-slate-800">₹{trip.amount}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-3 px-1">
                  <div className="flex gap-3 items-start">
                    <MapPin size={14} className="text-rose-500 mt-0.5 shrink-0"/>
                    <p className="text-xs font-bold text-slate-600 line-clamp-2">{trip.startPoint}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Calendar size={14} className="text-rose-500 shrink-0"/>
                    <p className="text-xs font-bold text-slate-600">
                        {trip.date ? new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Schedule Pending"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Extra Policy Bar */}
              <div className="bg-slate-900 px-5 py-2.5 flex justify-between items-center">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Extra Policy</p>
                 <p className="text-[10px] font-mono font-bold text-rose-400">₹{trip.extraHr}/Hr • ₹{trip.extraKm}/Km</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 pt-5 pb-3 px-6 shadow-[0_-10px_40px_rgba(255,182,193,0.2)] z-[100] rounded-t-[2.5rem] border-t border-slate-800">
        <div className="max-w-md mx-auto">
          <div className="flex items-end justify-between mb-2 px-1">
            <div>
              <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Estimated Total</p>
              <div className="flex items-center text-white text-xl font-black italic tracking-tighter">
                <IndianRupee size={22} className="text-rose-500 mr-0.5" strokeWidth={3}/> 
                {grandTotal.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="text-right">
                <p className="text-[9px] text-slate-500 font-bold leading-tight uppercase">Incl. Driver &<br/>Royal Service</p>
            </div>
          </div>
          
          <button 
            disabled={loading}
            onClick={handleFinalBooking}
            className="w-full bg-rose-600 text-white py-2 rounded-2xl font-black shadow-lg shadow-rose-900/20 active:scale-95 transition-all text-lg flex items-center justify-center gap-3 disabled:bg-slate-700"
          >
             {loading ? <Loader2 className="animate-spin" size={24} /> : (
               <>
                 BOOK ROYAL FLEET 
                 <Send size={18} className="rotate-[350deg]" />
               </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalBookingConfirm;