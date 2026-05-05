import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerData = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { offer } = location.state || {};

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: ''
    });

    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        setIsBooking(true);

        // This mapping ensures the Backend Controller receives exactly what it expects
        const finalBookingData = {
            ...offer, 
            customerName: formData.name,      
            customerMobile: formData.mobile,  
            customerAddress: formData.address 
        };

        try {
            const response = await fetch('http://localhost:5000/api/onewaybookingforadmin/new-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalBookingData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // 1. Stop loading
                setIsBooking(false);
                // 2. Show the success overlay (The Green Tick)
                setShowSuccess(true);
                
                // 3. Redirect to home after 3 seconds so they can see the success message
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setIsBooking(false);
                alert("Booking Error: " + (result.message || "Failed to save booking."));
            }
        }
        catch (error) {
            setIsBooking(false);
            console.error("Error:", error);
            alert("Could not connect to server. Please check if your Backend is running.");
        }
    };

    if (!offer) return <div className="p-10 text-center font-bold">Session Expired. Please start again.</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 relative">

            {/* SUCCESS OVERLAY - Shows when showSuccess is true */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white animate-in fade-in duration-500">
                    <div className="text-8xl mb-4 animate-bounce">✅</div>
                    <h2 className="text-3xl font-black text-gray-800 mt-5 uppercase tracking-tighter italic">Booking Confirmed!</h2>
                    <p className="text-gray-500 font-bold mt-2">Thank you, {formData.name}. Redirecting...</p>
                </div>
            )}

            <div className={`w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10 transition-opacity duration-300 ${showSuccess ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-orange-600 p-6 text-white text-center">
                    <h2 className="text-2xl font-bold uppercase italic tracking-tighter">Customer Details</h2>
                    <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mt-1">Provide Pickup Information</p>
                </div>

                <form onSubmit={handleConfirmBooking} className="p-8 space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                            required
                        />
                    </div>

                    {/* Mobile Input */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter 10-digit mobile"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                            required
                        />
                    </div>

                    {/* Address Input */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Exact Pickup Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="House No, Landmark, Area..."
                            rows="3"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                            required
                        ></textarea>
                    </div>

                    {/* Summary Mini-Card */}
                    <div className="bg-gray-900 p-5 rounded-[2rem] flex justify-between items-center text-white shadow-lg">
                        <div>
                            <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Total Fare</p>
                            <p className="text-2xl font-black italic">₹{offer.amount}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Trip</p>
                            <p className="text-xs font-bold opacity-80">{offer.from} → {offer.to}</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isBooking}
                        className="w-full bg-orange-600 text-white py-5 rounded-[1.5rem] font-black text-xl shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:bg-orange-700 active:scale-95 transition-all disabled:bg-gray-400 uppercase tracking-widest italic"
                    >
                        {isBooking ? 'Processing...' : 'Confirm & Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerData;