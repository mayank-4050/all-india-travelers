import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Printer, MapPin, Calendar, 
  Car, Phone, User, IndianRupee, Navigation, Clock 
} from 'lucide-react';

const ViewsinglebookingforAdmin = () => {
  const { id } = useParams(); // URL se MongoDB _id lega
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        // Port 5000 ya 5001 check kar lena
        const res = await axios.get(`http://localhost:5000/api/roundtrip/${id}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black italic text-slate-300 uppercase tracking-widest">Loading Manifest...</div>;
  if (!booking) return <div className="min-h-screen flex items-center justify-center font-black text-red-500 uppercase">Booking Not Found!</div>;

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-10 font-sans print:bg-white print:p-0">
      
      {/* Header Controls */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 print:hidden">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold uppercase text-[10px] tracking-widest transition-all">
          <ArrowLeft size={16}/> Back to Registry
        </button>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-slate-200">
          <Printer size={16}/> Print Report
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 print:shadow-none print:border-none">
        
        {/* Top Banner */}
        <div className="bg-slate-950 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="bg-orange-600 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic">Official Round Trip Pass</span>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase mt-4 italic">Booking <span className="text-orange-500">#{booking.bookingId}</span></h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Logged on: {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-2xl font-black italic tracking-tighter uppercase text-green-500">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Customer & Vehicle Section */}
          <div className="space-y-10">
            <section>
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 border-b pb-2 flex items-center gap-2"><User size={14}/> Passenger Details</h3>
              <div className="space-y-4">
                <p className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{booking.customerName}</p>
                <p className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-widest"><Phone size={14} className="text-orange-600"/> {booking.mobile}</p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup Address</p>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase italic">{booking.pickupAddress}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 border-b pb-2 flex items-center gap-2"><Car size={14}/> Fleet Selection</h3>
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 font-black text-xl italic tracking-tighter">AIT</div>
                <div>
                  <p className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">{booking.vehicleName}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Standard Roundtrip Category</p>
                </div>
              </div>
            </section>
          </div>

          {/* Route & Pricing Section */}
          <div className="space-y-10">
            <section>
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 border-b pb-2 flex items-center gap-2"><Navigation size={14}/> Itinerary</h3>
              <div className="space-y-3 relative">
                {/* Timeline Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                
                {booking.route.map((r, i) => (
                  <div key={i} className="flex items-start gap-4 relative z-10">
                    <div className={`w-5 h-5 rounded-full border-4 border-white shadow-sm mt-1 ${r.pointType === 'Start' ? 'bg-orange-600' : r.pointType === 'Return' ? 'bg-slate-900' : 'bg-slate-300'}`}></div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
                      <span className="text-[10px] font-black text-slate-800 uppercase italic">{r.place} ({r.pointType})</span>
                      <span className="text-[9px] font-bold text-slate-400 font-sans tracking-tighter">{r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl italic tracking-tighter">
               <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-6 border-b border-slate-800 pb-2 flex items-center gap-2"><IndianRupee size={14}/> Financials</h3>
               <div className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex justify-between"><span>Base Distance</span><span className="text-white">{booking.actualRouteDistance} KM</span></div>
                  <div className="flex justify-between"><span>Trip Duration</span><span className="text-white">{booking.tripDuration} Days</span></div>
                  {booking.extraKm > 0 && <div className="flex justify-between text-orange-500 font-black"><span>Extra Km</span><span>+ {booking.extraKm} KM</span></div>}
                  <div className="flex justify-between text-blue-400 font-black"><span>Halt Charges</span><span>₹{booking.haltCharges}</span></div>
                  <div className="pt-6 border-t border-slate-800 flex justify-between items-end mt-4">
                    <span className="text-xl font-black text-white italic tracking-tighter underline decoration-orange-600 decoration-4">Grand Total</span>
                    <span className="text-5xl font-black text-orange-500 tracking-tighter">₹{booking.totalFare.toLocaleString()}</span>
                  </div>
               </div>
            </section>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] italic">All India Travelers Command Manifest © 2026</p>
        </div>
      </div>
    </div>
  );
};

export default ViewsinglebookingforAdmin;