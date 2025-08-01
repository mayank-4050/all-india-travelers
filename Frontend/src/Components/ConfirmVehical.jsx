import React from 'react';
import Navbar from '../Components/UperNavbar';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmVehical = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer; // yahan se pura offer aayega

  if (!offer) {
    return (
      <div className="w-full text-center mt-10">
        <p className="text-red-500">No offer selected.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-orange-500 text-white px-4 py-2 mt-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full px-4 md:px-8 py-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold italic text-red-700 text-center">
          Confirm Your <span className="text-black">Order</span>
        </h1>

        <div className="w-full md:w-[70%] lg:w-[50%] px-6 py-5 border border-red-700 rounded-lg mt-5 bg-white shadow-md flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-semibold">Source Address:</span> {offer.from}</p>
            <p><span className="font-semibold">Destination Address:</span> {offer.to}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-semibold">Date:</span> {offer.date}</p>
            <p><span className="font-semibold">Car Name:</span> {offer.vehicle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-semibold">Start Time:</span> {offer.startTime}</p>
            <p><span className="font-semibold">End Time:</span> {offer.endTime}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-semibold">Seats:</span> {offer.seats}</p>
            <p><span className="font-semibold">Price:</span> ₹{offer.amount}</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button className="flex-1 min-w-[100px] py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition">
              Cancel
            </button>
            <button className="flex-1 min-w-[100px] py-2 rounded-lg text-white bg-red-700 hover:bg-red-800 transition">
              Book
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            For any enquiry: <span className="font-semibold">Call xxxxxxxxx</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVehical;
