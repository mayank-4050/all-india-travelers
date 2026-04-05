import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, MapPin, Calendar, Hash, Car, Navigation, IndianRupee, Send, ChevronDown, Users } from 'lucide-react';

// Photos import
import crysta from "/Photos/crysta.jpg";
import dzire from "/Photos/dzire.jpg";
import ertiga from "/Photos/ertiga.webp";
import zest from "/Photos/zest.jpg";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";

const carOptions = [
  { name: "Dzire Car", seater: "5", img: dzire },
  { name: "Zest", seater: "5", img: zest },
  { name: "Ertiga", seater: "7", img: ertiga },
  { name: "Innova", seater: "7/8", img: crysta },
  { name: "Inova Crista", seater: "7", img: crysta },
  { name: "Tavera 10", seater: "10", img: zest },
  { name: "Teveller 12", seater: "12", img: ertiga }
];

const pricingData = {
  "Dzire Car": { extraHr: 200, extraKm: 11, rates: { "4-40":900, "4-60":1100, "6-60": 1600, "6-80": 1800, "8-80": 2000, "8-100": 2200, "10-80": 2200, "10-100": 2300, "12-80": 2300, "12-100": 2500 } },
  "Zest": { extraHr: 200, extraKm: 11, rates: {"4-40":900, "4-60":1100, "6-80": 1700, "6-100": 1900, "8-80": 2000, "8-100": 2200, "10-80": 2200, "10-100": 2300, "12-80": 2300, "12-100": 2500 } },
  "Ertiga": { extraHr: 200, extraKm: 14, rates: {"4-40":1500, "4-60":1700, "6-80": 2200, "6-100": 2200, "8-80": 2400, "8-100": 2600, "10-80": 2600, "10-100": 2800, "12-80": 2900, "12-100": 3300 } },
  "Innova": { extraHr: 200, extraKm: 15, rates: {"4-40":1600, "4-60":1800, "8-80": 2500, "8-100": 2800, "10-80": 2800, "10-100": 3000, "12-80": 3200, "12-100": 3500 } },
  "Inova Crista": { extraHr: 200, extraKm: 17, rates: {"4-40":2000, "4-60":2200, "8-80": 2800, "8-100": 2900, "10-80": 3000, "10-100": 3200, "12-80": 3500, "12-100": 3800 } },
  "Tavera 10": { extraHr: 200, extraKm: 14, rates: {"4-40":1800, "4-60":2000, "8-80": 2300, "8-100": 2500, "10-80": 2500, "10-100": 2800, "12-80": 2800, "12-100": 3000 } },
  "Teveller 12": { extraHr: 500, extraKm: 25, rates: { "12-150": 6500 } }
};

