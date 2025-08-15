import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('offers') || '[]');
    setOffers(stored);
  }, []);

  const handleConfirm = (offer) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/confirmvehical", { state: { offer } });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl italic font-bold mb-4">Limited Time Offers</h2>

      {/* Table wrapper for horizontal scroll on mobile */}
      <div className="w-[90%] overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-700 shadow">
          <thead className="bg-orange-400 text-white uppercase">
            <tr>
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Seats</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{offer.from}</td>
                <td className="px-4 py-2">{offer.to}</td>
                <td className="px-4 py-2">{offer.vehicle}</td>
                <td className="px-4 py-2">₹{offer.amount}</td>
                <td className="px-4 py-2">{offer.date}</td>
                <td className="px-4 py-2">
                  {offer.startTime} - {offer.endTime}
                </td>
                <td className="px-4 py-2">{offer.seats}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleConfirm(offer)}
                    className="px-2 py-1 bg-green-500 rounded text-white hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offer;
