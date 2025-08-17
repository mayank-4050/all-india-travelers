import React from 'react';
import Navbar from './UperNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCar, FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

// ✅ Import your car images
import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";

// ✅ Map car names to images
const carImages = {
  Dzire,
  Crysta,
  Zest,
  Ertiga,
  Tavera,
};

const OfferConVehical = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  if (!offer) { 
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10 text-red-500">No offer selected.</p>
      </div>
    );
  }

  const handleProceed = () => {
    navigate('/customerdetailform', { state: { offer } });
  };

  // ✅ Match image with car name
  const carImage = carImages[offer.vehicle] || Dzire; // fallback image

  return (
    <div className="w-full p-5 min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Offer Details</h2>

        {/* ✅ Car Image */}
        <div className="flex justify-center mb-4">
          <img 
            src={carImage} 
            alt={offer.vehicle} 
            className="w-64 h-40 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-400"/> <strong>From:</strong> {offer.from}</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-400"/> <strong>To:</strong> {offer.to}</p>
          <p className="flex items-center gap-2"><FaCar className="text-orange-400"/> <strong>Vehicle:</strong> {offer.vehicle}</p>
          <p className="flex items-center gap-2"><FaRupeeSign className="text-orange-400"/> <strong>Amount:</strong> {offer.amount}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-orange-400"/> <strong>Date:</strong> {offer.date}</p>
          <p className="flex items-center gap-2"><FaClock className="text-orange-400"/> <strong>Waiting Time:</strong> {offer.startTime} - {offer.endTime}</p>
          <p className="flex items-center gap-2"><FaUsers className="text-orange-400"/> <strong>Seats:</strong> {offer.seats}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(-1)} // goes back one page
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Cancel
          </button>

          <button
            onClick={handleProceed} // goes to CustomerDetailForm
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Add Passenger Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferConVehical;
