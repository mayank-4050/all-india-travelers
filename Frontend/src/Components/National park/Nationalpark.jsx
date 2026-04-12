import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import {
  MapPin, PlusCircle, X, CalendarDays,
  Users, Send, Search, Info, Route, Car,
  ShieldCheck, Timer, ChevronDown, Compass, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialSidebar from '../SocialSidebar'; 

// Aapki imported photos
import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";
import innova from "/Photos/innova.png";
import travellers from "/Photos/traveller.png";

import bandhavgarh from "/Photos/Bandhavgarh National Park (Madhya Pradesh).png"
import dudhwa from "/Photos/Dudhwa National Park (Uttar Pradesh).png"
import gir from "/Photos/Gir National Park (Gujarat).png"
import keibul from "/Photos/Keibul Lamjao National Park (Manipur).png"
import panna from "/Photos/panna.png"
 
const GEOAPIFY_KEY = "#";

const RoundTripPlanner = () => {
  const vehicles = [
    { id: 'sedan', name: 'Sedan (Swift Dzire)', rate: 10, image: Dzire, capacity: '4+1' },
    { id: 'zest', name: 'Compact Sedan (Zest)', rate: 10, image: Zest, capacity: '4+1' },
    { id: 'suv', name: 'SUV (Ertiga)', rate: 14, image: Ertiga, capacity: '6+1' },
    { id: 'tavera', name: 'Classic SUV (Tavera)', rate: 13, image: Tavera, capacity: '8+1' },
    { id: 'premium', name: 'Premium (Innova Crysta)', rate: 17, image: Crysta, capacity: '7+1' },
    { id: 'innova', name: 'Premium (Innova)', rate: 15, image: innova, capacity: '7+1' },
    { id: 'traveller', name: 'travellers', rate: 25, image: travellers, capacity: '12+1' },
  ];

  const tirthPlaces = [
    { name: "Bandhavgarh National Park", image: bandhavgarh, state: "Madhya Pradesh" },
    { name: "Dudhwa National Park", image: dudhwa, state: "Uttar Pradesh" },
    { name: "Gir National Park", image: gir, state: "Gujarat" },
    { name: "Keibul Lamjao National Park", image: keibul, state: "Manipur" },
    { name: "Panna National Park", image: panna, state: "Madhya Pradesh" },
  ];

  // Jabalpur is fixed here
  const [startLocation] = useState({ query: "Jabalpur, MP, India", formatted: "Jabalpur, MP, India", lat: 23.167, lon: 79.932 });
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [destinations, setDestinations] = useState([{ id: Date.now(), query: "", formatted: "", date: "", time: "", period: "AM", lat: null, lon: null, suggestions: [] }]);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds) return "0h 0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const calculateDays = () => {
    if (!startDate || !destinations[destinations.length - 1]?.date) return 1;
    const start = new Date(startDate);
    const end = new Date(destinations[destinations.length - 1].date);
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays || 1;
  };

  const totalDays = calculateDays();
  const minKmPerDay = 250;
  const minDistanceLimit = totalDays * minKmPerDay;
  const chargeableDistance = Math.max(totalDistance, minDistanceLimit);
  const totalFare = chargeableDistance * selectedVehicle.rate;
  const extraKm = totalDistance > minDistanceLimit ? (totalDistance - minDistanceLimit).toFixed(1) : 0;
  const isMinRunningApplied = totalDistance < minDistanceLimit && totalDistance > 0;

  const fetchSuggestions = async (value, id) => {
    if (value.length > 2) {
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`);
      const data = await res.json();
      const results = data.features || [];
      setDestinations(prev => prev.map(d => d.id === id ? { ...d, suggestions: results } : d));
    }
  };

  const handleSelect = (place, id) => {
    const { formatted, lat, lon } = place.properties;
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, query: formatted, formatted, lat, lon, suggestions: [] } : d));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const calculateRoute = async () => {
      const validStops = destinations.filter(d => d.lat && d.lon);
      if (startLocation.lat && validStops.length > 0) {
        setIsCalculating(true);
        try {
          const waypoints = [`${startLocation.lat},${startLocation.lon}`, ...validStops.map(s => `${s.lat},${s.lon}`)].join('|');
          const res = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_KEY}`);
          const data = await res.json();
          if (data.features && data.features[0]) {
            const props = data.features[0].properties;
            setTotalDistance((props.distance / 1000).toFixed(1));
            setTotalTime(props.time);
          }
        } catch (e) { console.error(e); } finally { setIsCalculating(false); }
      }
    };
    calculateRoute();
  }, [destinations, startLocation]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <SocialSidebar />
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-12 px-6 text-center text-white shadow-lg">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter">All India Travels & Online Services</h1>
          <p className="mt-3 text-md md:text-lg font-medium text-orange-50 italic">
            "National Park"
          </p>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-10">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-700 italic">
            <Star className="text-orange-500 fill-orange-500" size={18} /> Some Tranding Parks
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
            {tirthPlaces.map((place, idx) => (
              <div key={idx} className="min-w-[240px] bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 snap-center">
                <img src={place.image} className="h-32 w-full object-cover" alt="" />
                <div className="p-3">
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-tighter">{place.state}</p>
                  <h4 className="font-black text-slate-800 tracking-tight">{place.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-orange-600"><MapPin /> Multi-City Route</h3>
              <div className="space-y-6 relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>

                <div className="flex items-start gap-4 relative z-30 group">
                  <div className="bg-orange-600 p-3 rounded-full shadow-lg mt-1 shrink-0"><MapPin className="h-6 w-6 text-white" /></div>
                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 bg-orange-50 p-6 rounded-2xl border border-orange-100 relative">
                    <div className="col-span-2 relative">
                      <label className="block text-[10px] font-bold text-orange-600 uppercase mb-1 tracking-widest">Origin & Return (Fixed)</label>
                      {/* Fixed Jabalpur Input */}
                      <input 
                        type="text" 
                        value="Jabalpur, MP, India" 
                        readOnly 
                        className="w-full text-lg font-bold bg-transparent outline-none text-gray-900 cursor-default" 
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm" />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Time</label>
                      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm" />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {destinations.map((stop, index) => (
                    <motion.div key={stop.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 relative z-20 group">
                      <div className="bg-white p-3 rounded-full border-2 border-gray-300 shadow mt-1 shrink-0"><MapPin className="h-6 w-6 text-gray-400" /></div>
                      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200 relative hover:border-orange-300 transition-all shadow-sm">
                        <div className="col-span-2 relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stop {index + 1}</label>
                          <input type="text" value={stop.query} onChange={(e) => { setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, query: e.target.value } : d)); fetchSuggestions(e.target.value, stop.id); }} className="w-full text-lg font-bold bg-transparent outline-none" placeholder="Enter City" />
                          {stop.suggestions?.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto">
                              {stop.suggestions.map((s, i) => (<li key={i} onClick={() => handleSelect(s, stop.id)} className="p-3 hover:bg-orange-50 cursor-pointer text-sm border-b font-medium">{s.properties.formatted}</li>))}
                            </ul>
                          )}
                        </div>
                        <div className="col-span-1"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</label><input type="date" value={stop.date} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, date: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm" /></div>
                        <div className="col-span-1"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</label><input type="time" value={stop.time} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, time: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm" /></div>
                        <button onClick={() => setDestinations(destinations.filter(d => d.id !== stop.id))} className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full text-gray-400 hover:text-red-500 shadow-md opacity-0 group-hover:opacity-100"><X className="h-4 w-4" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button onClick={() => setDestinations([...destinations, { id: Date.now(), query: "" }])} className="flex items-center gap-2 text-orange-700 font-bold bg-orange-100 px-6 py-3 rounded-full hover:bg-orange-200 transition-all ml-2 font-sans uppercase text-[10px] tracking-widest"><PlusCircle size={16} /> Add Stop</button>
              </div>
            </section>

            <section className="bg-white p-4 md:p-8 rounded-[2rem] shadow-lg border border-gray-100" ref={dropdownRef}>
              <h3 className="text-[10px] font-black mb-3 flex items-center gap-2 uppercase tracking-widest text-gray-400 italic"><Car className="text-orange-600" size={16} /> Choose Fleet</h3>
              <div className="relative">
                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full border-2 p-3 rounded-2xl flex justify-between items-center cursor-pointer transition-all ${isDropdownOpen ? 'border-orange-500 bg-white' : 'border-slate-100 bg-slate-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <img src={selectedVehicle.image} className="w-14 h-9 object-cover rounded-lg" alt="" />
                    <div>
                      <p className="font-black text-[12px] uppercase text-slate-800">{selectedVehicle.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><Users size={10} /> {selectedVehicle.capacity}</p>
                    </div>
                  </div>
                  <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} size={18} />
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-[110] bg-white border border-slate-100 w-full shadow-2xl rounded-2xl mt-2 max-h-64 overflow-auto overflow-x-hidden">
                      {vehicles.map((v) => (
                        <li key={v.id} className={`p-3 flex items-center justify-between border-b last:border-0 hover:bg-orange-50 cursor-pointer ${selectedVehicle.id === v.id ? 'bg-orange-50/80' : ''}`} onClick={() => { setSelectedVehicle(v); setIsDropdownOpen(false); }}>
                          <div className="flex items-center gap-3">
                            <img src={v.image} className="w-14 h-9 object-cover rounded-lg" alt="" />
                            <div><p className="font-black text-[11px] uppercase">{v.name}</p><p className="text-[9px] font-bold flex items-center gap-1"><Users size={10} /> {v.capacity}</p></div>
                          </div>
                          <div className="text-right"><p className="text-orange-600 font-black text-[11px] italic">₹{v.rate}/KM</p></div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-950 p-8 rounded-[2.5rem] text-white shadow-2xl sticky top-28 border border-gray-800 overflow-hidden">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-orange-500 uppercase tracking-wider italic"><Search size={20} /> Trip Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="p-5 bg-gray-900/50 rounded-2xl border border-gray-800 space-y-4 font-sans text-[10px] font-black uppercase tracking-widest">
                  <div className="flex justify-between items-center"><span className="text-gray-500 flex items-center gap-2"><CalendarDays size={14} className="text-orange-500" /> Total Duration</span><span>{totalDays} Days</span></div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-4"><span className="text-gray-500 flex items-center gap-2"><Timer size={14} className="text-blue-500" /> Est. Drive Time</span><span className="text-blue-400">{formatTime(totalTime)}</span></div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-4"><span className="text-gray-500 flex items-center gap-2"><Route size={14} className="text-orange-500" /> Route Distance</span><span>{totalDistance} KM</span></div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-4 text-orange-500"><span className="italic font-bold">Required Min running</span><span className="underline">{minDistanceLimit} KM</span></div>
                  {extraKm > 0 && <div className="flex justify-between items-center border-t border-gray-800 pt-4 text-green-500 animate-pulse"><span>Extra Distance</span><span>+ {extraKm} KM</span></div>}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 rounded-[2rem] shadow-2xl relative group mb-8">
                <p className="text-[10px] text-orange-200 font-black uppercase mb-1 tracking-widest italic">Final Estimated Fare</p>
                <div className="flex items-baseline gap-1"><span className="text-5xl font-black italic tracking-tighter">₹{totalFare.toLocaleString()}</span><span className="text-[10px] font-bold text-orange-100 uppercase italic">/ {chargeableDistance} KM</span></div>
                {isMinRunningApplied && <div className="mt-4 flex items-start gap-2 bg-black/20 p-3 rounded-xl border border-white/5"><Info size={16} className="shrink-0" /><p className="text-[9px] italic leading-tight">Note: Min. 250km/day running applied.</p></div>}
              </div>

              <NavLink to='/roundtripbookingform' state={{ bookingData: { vehicle: selectedVehicle, distance: totalDistance, fare: totalFare, duration: totalDays, origin: startLocation.formatted, destinations: destinations } }}>
                <button className="w-full bg-white text-gray-950 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 hover:text-white transition-all shadow-xl flex justify-center items-center gap-3 active:scale-95 shadow-orange-900/50 uppercase tracking-widest">
                  CONFIRM & BOOK <Send size={20} />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoundTripPlanner;