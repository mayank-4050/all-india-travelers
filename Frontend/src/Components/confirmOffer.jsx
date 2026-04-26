import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OfferConfirmVehicle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extracting the offer data passed from the Offer page
  const { offer } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Safety check if page is accessed without state
  if (!offer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-bold">No offer selected!</p>
        <button 
          onClick={() => navigate("/")} 
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // We must map your 'offer' data to the keys the backend expects
  const bookingData = {
    name: formData.name,       // Backend looks for 'name'
    phone: formData.phone,     // Backend looks for 'phone'
    address: formData.address, // Backend looks for 'address'
    offerId: offer._id,
    from: offer.from,          // Backend looks for 'from'
    to: offer.to,              // Backend looks for 'to'
    vehicle: offer.vehicle,
    seats: offer.seats,
    distance: offer.distance,
    amount: offer.amount,
    travelDate: offer.date,    // Mapping 'date' to 'travelDate'
    travelTime: `${offer.startTime} - ${offer.endTime}`, // Mapping to 'travelTime'
    agencyName: offer.agencyName,
    agencyPhone: offer.agencyPhone
  };

  try {
    const res = await axios.post("http://localhost:5000/api/offerbookings/offer-confirm", bookingData);
    if (res.data.success) {
      alert("Booking Confirmed!");
      navigate("/");
    }
  } catch (err) {
    console.error("Booking Error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-orange-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Complete Your Booking</h2>
          <p className="text-orange-100 italic">{offer.from} to {offer.to}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Read-Only Schedule Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Travel Date</label>
              <input
                type="text"
                value={offer.date}
                readOnly
                className="w-full mt-1 p-2 bg-gray-100 border border-gray-200 rounded text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Pickup Window</label>
              <input
                type="text"
                value={`${offer.startTime} - ${offer.endTime}`}
                readOnly
                className="w-full mt-1 p-2 bg-gray-100 border border-gray-200 rounded text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* User Input Fields */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Address</label>
            <textarea
              name="address"
              required
              rows="3"
              placeholder="Enter pickup/drop address details"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            />
          </div>

          {/* Price Tag */}
          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-100">
            <div>
              <p className="text-xs text-green-700 font-bold uppercase">Total Fare</p>
              <p className="text-sm text-gray-600">{offer.vehicle} ({offer.seats} Seats)</p>
            </div>
            <span className="text-2xl font-black text-green-600">₹{offer.amount}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferConfirmVehicle;