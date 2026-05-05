import React from 'react';
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

    const handleProceedToCustomerDetails = () => {
        navigate('/customerdataoneway', { state: { offer } });
    };

    if (!offer) return <div className="p-10 text-center font-bold text-red-500">No Booking Data Found!</div>;

    const carImage = getVehicleImage(offer.vehicle);

    return (
        <div className="min-h-screen bg-gray-50 pb-10 relative overflow-hidden">
            {/* --- HEADER --- */}
            <div className="bg-orange-600 p-4 text-white text-center shadow-lg">
                <h2 className="text-xl font-bold uppercase tracking-widest text-white">Review Your Trip</h2>
            </div>

            <div className="max-w-md mx-auto mt-6 px-4">
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
                    <div className="p-6 pt-0 space-y-4">
                        
                        {/* ROUTE BOX */}
                        <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                            <div className="flex gap-3 mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase text-left">Pickup From</p>
                                    <p className="text-sm font-bold text-gray-700 leading-tight text-left">{offer.from}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase text-left">Drop To</p>
                                    <p className="text-sm font-bold text-gray-700 leading-tight text-left">{offer.to}</p>
                                </div>
                            </div>
                        </div>

                        {/* SCHEDULE GRID (Pickup & Drop) */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Pickup</p>
                                <p className="text-[11px] font-black text-gray-800">{offer.pickupDate}</p>
                                <p className="text-[10px] text-orange-600 font-bold">{offer.startTime}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Drop/Return</p>
                                <p className="text-[11px] font-black text-gray-800">{offer.dropDate || 'One-Way'}</p>
                                {offer.endTime && <p className="text-[10px] text-orange-600 font-bold">{offer.endTime}</p>}
                            </div>
                        </div>

                        {/* DISTANCE & RATE INFO */}
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <div className="text-center flex-1 border-r border-gray-200">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Distance</p>
                                <p className="text-xs font-black text-gray-800">{offer.distance} km</p>
                            </div>
                            <div className="text-center flex-1">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Rate</p>
                                <p className="text-xs font-black text-gray-800">
                                    {offer.perKmRate ? `₹${offer.perKmRate}/km` : 'Fixed Fare'}
                                </p>
                            </div>
                        </div>

                        {/* SPECIAL INSTRUCTIONS */}
                        {offer.pickupInfo && (
                            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                                <p className="text-[9px] text-blue-500 font-black uppercase text-left">Pickup Note</p>
                                <p className="text-[11px] text-blue-800 italic font-medium text-left">"{offer.pickupInfo}"</p>
                            </div>
                        )}

                        {/* FARE CARD */}
                        <div className="bg-green-600 p-5 rounded-[2rem] shadow-xl flex justify-between items-center text-white">
                            <div className="text-left">
                                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-white">Total Fare</p>
                                <p className="text-[9px] opacity-70 italic font-medium text-white">Incl. all taxes</p>
                            </div>
                            <p className="text-3xl font-black text-white">₹{offer.amount.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>

                {/* PROCEED BUTTON */}
                <button
                    onClick={handleProceedToCustomerDetails}
                    className="w-full mt-6 bg-orange-600 text-white py-4 rounded-[1.5rem] font-black text-xl shadow-2xl active:scale-95 transition-all uppercase tracking-widest"
                >
                    Continue to Details
                </button>
            </div>
        </div>
    );
};

export default OneWayConVecl;