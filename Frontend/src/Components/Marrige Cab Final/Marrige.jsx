import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, MapPin, Calendar, Car, Navigation, IndianRupee, ChevronDown, Users, Heart, Sparkles, Clock } from 'lucide-react';

// Photos import
import crysta from "/Photos/crysta.jpg";
import dzire from "/Photos/dzire.jpg";
import ertiga from "/Photos/ertiga.webp";
import innova from "/Photos/innova.png";
import tavera from "/Photos/tavera.jpg";
import zest from "/Photos/zest.jpg";
import traveller from "/Photos/traveller2.jpg";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";

const carOptions = [
  { name: "Dzire Car", seater: "5", img: dzire },
  { name: "Zest", seater: "5", img: zest },
  { name: "Ertiga", seater: "7", img: ertiga },
  { name: "Innova", seater: "7/8", img: innova },
  { name: "Inova Crista", seater: "7", img: crysta },
  { name: "Tavera 10", seater: "10", img: tavera },
  { name: "Teveller 12", seater: "12", img: traveller }
];

const pricingData = {
  "Dzire Car": { extraHr: 200, extraKm: 11, rates: { "12-100": 2500, "24-250": 5000 } },
  "Zest": { extraHr: 200, extraKm: 11, rates: { "12-100": 2500, "24-250": 5000 } },
  "Ertiga": { extraHr: 200, extraKm: 14, rates: { "12-100": 3000, "24-250": 6000 } },
  "Innova": { extraHr: 200, extraKm: 15, rates: { "12-100": 3250, "24-250": 6500 } },
  "Inova Crista": { extraHr: 200, extraKm: 17, rates: { "12-100": 3500, "24-250": 7000 } },
  "Tavera 10": { extraHr: 200, extraKm: 14, rates: { "12-100": 3000, "24-250": 6000 } },
  "Teveller 12": { extraHr: 500, extraKm: 25, rates: { "12-150": 6500 } }
};

