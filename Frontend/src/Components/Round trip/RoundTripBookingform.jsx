import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Send, Navigation, Users, CheckCircle2, Download, MapPin, Info } from 'lucide-react';
import axios from 'axios'; 

const RoundTripBookingform = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const bookingData = state?.bookingData || {};

  // Logic Calculations
  const haltChargePerNight = 200;
  const totalNights = Math.max(0, (bookingData.duration || 1) - 1);
  const totalHaltCharges = totalNights * haltChargePerNight;
  const minRunning = (bookingData.duration || 1) * 250;
  const actualKm = parseFloat(bookingData.distance) || 0;
  const extraKm = actualKm > minRunning ? (actualKm - minRunning).toFixed(1) : 0;
  const finalPayable = (bookingData.fare || 0) + totalHaltCharges;

  const [customer, setCustomer] = useState({ name: '', mobile: '', pickupAddress: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null); // ✅ To store DB response

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.mobile || !customer.pickupAddress) {
      alert("Bhai, sari details bharna zaroori hai!");
      return;
    }

    setLoading(true);

    const payload = {
      bookingId: `AIT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customer.name,
      mobile: customer.mobile,
      pickupAddress: customer.pickupAddress,
      vehicleName: bookingData.vehicle?.name || "N/A",
      tripDuration: bookingData.duration || 1,
      minRunningLimit: minRunning,
      actualRouteDistance: actualKm,
      extraKm: parseFloat(extraKm) || 0,
      haltCharges: totalHaltCharges,
      totalFare: finalPayable,
      route: [
        {
          place: bookingData.origin || "Origin",
          date: bookingData.startDate || new Date().toLocaleDateString(),
          pointType: 'Start'
        },
        ...(bookingData.destinations || [])
          .filter(d => d.formatted)
          .map(d => ({
            place: d.formatted.split(',')[0],
            date: d.date || bookingData.startDate || "N/A",
            pointType: 'Stop'
          })),
        {
          place: bookingData.origin?.split(',')[0] || "Origin",
          date: "Return Trip",
          pointType: 'Return'
        }
      ]
    };

    try {
      const response = await axios.post('http://localhost:5000/api/roundtrip/new', payload);
      if (response.data.success) {
        setConfirmedData(response.data.data); // ✅ Save DB data for Invoice
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10 print:bg-white print:pb-0">
      <header className="bg-white border-b sticky top-0 z-50 px-6 py-4 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => isBooked ? setIsBooked(false) : navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-bold transition-all uppercase text-[10px] tracking-widest">
            <ChevronLeft size={16} /> {isBooked ? "Back" : "Edit Route"}
          </button>
          <h1 className="text-xl font-black italic uppercase tracking-tighter text-gray-950">Final <span className="text-orange-600">{isBooked ? "Receipt" : "Checkout"}</span></h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 print:p-0">
        {!isBooked ? (
          /* --- 1. FORM VIEW --- */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border border-gray-100">
                <h3 className="text-sm font-black mb-10 flex items-center gap-3 uppercase tracking-[0.2em] text-gray-500">
                  <User className="text-orange-600" size={20} /> Passenger Information
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
                      <label className="text-[9px] font-black text-orange-600 uppercase tracking-widest block mb-2">Full Name</label>
                      <input type="text" placeholder="Mayank Kori" className="w-full bg-transparent font-bold text-lg outline-none" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                    </div>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
                      <label className="text-[9px] font-black text-orange-600 uppercase tracking-widest block mb-2">Mobile Number</label>
                      <input type="tel" placeholder="91XXXXXXXX" className="w-full bg-transparent font-bold text-lg outline-none" value={customer.mobile} onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })} />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 focus-within:border-orange-500 transition-all">
                    <label className="text-[9px] font-black text-orange-600 uppercase tracking-widest block mb-2">Pickup Address</label>
                    <textarea placeholder="Complete address for pickup..." className="w-full bg-transparent font-bold text-lg outline-none h-32 resize-none" value={customer.pickupAddress} onChange={(e) => setCustomer({ ...customer, pickupAddress: e.target.value })} />
                  </div>
                </div>
              </section>

              <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 flex items-start gap-4">
                <Info className="text-orange-600 shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-[11px] font-black uppercase text-orange-800 tracking-widest mb-1">Important Note</p>
                  <p className="text-[10px] text-orange-700 font-bold leading-relaxed">Toll Tax, State Tax aur Parking charges alag se dene honge. Driver ka allowance fare mein shamil hai.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-950 p-10 rounded-[3rem] text-white shadow-2xl sticky top-28 border border-gray-800 overflow-hidden">
                <h3 className="text-sm font-black mb-8 text-orange-500 uppercase tracking-[0.2em] italic border-b border-white/5 pb-5 flex items-center gap-2">
                  <Navigation size={18} /> Trip Review
                </h3>
                <div className="space-y-8 mb-10">
                  <div className="flex items-center gap-4 bg-white/5 p-5 rounded-[2rem] border border-white/10 italic">
                    <div className="w-24 h-16 rounded-2xl overflow-hidden shrink-0 bg-white/5"><img src={bookingData.vehicle?.image} className="w-full h-full object-cover" alt="Car" /></div>
                    <div>
                      <p className="text-[12px] font-black uppercase text-white tracking-widest">{bookingData.vehicle?.name}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase mt-1 italic">{bookingData.vehicle?.capacity} Seater</p>
                    </div>
                  </div>
                  <div className="space-y-4 px-1 text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                    <div className="flex justify-between"><span>Safar ke Din</span><span className="text-white font-black">{bookingData.duration} Day(s)</span></div>
                    <div className="flex justify-between"><span>Min. Limit</span><span className="text-white font-black">{minRunning} KM</span></div>
                    <div className="flex justify-between"><span>Actual Dist.</span><span className="text-white font-black">{actualKm} KM</span></div>
                    {extraKm > 0 && <div className="flex justify-between text-green-500 bg-green-500/10 p-3 rounded-2xl border border-green-500/20 font-black"><span>Extra Running</span><span>+ {extraKm} KM</span></div>}
                    <div className="flex justify-between text-blue-400 pt-2 font-black"><span>Halt Charges ({totalNights} Night)</span><span>₹{totalHaltCharges}</span></div>
                  </div>
                  <div className="pt-8 border-t border-white/10 text-right">
                    <p className="text-[10px] font-black text-orange-200 uppercase tracking-[0.3em] mb-2 italic">Total Estimated Fare</p>
                    <span className="text-6xl font-black text-white italic tracking-tighter">₹{finalPayable.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full bg-orange-600 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/40 flex justify-center items-center gap-3 uppercase italic tracking-tighter ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? "SAVING..." : "CONFIRM BOOKING"} <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* --- 2. INVOICE VIEW --- */
          <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500 font-sans print:p-0">
            <div className="text-center print:hidden">
              <CheckCircle2 className="text-green-600 mx-auto mb-2" size={40} />
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Booking Successful!</h2>
            </div>

            <div className="bg-white p-10 md:p-14 border border-gray-200 shadow-2xl print:shadow-none print:border-none">
              <div className="flex justify-between border-b-2 border-gray-950 pb-6 mb-8">
                <div>
                  <h1 className="text-3xl font-black italic uppercase text-orange-600">All India <span className="text-gray-950">Travels</span></h1>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Official Booking Invoice</p>
                </div>
                <div className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <p>Invoice: <span className="text-gray-950">#{confirmedData?.bookingId}</span></p>
                  <p>Date: <span className="text-gray-950">{new Date().toLocaleDateString()}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 mb-8 border-b border-gray-100 pb-8">
                <div>
                  <h4 className="text-[9px] font-black text-orange-600 uppercase mb-2 tracking-widest font-sans">Customer Details</h4>
                  <p className="text-xl font-black text-gray-900 uppercase tracking-tight">{confirmedData?.customerName}</p>
                  <p className="text-xs font-bold text-gray-500 mt-1">{confirmedData?.mobile}</p>
                  <p className="text-[9px] text-gray-400 font-medium uppercase mt-2 leading-tight">{confirmedData?.pickupAddress}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[9px] font-black text-orange-600 uppercase mb-2 tracking-widest font-sans">Vehicle Details</h4>
                  <p className="text-xl font-black text-gray-900 uppercase italic tracking-tight">{confirmedData?.vehicleName}</p>
                  <p className="text-[10px] font-black text-gray-400 mt-1 italic uppercase tracking-widest">Type: Round Trip</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 italic">Planned Route</h4>
                <div className="space-y-2">
                  {confirmedData?.route.map((r, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center font-bold text-[9px] uppercase italic">
                      <span className="flex items-center gap-2 tracking-tight"><MapPin size={12} className={r.pointType === 'Start' ? "text-orange-600" : "text-gray-400"} /> {r.place} ({r.pointType})</span>
                      <span className="text-gray-500 tracking-widest">{r.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-y-2 border-gray-100 py-6 mb-8 font-sans">
                <div className="space-y-3 font-bold text-[10px] uppercase italic tracking-widest">
                  <div className="flex justify-between text-gray-500"><span>Duration</span><span>{confirmedData?.tripDuration} Day(s)</span></div>
                  <div className="flex justify-between text-gray-500"><span>Distance</span><span>{confirmedData?.actualRouteDistance} KM</span></div>
                  {confirmedData?.extraKm > 0 && <div className="flex justify-between text-green-600 font-black"><span>Extra Running</span><span>+ {confirmedData?.extraKm} KM</span></div>}
                  <div className="flex justify-between text-blue-600 font-black"><span>Halt Charges</span><span>₹{confirmedData?.haltCharges}</span></div>
                  <div className="pt-6 border-t-2 border-gray-900 flex justify-between items-center mt-3">
                    <span className="text-2xl font-black uppercase italic tracking-tighter text-gray-950 underline decoration-orange-500 decoration-4">Grand Total</span>
                    <span className="text-5xl font-black text-orange-600 italic tracking-tighter">₹{confirmedData?.totalFare.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-3">Terms & Conditions</h4>
                <ul className="text-[8px] font-bold text-gray-400 uppercase list-disc pl-5 space-y-1.5 leading-tight italic tracking-widest">
                  <li>Toll Tax, State Tax aur Parking charges alag se dene honge.</li>
                  <li>KMs aur Time garage se garage tak count hoga.</li>
                  <li>Night halt charge ₹{haltChargePerNight} per night applicable hai.</li>
                  <li>Original slips customer ko driver ko verify karani hogi.</li>
                </ul>
              </div>
              <p className="text-center text-[8px] font-bold text-gray-300 uppercase mt-12 italic tracking-[0.2em] border-t pt-5 border-dashed">This is a system generated digital invoice. No signature required.</p>
            </div>

            <div className="flex gap-4 print:hidden px-4 pb-20">
              <button onClick={handleDownload} className="flex-grow bg-gray-950 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex justify-center items-center gap-2 active:scale-95 transition-all"><Download size={18} /> Download Invoice</button>
              <button onClick={() => navigate('/')} className="flex-grow bg-orange-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex justify-center items-center gap-2">Book Another</button>
            </div>
          </div>
        )}
      </main>
      <style dangerouslySetInnerHTML={{ __html: `@media print { .print\\:hidden { display: none !important; } @page { size: A4; margin: 1cm; } }` }} />
    </div>
  );
};

export default RoundTripBookingform;