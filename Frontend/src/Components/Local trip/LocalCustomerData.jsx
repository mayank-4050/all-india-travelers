import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const LocalCustomerData = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDetails, grandTotal } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.mobile || !formData.address) {
            alert("Please fill all details");
            return;
        }

        setLoading(true);
        try {
            // 1. Backend API Call - Updated endpoint to match your new route
            const response = await axios.post("http://localhost:5000/api/localbookings/new-booking", {
                bookingDetails: bookingDetails,
                customerName: formData.name,
                customerMobile: formData.mobile,
                customerAddress: formData.address,
                grandTotal: grandTotal
            });

            if (response.data.success) {
                // 2. WhatsApp Message Formatting
                let message = `*New Local Cab Booking*%0A`;
                message += `👤 *Customer:* ${formData.name}%0A`;
                message += `📞 *Mobile:* ${formData.mobile}%0A`;
                message += `📍 *Address:* ${formData.address}%0A`;
                message += `--------------------------%0A`;
                
                bookingDetails.forEach((trip, index) => {
                    message += `*Trip ${index + 1}:* ${trip.vehicle}%0A`;
                    message += `📍 Pickup: ${trip.startPoint}%0A`;
                    message += `📅 Date: ${trip.date}%0A`;
                    message += `⏰ Plan: ${trip.time}Hr / ${trip.runningKm}Km%0A`;
                    message += `💰 Fare: ₹${trip.amount}%0A%0A`;
                });
                message += `*Grand Total: ₹${grandTotal}*`;

                const whatsappNumber = "919301858537";
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

                setShowSuccess(true);
                setTimeout(() => navigate('/'), 3000);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Connection error: " + (error.response?.data?.message || "Please check if your backend is running."));
        } finally {
            setLoading(false);
        }
    };

    if (!bookingDetails) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="font-bold text-slate-500 mb-4">Session Expired</p>
                <button onClick={() => navigate('/')} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">Go to Home</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-10">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                    <ArrowLeft size={18}/>
                </button>
                <h2 className="text-lg font-black tracking-tight text-slate-800 underline decoration-orange-500 decoration-4">
                    Contact <span className="text-orange-500">Details</span>
                </h2>
                <div className="w-8"></div>
            </div>

            <div className="max-w-md mx-auto px-4 mt-10">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                    <form onSubmit={handleConfirmBooking} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                                <input 
                                    name="name"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-0 py-4 pl-12 pr-4 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                                    placeholder="Enter your name" 
                                />
                            </div>
                        </div>

                        {/* Mobile Input */}
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                                <input 
                                    name="mobile"
                                    required
                                    type="tel"
                                    autoComplete="tel"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-0 py-4 pl-12 pr-4 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                                    placeholder="91xxxxxxxx" 
                                />
                            </div>
                        </div>

                        {/* Address Input */}
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Pickup Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-orange-500" size={18} />
                                <textarea 
                                    name="address"
                                    required
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-0 py-4 pl-12 pr-4 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                                    placeholder="House No, Landmark, City..." 
                                />
                            </div>
                        </div>

                        {/* Total Summary Mini Card */}
                        <div className="bg-slate-900 rounded-2xl p-5 flex justify-between items-center shadow-lg">
                            <p className="text-white text-xs font-bold uppercase tracking-tight opacity-80">Bill Total</p>
                            <p className="text-orange-500 text-2xl font-black italic tracking-tighter">₹{grandTotal}</p>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit"
                            className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-slate-400 disabled:shadow-none"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>CONFIRM BOOKING <Send size={20}/></>}
                        </button>
                    </form>
                </div>
            </div>

            {/* Success Animation Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <CheckCircle size={100} className="text-green-500 animate-bounce mb-4" />
                        <div className="absolute inset-0 bg-green-500 opacity-20 blur-2xl rounded-full scale-150"></div>
                    </div>
                    <h2 className="text-4xl font-black italic tracking-tighter text-slate-900">BOOKING SUCCESS!</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2">Redirecting you home...</p>
                </div>
            )}
        </div>
    );
};

export default LocalCustomerData;