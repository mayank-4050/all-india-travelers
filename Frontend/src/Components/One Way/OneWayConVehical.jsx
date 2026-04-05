import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Images Import
import crista from '/Photos/crysta.jpg';
import dzire from '/Photos/dzire.jpg';
import tavera from '/Photos/tavera.jpg';
import zest from '/Photos/zest.jpg';
import ertiga from '/Photos/ertiga.webp';

const OneWayConVecl = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { offer } = location.state || {};

    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const getVehicleImage = (vehicleName) => {
        switch (vehicleName) {
            case 'Crysta': return crista;
            case 'Dzire': return dzire;
            case 'Tavera': return tavera;
            case 'Zest': return zest;
            case 'Ertiga': return ertiga;
            default: return null;
        }
    };

   const handleFinalBooking = async () => {
    setIsBooking(true); // Loading start

    try {
        // Backend API ko hit kar rahe hain
        // Note: Agar aapka backend 5000 port par hai toh wahi URL use karein
        const response = await fetch('http://localhost:5000/api/onewaybookingforadmin/new-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(offer), // offer mein From, To, Vehicle, Amount sab hai
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Agar DB mein save ho gaya aur mail chala gaya
            setIsBooking(false);
            setShowSuccess(true); // Right Tick animation dikhega

            // 3.5 second baad home page par bhej do
            setTimeout(() => {
                navigate('/');
            }, 3500);
        } else {
            // Agar backend se error aaya
            setIsBooking(false);
            alert("Booking Failed: " + (data.message || "Server Error"));
        }
    } catch (error) {
        // Agar network issue hai ya backend band hai
        setIsBooking(false);
        console.error("Error:", error);
        alert("Could not connect to server. Please check if Backend is running.");
    }
};

    if (!offer) return <div className="p-10 text-center font-bold">No Booking Data!</div>;

    const carImage = getVehicleImage(offer.vehicle);

    return (
        <div className="min-h-screen bg-gray-50 pb-10 relative overflow-hidden">

            {/* --- ANIMATED SUCCESS OVERLAY --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mt-5 animate-pulse">Booking Confirmed!</h2>
                    <p className="text-gray-500 text-sm">Thank you for choosing us.</p>
                </div>
            )}

            {/* --- HEADER --- */}
            <div className="bg-orange-600 p-4 text-white text-center shadow-lg">
                <h2 className="text-xl font-bold uppercase tracking-widest">Review & Confirm</h2>
            </div>

            <div className={`max-w-md mx-auto mt-6 px-4 transition-all duration-500 ${isBooking ? 'opacity-20 scale-95 pointer-events-none' : 'opacity-100'}`}>
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">

                    {/* VEHICLE INFO */}
                    <div className="bg-gradient-to-b from-orange-50 to-white p-6 flex flex-col items-center">
                        {carImage && <img src={carImage} alt={offer.vehicle} className="w-full h-32 object-contain drop-shadow-2xl" />}
                        <h1 className="text-3xl font-black text-gray-800 mt-4 uppercase italic tracking-tighter">{offer.vehicle}</h1>
                        <span className="bg-orange-600 text-white text-[10px] px-5 py-1 rounded-full font-bold shadow-md">
                            {offer.seats} SEATER AC PREMIUM
                        </span>
                    </div>

                    {/* TRIP DATA */}
                    <div className="p-6 pt-0 space-y-5">
                        
                        {/* ROUTE BOX */}
                        <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                            <div className="flex gap-3 mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Pickup From</p>
                                    <p className="text-sm font-bold text-gray-700 leading-tight">{offer.from}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Drop To</p>
                                    <p className="text-sm font-bold text-gray-700 leading-tight">{offer.to}</p>
                                </div>
                            </div>
                        </div>

                        {/* SCHEDULE GRID */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Date</p>
                                <p className="text-xs font-black text-gray-800">{offer.pickupDate}</p>
                            </div>
                            <div className="text-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Time</p>
                                <p className="text-xs font-black text-gray-800">{offer.startTime}</p>
                            </div>
                        </div>

                        {/* SPECIAL INSTRUCTIONS */}
                        {offer.pickupInfo && (
                            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                                <p className="text-[9px] text-blue-500 font-black uppercase">Note</p>
                                <p className="text-[11px] text-blue-800 italic font-medium">"{offer.pickupInfo}"</p>
                            </div>
                        )}

                        {/* FARE CARD */}
                        <div className="bg-green-600 p-5 rounded-[2rem] shadow-xl flex justify-between items-center text-white">
                            <div>
                                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Total Fare</p>
                                <p className="text-[9px] opacity-70 italic font-medium">Incl. all taxes</p>
                            </div>
                            <p className="text-4xl font-black">₹{offer.amount}</p>
                        </div>
                    </div>
                </div>

                {/* CONFIRM BUTTON */}
                <button
                    onClick={handleFinalBooking}
                    disabled={isBooking}
                    className="w-full mt-8 bg-orange-600 text-white py-4 rounded-[1.5rem] font-black text-xl shadow-2xl active:scale-95 transition-all uppercase tracking-widest disabled:bg-gray-400"
                >
                    {isBooking ? 'Processing...' : 'Confirm Booking'}
                </button>
            </div>

            {/* --- ALL STYLES (Animations + Success Icon) --- */}
            <style dangerouslySetInnerHTML={{ __html: `
                .success-checkmark {
                    width: 80px;
                    height: 115px;
                    margin: 0 auto;
                }
                .check-icon {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    border-radius: 50%;
                    box-sizing: content-box;
                    border: 4px solid #4CAF50;
                }
                .icon-line {
                    height: 5px; background-color: #4CAF50; display: block; border-radius: 2px; position: absolute; z-index: 10;
                }
                .line-tip {
                    top: 46px; left: 14px; width: 25px; transform: rotate(45deg); animation: icon-line-tip 0.75s;
                }
                .line-long {
                    top: 38px; right: 8px; width: 47px; transform: rotate(-45deg); animation: icon-line-long 0.75s;
                }
                .icon-circle {
                    top: -4px; left: -4px; z-index: 10; width: 80px; height: 80px; border-radius: 50%; border: 4px solid rgba(76, 175, 80, .5); position: absolute; box-sizing: content-box;
                }
                @keyframes icon-line-tip {
                    0% { width: 0; left: 1px; top: 19px; }
                    54% { width: 0; left: 1px; top: 19px; }
                    100% { width: 25px; left: 14px; top: 46px; }
                }
                @keyframes icon-line-long {
                    0% { width: 0; right: 46px; top: 54px; }
                    65% { width: 0; right: 46px; top: 54px; }
                    100% { width: 47px; right: 8px; top: 38px; }
                }
            `}} />
        </div>
    );
};

export default OneWayConVecl;