const LocalBookingForm = () => {
  const [trips, setTrips] = useState([
    { id: Date.now(), startPoint: '', suggestions: [], date: '', time: '', runningKm: '', vehicle: '', isOpen: false, amount: 0, extraHr: 0, extraKm: 0 }
  ]);
  const navigate = useNavigate();

  const handleLocationChange = async (id, value) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, startPoint: value } : t));
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
        );
        const data = await response.json();
        setTrips(prev => prev.map(t => t.id === id ? { ...t, suggestions: data.features || [] } : t));
      } catch (error) { console.error("Geoapify Error:", error); }
    } else {
      setTrips(prev => prev.map(t => t.id === id ? { ...t, suggestions: [] } : t));
    }
  };

  const updateTripField = (id, field, value) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === id) {
        const updatedTrip = { ...trip, [field]: value };
        const v = field === 'vehicle' ? value : trip.vehicle;
        const t = field === 'time' ? value : trip.time;
        const k = field === 'runningKm' ? value : trip.runningKm;

        if (pricingData[v]) {
          updatedTrip.amount = pricingData[v].rates[`${t}-${k}`] || 0;
          updatedTrip.extraHr = pricingData[v].extraHr;
          updatedTrip.extraKm = pricingData[v].extraKm;
        }
        return updatedTrip;
      }
      return trip;
    }));
  };

  const handleConfirm = () => {
    const isValid = trips.every(t => t.vehicle && t.time && t.runningKm && t.startPoint && t.date);
    if (!isValid) { alert("Please complete your royal booking! 💍"); return; }
    navigate("/bookingformarrige-confirm", { state: { bookingDetails: trips } });
  };

  return (
    <div className="min-h-screen bg-[#fff9fa] pb-24 font-sans relative overflow-x-hidden">
      {/* Wedding Decorations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@700;900&display=swap');
        .font-wedding { font-family: 'Dancing Script', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .gold-gradient { background: linear-gradient(135deg, #d4af37 0%, #f1e5ac 50%, #d4af37 100%); }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-rose-100 p-4 text-center shadow-sm">
        <div className="flex justify-center items-center gap-2">
          <Heart className="text-rose-400 animate-pulse fill-rose-400" size={20} />
          <h1 className="text-2xl font-wedding text-rose-600 tracking-wide">Wedding Royale Travels</h1>
          <Heart className="text-rose-400 animate-pulse fill-rose-400" size={20} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mt-1">Luxury Cabs for your Special Day</p>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-8 space-y-10 relative">
        {/* Floating Background Sparkle */}
        <Sparkles className="absolute top-0 -left-10 text-rose-200/50" size={100} />

        {trips.map((trip, index) => (
          <div key={trip.id} className="relative group">
            {/* Elegant Card Shadow/Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-100 via-rose-200 to-rose-100 rounded-[2rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative bg-white rounded-[2rem] p-6 border border-rose-50 shadow-xl overflow-visible">
              <div className="flex justify-between items-center mb-6 border-b border-rose-50 pb-3">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-white shadow-md">
                      <span className="font-bold text-sm">#{index + 1}</span>
                   </div>
                   <h2 className="font-serif text-lg text-slate-800 italic">Trip Details</h2>
                </div>
                {trips.length > 1 && (
                  <button onClick={() => setTrips(trips.filter(t => t.id !== trip.id))} className="p-2 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors">
                    <Trash2 size={18} className="text-rose-400"/>
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Pickup Venue */}
                <div className="relative group/input">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase mb-1.5 ml-1 tracking-wider">
                    <MapPin size={12} /> Wedding Venue / Pickup
                  </label>
                  <input 
                    type="text" 
                    value={trip.startPoint} 
                    onChange={(e) => handleLocationChange(trip.id, e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-rose-300 focus:bg-white font-bold text-sm transition-all shadow-inner" 
                    placeholder="Where shall the journey begin?" 
                  />
                  {trip.suggestions.length > 0 && (
                    <ul className="absolute z-[60] bg-white border border-rose-50 w-full shadow-2xl rounded-2xl mt-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                      {trip.suggestions.map((p, i) => (
                        <li 
                          key={i} 
                          className="p-4 text-sm border-b border-rose-50 last:border-0 hover:bg-rose-50 cursor-pointer transition-colors"
                          onClick={() => setTrips(prev => prev.map(t => t.id === trip.id ? { ...t, startPoint: p.properties.formatted, suggestions: [] } : t))}
                        >
                          {p.properties.formatted}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Chariot Selection */}
                <div className="relative">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase mb-1.5 ml-1 tracking-wider">
                    <Car size={12} /> Select Chariot (Vehicle)
                  </label>
                  <div 
                    onClick={() => updateTripField(trip.id, 'isOpen', !trip.isOpen)} 
                    className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white hover:border-rose-100 transition-all shadow-inner"
                  >
                    <span className={trip.vehicle ? "font-bold text-sm text-slate-800" : "text-slate-400 text-sm font-medium"}>
                      {trip.vehicle || "Choose your royal cab..."}
                    </span>
                    <ChevronDown size={18} className={`text-rose-300 transition-transform ${trip.isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {trip.isOpen && (
                    <ul className="absolute z-50 bg-white border border-rose-50 w-full shadow-2xl rounded-2xl mt-2 max-h-72 overflow-auto animate-in slide-in-from-top-2 duration-300">
                      {carOptions.map((car, i) => (
                        <li 
                          key={i} 
                          className="p-4 flex items-center gap-4 border-b border-rose-50 last:border-0 hover:bg-rose-50 cursor-pointer transition-all active:bg-rose-100" 
                          onClick={() => { updateTripField(trip.id, 'vehicle', car.name); updateTripField(trip.id, 'isOpen', false); }}
                        >
                          <div className="relative">
                            <img src={car.img} className="w-16 h-12 object-cover rounded-xl shadow-sm border border-rose-100" alt=""/>
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 text-sm">{car.name}</p>
                            <p className="text-[10px] font-bold text-rose-400 uppercase flex items-center gap-1 mt-0.5">
                              <Users size={12}/> {car.seater} Guest Capacity
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Ceremony Timing & Distance Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase mb-1.5 ml-1 tracking-wider">
                      <Clock size={12} /> Duration
                    </label>
                    <select 
                      className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl font-bold text-sm outline-none focus:border-rose-300 focus:bg-white transition-all shadow-inner appearance-none" 
                      onChange={(e) => updateTripField(trip.id, 'time', e.target.value)}
                      value={trip.time}
                    >
                      <option value="">Select Time</option>
                      <option value="12">Full Day (12 Hr)</option>
                      <option value="24">Event (24 Hr)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase mb-1.5 ml-1 tracking-wider">
                      <Navigation size={12} /> Distance
                    </label>
                    <select 
                      className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl font-bold text-sm outline-none focus:border-rose-300 focus:bg-white transition-all shadow-inner appearance-none" 
                      onChange={(e) => updateTripField(trip.id, 'runningKm', e.target.value)}
                      value={trip.runningKm}
                    >
                      <option value="">Select Km</option>
                      <option value="100">100 Km Limit</option>
                      <option value="150">150 Km Limit</option>
                      <option value="250">250 Km Limit</option>
                    </select>
                  </div>
                </div>

                {/* Big Day Date & Amount */}
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase mb-1.5 ml-1 tracking-wider">
                      <Calendar size={12} /> Wedding Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl font-bold text-sm outline-none focus:border-rose-300 focus:bg-white transition-all shadow-inner" 
                      value={trip.date} 
                      onChange={(e) => updateTripField(trip.id, 'date', e.target.value)} 
                    />
                  </div>
                  
                  {/* Fare Section */}
                  <div className="gold-gradient p-0.5 rounded-[1.2rem] shadow-lg shadow-rose-200">
                    <div className="bg-white rounded-[1.1rem] p-3 text-center">
                       <p className="text-[8px] font-black uppercase text-rose-400 tracking-tighter">Est. Fare</p>
                       <div className="flex items-center justify-center text-rose-600 font-black italic">
                          <IndianRupee size={16} />
                          <span className="text-xl tracking-tighter">{trip.amount}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-5 py-10">
          <button 
            onClick={() => setTrips([...trips, { id: Date.now(), startPoint: '', suggestions: [], date: '', time: '', runningKm: '', vehicle: '', isOpen: false, amount: 0, extraHr: 0, extraKm: 0 }])} 
            className="group flex items-center justify-center gap-2 p-5 border-2 border-dashed border-rose-200 rounded-[2rem] font-bold text-rose-400 bg-white/50 hover:bg-white hover:border-rose-400 transition-all duration-300 active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add Extra Wedding Cab
          </button>
          
          <button 
            onClick={handleConfirm} 
            className="relative p-5 gold-gradient text-white rounded-[2rem] font-black text-lg shadow-xl shadow-rose-200 active:scale-95 transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
               CONFIRM ROYAL BOOKING <Sparkles size={20} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalBookingForm;