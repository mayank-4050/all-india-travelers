import React, { useState, useEffect, useRef } from 'react'; // ✅ useRef add kiyaimport { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin, PlusCircle, X, CalendarDays,
  Users, Send, Search, Info, Route, Car,
  ShieldCheck, Timer, ChevronDown // ✅ Ye wala icon yahan add karein
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Aapki imported photos
import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";
import innova from "/Photos/innova.jpg";
import travellers from "/Photos/travellers.png";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";

const RoundTripPlanner = () => {
  // 1. Vehicle Data with Your Imported Images
  const vehicles = [
    { id: 'sedan', name: 'Sedan (Swift Dzire)', rate: 10, image: Dzire, capacity: '4+1' },
    { id: 'zest', name: 'Compact Sedan (Zest)', rate: 10, image: Zest, capacity: '4+1' },
    { id: 'suv', name: 'SUV (Ertiga)', rate: 14, image: Ertiga, capacity: '6+1' },
    { id: 'tavera', name: 'Classic SUV (Tavera)', rate: 13, image: Tavera, capacity: '8+1' },
    { id: 'premium', name: 'Premium (Innova Crysta)', rate: 17, image: Crysta, capacity: '7+1' },
    { id: 'innova', name: 'Premium (Innova)', rate: 15, image: innova, capacity: '7+1' },
    { id: 'traveller', name: 'travellers', rate: 25, image: travellers, capacity: '12+1' },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 7. API: Route & Time Calculation
  // 7. API: Route & Time Calculatio// 7. API: Route & Time Calculation
  useEffect(() => {
    const calculateRoute = async () => {
      // Sirf un stops ko filter karo jinka lat/lon mil chuka hai
      const validStops = destinations.filter(d => d.lat && d.lon);

      if (startLocation.lat && validStops.length > 0) {
        setIsCalculating(true);
        try {
          // ✅ YAHAN DEKHO: Waypoints mein sirf Start aur Stops hain.
          // Iske aage humne startLocation wapas nahi joda hai.
          const waypoints = [
            `${startLocation.lat},${startLocation.lon}`,
            ...validStops.map(s => `${s.lat},${s.lon}`)
          ].join('|');

          const res = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_KEY}`);
          const data = await res.json();

          if (data.features && data.features[0]) {
            const props = data.features[0].properties;
            // Distance meters mein aata hai, isliye /1000 karke KM mein badla
            setTotalDistance((props.distance / 1000).toFixed(1));
            setTotalTime(props.time);
          }
        } catch (error) {
          console.error("Routing Error:", error);
        } finally {
          setIsCalculating(false);
        }
      }
    };

    // 🔥 SABSE JARURI: Function ko yahan call karna padega tabhi calculation hogi
    calculateRoute();

  }, [destinations, startLocation]); // Jab bhi destination ya start badlega, ye chalega

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">


      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-10">
            {/* --- SECTION 1: ROUTE BUILDER --- */}
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 font-sans"><MapPin className="text-orange-600" /> Multi-City Route</h3>
              <div className="space-y-6 relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>

                {/* START POINT */}
                {/* START POINT */}
                {/* START POINT */}
                <div className="flex items-start gap-4 relative z-30 group"> {/* z-30 taaki ye section upar rahe */}
                  <div className="bg-orange-600 p-3 rounded-full shadow-lg mt-1 shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 bg-orange-50 p-6 rounded-2xl border border-orange-100 relative">

                    <div className="col-span-2 relative"> {/* Relative zaroori hai list position ke liye */}
                      <label className="block text-[10px] font-bold text-orange-600 uppercase mb-1 tracking-widest font-sans">Origin & Return</label>
                      <input
                        type="text"
                        value={startLocation.query}
                        onChange={(e) => { setStartLocation({ ...startLocation, query: e.target.value }); fetchSuggestions(e.target.value, 'start'); }}
                        className="w-full text-lg font-bold bg-transparent outline-none text-gray-900 font-sans"
                        placeholder="Starting City"
                      />

                      {/* Suggestions List Fix */}
                      {startSuggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto font-sans">
                          {startSuggestions.map((s, i) => (
                            <li
                              key={i}
                              onClick={() => handleSelect(s, 'start')}
                              className="p-3 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-0 font-sans text-gray-700"
                            >
                              {s.properties.formatted}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Date & Time (Mobile side-by-side) */}
                    <div className="col-span-1">
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest font-sans">Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                    </div>

                    <div className="col-span-1">
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest font-sans">Time</label>
                      <div className="flex items-center gap-1 font-sans">
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-transparent font-bold outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC STOPS */}
                <AnimatePresence>
                  {destinations.map((stop, index) => (
                    <motion.div key={stop.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 relative z-20 group font-sans">
                      <div className="bg-white p-3 rounded-full border-2 border-gray-300 shadow mt-1 shrink-0">
                        <MapPin className="h-6 w-6 text-gray-400" />
                      </div>

                      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200 relative hover:border-orange-300 transition-all shadow-sm">

                        <div className="col-span-2 relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stop {index + 1}</label>
                          <input
                            type="text"
                            value={stop.query}
                            onChange={(e) => { setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, query: e.target.value } : d)); fetchSuggestions(e.target.value, 'stop', stop.id); }}
                            className="w-full text-lg font-bold bg-transparent outline-none font-sans"
                            placeholder="Enter City"
                          />

                          {/* Suggestions List Fix */}
                          {stop.suggestions?.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto font-sans">
                              {stop.suggestions.map((s, i) => (
                                <li
                                  key={i}
                                  onClick={() => handleSelect(s, 'stop', stop.id)}
                                  className="p-3 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-0 font-sans text-gray-700"
                                >
                                  {s.properties.formatted}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Date & Time Side-by-side */}
                        <div className="col-span-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</label>
                          <input type="date" value={stop.date} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, date: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                        </div>

                        <div className="col-span-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</label>
                          <input type="time" value={stop.time} onChange={(e) => setDestinations(prev => prev.map(d => d.id === stop.id ? { ...d, time: e.target.value } : d))} className="w-full bg-transparent font-bold outline-none text-sm font-sans" />
                        </div>

                        <button onClick={() => setDestinations(destinations.filter(d => d.id !== stop.id))} className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full text-gray-400 hover:text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button onClick={() => setDestinations([...destinations, { id: Date.now(), query: "", formatted: "", date: "", time: "", period: "AM", lat: null, lon: null, suggestions: [] }])} className="flex items-center gap-2 text-orange-700 font-bold bg-orange-100 px-6 py-3 rounded-full hover:bg-orange-200 transition-all ml-2 font-sans uppercase text-[10px] tracking-widest"><PlusCircle className="h-4 w-4" /> Add Stop</button>
              </div>
            </section>

            {/* --- SECTION 2: COMPACT HORIZONTAL VEHICLE SELECTION --- */}
            {/* VEHICLE SELECTION (Video Exact UI) */}
            <section className="bg-white p-4 md:p-8 rounded-[2rem] shadow-lg border border-gray-100" ref={dropdownRef}>
              <h3 className="text-[10px] font-black mb-3 flex items-center gap-2 uppercase tracking-widest text-gray-400 italic">
                <Car className="text-orange-600" size={16} /> Choose Fleet
              </h3>

              <div className="relative">
                {/* --- SELECTED CAR BOX (Dropdown Trigger) --- */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full border-2 p-3 rounded-2xl flex justify-between items-center cursor-pointer transition-all duration-300 ${isDropdownOpen ? 'border-orange-500 bg-white shadow-md' : 'border-slate-100 bg-slate-50/50'
                    }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={selectedVehicle.image} className="w-14 h-9 object-cover rounded-lg shrink-0 shadow-sm" alt="" />
                    <div className="truncate">
                      <p className="font-black text-[12px] uppercase tracking-tight text-slate-800 truncate">{selectedVehicle.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Users size={10} className="text-orange-500" /> {selectedVehicle.capacity}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`text-slate-400 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} size={18} />
                </div>

                {/* --- DROPDOWN LIST (Video Style) --- */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-[110] bg-white border border-slate-100 w-full shadow-2xl rounded-2xl mt-2 max-h-64 overflow-auto overflow-x-hidden custom-scrollbar"
                    >
                      {vehicles.map((v) => (
                        <li
                          key={v.id}
                          className={`p-3 flex items-center justify-between border-b last:border-0 hover:bg-orange-50 cursor-pointer transition-colors ${selectedVehicle.id === v.id ? 'bg-orange-50/80' : ''
                            }`}
                          onClick={() => {
                            setSelectedVehicle(v);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={v.image} className="w-14 h-9 object-cover rounded-lg border border-slate-100 shadow-sm" alt="" />
                            <div>
                              <p className="font-black text-[11px] uppercase text-slate-800">{v.name}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                <Users size={10} className="text-orange-600" /> {v.capacity}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-600 font-black text-[11px] italic">₹{v.rate}/KM</p>
                            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Base Rate</p>
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
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
                    <span className="flex items-center gap-2 italic font-bold font-sans">Required Per Day running</span>
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
                {/* Trip Summary ke niche wala text badal do */}
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 italic leading-relaxed font-sans">
                  {startLocation.formatted.split(',')[0]}
                  {destinations.filter(d => d.formatted).map(d => ` → ${d.formatted.split(',')[0]}`).join('')}
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