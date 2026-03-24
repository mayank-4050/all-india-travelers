import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin, PlusCircle, X, ArrowRightLeft, CalendarDays,
  Users, Send, Search, Info, Route, Car, ShieldCheck, Clock, Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Aapki imported photos
import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";

const RoundTripPlanner = () => {
  // 1. Vehicle Data with Your Imported Images
  const vehicles = [
    { id: 'sedan', name: 'Sedan (Swift Dzire)', rate: 12, image: Dzire, capacity: '4+1' },
    { id: 'zest', name: 'Compact Sedan (Zest)', rate: 11, image: Zest, capacity: '4+1' },
    { id: 'suv', name: 'SUV (Ertiga)', rate: 15, image: Ertiga, capacity: '6+1' },
    { id: 'tavera', name: 'Classic SUV (Tavera)', rate: 14, image: Tavera, capacity: '8+1' },
    { id: 'premium', name: 'Premium (Innova Crysta)', rate: 20, image: Crysta, capacity: '7+1' },
  ];

  // 2. States
  const [startLocation, setStartLocation] = useState({ query: "Jabalpur, MP, India", formatted: "Jabalpur, MP, India", lat: 23.167, lon: 79.932 });
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [startSuggestions, setStartSuggestions] = useState([]);

  const [destinations, setDestinations] = useState([{ id: Date.now(), query: "", formatted: "", date: "", time: "", period: "AM", lat: null, lon: null, suggestions: [] }]);

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // 3. Helper: Format Time
  const formatTime = (seconds) => {
    if (!seconds) return "0h 0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  // 4. Logic: Calculate Total Trip Days
  const calculateDays = () => {
    if (!startDate || !destinations[destinations.length - 1]?.date) return 1;
    const start = new Date(startDate);
    const end = new Date(destinations[destinations.length - 1].date);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays || 1;
  };

  const totalDays = calculateDays();
  const minKmPerDay = 250;
  const minDistanceLimit = totalDays * minKmPerDay;
  const chargeableDistance = Math.max(totalDistance, minDistanceLimit);
  const totalFare = chargeableDistance * selectedVehicle.rate;
  const extraKm = totalDistance > minDistanceLimit ? (totalDistance - minDistanceLimit).toFixed(1) : 0;
  const isMinRunningApplied = totalDistance < minDistanceLimit && totalDistance > 0;

  // 6. API: Suggestions
  const fetchSuggestions = async (value, type, id = null) => {
    if (value.length > 2) {
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`);
      const data = await res.json();
      const results = data.features || [];
      if (type === 'start') setStartSuggestions(results);
      else setDestinations(prev => prev.map(d => d.id === id ? { ...d, suggestions: results } : d));
    }
  };

  const handleSelect = (place, type, id = null) => {
    const { formatted, lat, lon } = place.properties;
    if (type === 'start') { setStartLocation({ query: formatted, formatted, lat, lon }); setStartSuggestions([]); }
    else { setDestinations(prev => prev.map(d => d.id === id ? { ...d, query: formatted, formatted, lat, lon, suggestions: [] } : d)); }
  };

  // 7. API: Route & Time Calculation
  useEffect(() => {
    const calculateRoute = async () => {
      const validStops = destinations.filter(d => d.lat && d.lon);
      if (startLocation.lat && validStops.length > 0) {
        setIsCalculating(true);
        try {
          const waypoints = [`${startLocation.lat},${startLocation.lon}`, ...validStops.map(s => `${s.lat},${s.lon}`), `${startLocation.lat},${startLocation.lon}`].join('|');
          const res = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_KEY}`);
          const data = await res.json();
          if (data.features && data.features[0]) {
            const props = data.features[0].properties;
            setTotalDistance((props.distance / 1000).toFixed(1));
            setTotalTime(props.time);
          }
        } catch (error) { console.error(error); } finally { setIsCalculating(false); }
      }
    };
    calculateRoute();
  }, [destinations, startLocation]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-2.5 rounded-xl shadow-md"><ArrowRightLeft className="text-white h-6 w-6" /></div>
            <h1 className="text-2xl font-bold italic underline decoration-orange-500 font-sans">All India <span className="text-orange-600 font-black font-sans">Travels</span></h1>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-10">
            {/* --- SECTION 1: ROUTE BUILDER --- */}
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 font-sans"><MapPin className="text-orange-600" /> Multi-City Route</h3>
              <div className="space-y-6 relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>

                {/* START POINT */}
                <div className="flex items-start gap-4 relative z-10 group">
                  <div className="bg-orange-600 p-3 rounded-full shadow-lg mt-1 shrink-0"><MapPin className="h-6 w-6 text-white" /></div>
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 bg-orange-50 p-6 rounded-2xl border border-orange-100 relative">
                    <div className="md:col-span-2 relative">
                      <label className="block text-[10px] font-bold text-orange-600 uppercase mb-1 tracking-widest font-sans">Origin & Return</label>
                      <input type="text" value={startLocation.query} onChange={(e) => { setStartLocation({ ...startLocation, query: e.target.value }); fetchSuggestions(e.target.value, 'start'); }} className="w-full text-lg font-bold bg-transparent outline-none text-gray-900 font-sans" />
                      {startSuggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white border mt-2 rounded-xl shadow-2xl z-50 overflow-hidden font-sans">
                          {startSuggestions.map((s, i) => (<li key={i} onClick={() => handleSelect(s, 'start')} className="p-3 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-0 font-sans">{s.properties.formatted}</li>))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest font-sans">Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest font-sans">Time</label>
                      <div className="flex items-center gap-1 font-sans">
                        <input type="text" placeholder="09:00" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm" />
                        <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} className="bg-transparent font-bold text-[10px] text-orange-600 outline-none cursor-pointer">
                          <option>AM</option><option>PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC STOPS */}
                <AnimatePresence>
                  {destinations.map((stop, index) => (
                    <motion.div key={stop.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 relative z-10 group font-sans">
                      <div className="bg-white p-3 rounded-full border-2 border-gray-300 shadow mt-1 shrink-0"><MapPin className="h-6 w-6 text-gray-400" /></div>
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200 relative hover:border-orange-300 transition-all shadow-sm">
                        <div className="md:col-span-2 relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stop {index + 1}</label>
                          <input type="text" value={stop.query} onChange={(e) => { setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, query: e.target.value } : d)); fetchSuggestions(e.target.value, 'stop', stop.id); }} className="w-full text-lg font-bold bg-transparent outline-none font-sans" placeholder="Enter City" />
                          {stop.suggestions?.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-white border mt-2 rounded-xl shadow-2xl z-50 overflow-hidden font-sans">
                              {stop.suggestions.map((s, i) => (<li key={i} onClick={() => handleSelect(s, 'stop', stop.id)} className="p-3 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-0 font-sans">{s.properties.formatted}</li>))}
                            </ul>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</label>
                          <input type="date" value={stop.date} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, date: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</label>
                          <div className="flex items-center gap-1 font-sans">
                            <input type="text" placeholder="09:00" value={stop.time} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, time: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                            <select value={stop.period} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, period: e.target.value } : d))} className="bg-transparent font-bold text-[9px] outline-none cursor-pointer uppercase font-sans">
                              <option>AM</option><option>PM</option>
                            </select>
                          </div>
                        </div>
                        <button onClick={() => setDestinations(destinations.filter(d => d.id !== stop.id))} className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full text-gray-400 hover:text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-4 w-4" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button onClick={() => setDestinations([...destinations, { id: Date.now(), query: "", formatted: "", date: "", time: "", period: "AM", lat: null, lon: null, suggestions: [] }])} className="flex items-center gap-2 text-orange-700 font-bold bg-orange-100 px-6 py-3 rounded-full hover:bg-orange-200 transition-all ml-2 font-sans uppercase text-[10px] tracking-widest"><PlusCircle className="h-4 w-4" /> Add Stop</button>
              </div>
            </section>

            {/* --- SECTION 2: COMPACT HORIZONTAL VEHICLE SELECTION --- */}
            <section className="bg-white p-5 md:p-6 rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden font-sans">
              <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-gray-600">
                <Car className="text-orange-600" size={18} /> Select Fleet
              </h3>

              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth font-sans">
                {vehicles.map((v) => (
                  <motion.div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    whileTap={{ scale: 0.97 }}
                    className={`min-w-[220px] md:min-w-[240px] snap-center cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col font-sans
                      ${selectedVehicle.id === v.id
                        ? 'border-orange-600 bg-orange-50/30 shadow-md scale-[1.01]'
                        : 'border-gray-50 bg-white hover:border-orange-200 shadow-sm'
                      }`}
                  >
                    <div className="h-32 relative overflow-hidden group font-sans">
                      <img src={v.image} alt={v.name} className={`w-full h-full object-cover transition-transform duration-700 ${selectedVehicle.id === v.id ? 'scale-105' : 'scale-100'}`} />
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-orange-500 text-[9px] font-black uppercase tracking-widest border border-white/10 font-sans">
                        ₹{v.rate}/KM
                      </div>
                      {selectedVehicle.id === v.id && (
                        <div className="absolute top-2 right-2 bg-orange-600 text-white p-1 rounded-full shadow-md">
                          <ShieldCheck size={12} />
                        </div>
                      )}
                    </div>

                    <div className="p-3 text-center space-y-1 font-sans">
                      <h4 className={`font-black text-[11px] uppercase tracking-wider truncate px-1 font-sans ${selectedVehicle.id === v.id ? 'text-orange-700' : 'text-gray-700'}`}>
                        {v.name}
                      </h4>
                      <div className="flex justify-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-tight pb-1 font-sans">
                        <span className="flex items-center gap-1 font-sans"><Users size={12} className="text-orange-500" /> {v.capacity}</span>
                        <span className="flex items-center gap-1 font-sans"><ShieldCheck size={12} className="text-green-500" /> AC</span>
                      </div>

                      <div className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all font-sans
                        ${selectedVehicle.id === v.id ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                        {selectedVehicle.id === v.id ? 'Selected' : 'Select'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-1 font-bold uppercase tracking-tighter italic font-sans">
                ← Swipe to see more →
              </p>
            </section>
          </div>

          {/* --- SECTION 3: TRIP SUMMARY (Purana Style) --- */}
          <div className="space-y-8">
            <div className="bg-gray-950 p-8 rounded-[2.5rem] text-white shadow-2xl sticky top-28 border border-gray-800 overflow-hidden font-sans">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl font-sans"></div>

              <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-orange-500 uppercase tracking-wider italic font-sans"><Search className="w-5 h-5" /> Trip Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="p-5 bg-gray-900/50 rounded-2xl border border-gray-800 space-y-4 font-sans">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest font-sans">
                    <span className="text-gray-500 flex items-center gap-2 font-sans"><CalendarDays size={14} className="text-orange-500" /> Total Duration</span>
                    <span className="text-white font-sans">{totalDays} Days</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-t border-gray-800 pt-4 font-sans">
                    <span className="text-gray-500 flex items-center gap-2 font-sans"><Timer size={14} className="text-blue-500" /> Est. Drive Time</span>
                    <span className="text-blue-400 font-sans">{formatTime(totalTime)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-t border-gray-800 pt-4 font-sans">
                    <span className="text-gray-500 flex items-center gap-2 font-sans"><Route size={14} className="text-orange-500" /> Route Distance</span>
                    <span className="text-white font-sans">{totalDistance} KM</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-t border-gray-800 pt-4 text-orange-500 font-sans">
                    <span className="flex items-center gap-2 italic font-bold font-sans">Minimum Running</span>
                    <span className="font-black underline font-sans">{minDistanceLimit} KM</span>
                  </div>

                  {extraKm > 0 && (
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-t border-gray-800 pt-4 text-green-500 animate-pulse font-sans">
                      <span>Extra Distance</span>
                      <span>+ {extraKm} KM</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 rounded-[2rem] shadow-2xl relative group font-sans">
                <p className="text-[10px] text-orange-200 font-black uppercase mb-1 tracking-widest font-sans italic">Final Estimated Fare</p>
                <div className="flex items-baseline gap-1 font-sans">
                  <span className="text-5xl font-black text-white italic tracking-tighter font-sans">₹{totalFare.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-orange-100 uppercase italic font-sans">/ {chargeableDistance} KM</span>
                </div>

                {isMinRunningApplied && (
                  <div className="mt-4 flex items-start gap-2 bg-black/20 p-3 rounded-xl border border-white/5 font-sans">
                    <Info size={16} className="text-white shrink-0 font-sans" />
                    <p className="text-[9px] text-white italic leading-tight font-medium font-sans">
                      Note: Per day 250km minimum running is applied for this trip.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center px-2 font-sans">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 italic leading-relaxed font-sans">
                  {startLocation.formatted.split(',')[0]} ⇄ {destinations.filter(d => d.formatted).map(d => d.formatted.split(',')[0]).join(' ⇄ ')}
                </p>
                <NavLink
                  to='/roundtripbookingform'
                  state={{
                    bookingData: {
                      vehicle: selectedVehicle,
                      distance: totalDistance,
                      fare: totalFare,
                      duration: totalDays,
                      origin: startLocation.formatted,
                      destinations: destinations
                    }
                  }}
                >
                  <button className="w-full bg-white text-gray-950 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 hover:text-white transition-all shadow-xl flex justify-center items-center gap-3 group active:scale-95 shadow-orange-900/50 font-sans">
                    CONFIRM & BOOK <Send className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default RoundTripPlanner;