const LocalBookingForm = () => {
  const [trips, setTrips] = useState([
    { id: Date.now(), startPoint: '', suggestions: [], date: '', time: '', runningKm: '', vehicle: '', isOpen: false, amount: 0, extraHr: 0, extraKm: 0 }
  ]);
  const navigate = useNavigate();

  // Suggestion fetching logic
  const handleLocationChange = async (id, value) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, startPoint: value } : t));

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
        );
        const data = await response.json();
        setTrips(prev => prev.map(t => t.id === id ? { ...t, suggestions: data.features || [] } : t));
      } catch (error) {
        console.error("Geoapify Error:", error);
      }
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
    if (!isValid) { alert("Please fill all fields!"); return; }
    navigate("/localbookin-confirm", { state: { bookingDetails: trips } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
      <div className="bg-white border-b sticky top-0 z-50 p-4 shadow-sm">
        <h1 className="text-xl font-black tracking-tighter">ALL INDIA <span className="text-orange-500">TRAVELS</span></h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {trips.map((trip, index) => (
          <div key={trip.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 relative overflow-visible">
            
            <div className="flex justify-between mb-4">
              <span className="text-[10px] font-black uppercase text-slate-400">Trip #{index + 1}</span>
              {trips.length > 1 && (
                <button onClick={() => setTrips(trips.filter(t => t.id !== trip.id))}>
                  <Trash2 size={16} className="text-red-400"/>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Pickup with Suggestions */}
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Pickup Point</label>
                <input 
                  type="text" 
                  value={trip.startPoint} 
                  onChange={(e) => handleLocationChange(trip.id, e.target.value)} 
                  className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 font-bold text-sm" 
                  placeholder="Enter location" 
                />
                {trip.suggestions.length > 0 && (
                  <ul className="absolute z-[60] bg-white border border-slate-200 w-full shadow-2xl rounded-xl mt-1 overflow-hidden">
                    {trip.suggestions.map((p, i) => (
                      <li 
                        key={i} 
                        className="p-3 text-sm border-b last:border-0 hover:bg-orange-50 cursor-pointer"
                        onClick={() => {
                          setTrips(prev => prev.map(t => t.id === trip.id ? { ...t, startPoint: p.properties.formatted, suggestions: [] } : t));
                        }}
                      >
                        {p.properties.formatted}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Vehicle Custom Dropdown */}
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Vehicle</label>
                <div 
                  onClick={() => updateTripField(trip.id, 'isOpen', !trip.isOpen)} 
                  className="w-full border-2 border-slate-100 p-3 rounded-xl flex justify-between items-center cursor-pointer bg-white"
                >
                  <span className={trip.vehicle ? "font-bold text-sm" : "text-slate-400 text-sm"}>
                    {trip.vehicle || "Select Car"}
                  </span>
                  <ChevronDown size={16} />
                </div>
                {trip.isOpen && (
                  <ul className="absolute z-50 bg-white border border-slate-200 w-full shadow-2xl rounded-2xl mt-1 max-h-60 overflow-auto">
                    {carOptions.map((car, i) => (
                      <li 
                        key={i} 
                        className="p-3 flex items-center gap-3 border-b last:border-0 hover:bg-orange-50 cursor-pointer" 
                        onClick={() => { updateTripField(trip.id, 'vehicle', car.name); updateTripField(trip.id, 'isOpen', false); }}
                      >
                        <img src={car.img} className="w-12 h-10 object-cover rounded-md" alt=""/>
                        <div>
                          <p className="font-bold text-sm">{car.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                            <Users size={10}/> {car.seater} Seater
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Numeric Inputs for Time & KM */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Time (Hrs)</label>
                  <select className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold text-sm outline-none focus:border-orange-500" onChange={(e) => updateTripField(trip.id, 'time', e.target.value)}>
                    <option value="">Select</option>
                    {[4, 6, 8, 10, 12].map(h => <option key={h} value={h}>{h} Hr</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Run (Km)</label>
                  <select className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold text-sm outline-none focus:border-orange-500" onChange={(e) => updateTripField(trip.id, 'runningKm', e.target.value)}>
                    <option value="">Select</option>
                    {[40,60, 80, 100, 120, 150].map(k => <option key={k} value={k}>{k} Km</option>)}
                  </select>
                </div>
              </div>

              {/* Date & Amount */}
              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold text-sm outline-none focus:border-orange-500" 
                    value={trip.date} 
                    onChange={(e) => updateTripField(trip.id, 'date', e.target.value)} 
                  />
                </div>
                <div className="bg-orange-500 p-3 rounded-xl text-white text-center shadow-lg">
                  <p className="text-[8px] font-black uppercase opacity-80">Estimated Fare</p>
                  <p className="text-xl font-black italic tracking-tighter">₹{trip.amount}</p>
                </div>
              </div>

            </div>
          </div>
        ))}

        <div className="flex flex-col gap-4 py-8">
          <button 
            onClick={() => setTrips([...trips, { id: Date.now(), startPoint: '', suggestions: [], date: '', time: '', runningKm: '', vehicle: '', isOpen: false, amount: 0, extraHr: 0, extraKm: 0 }])} 
            className="p-4 border-2 border-dashed border-slate-300 rounded-2xl font-bold text-slate-500 bg-white active:scale-95 transition-all"
          >
            + Add Extra Trip
          </button>
          <button 
            onClick={handleConfirm} 
            className="p-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all"
          >
            CONFIRM BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalBookingForm;