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
      <h2 className="text-xl font-bold mb-4">Offers Table</h2>
      <div className="w-[90%] overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-700 shadow">
          <thead className="bg-orange-400 text-white uppercase">
            <tr>
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {`${offer.from} → ${offer.to}, ${offer.vehicle}, ₹${offer.amount}, ${offer.date}, ${offer.startTime} - ${offer.endTime}, seats ${offer.seats}`}
                </td>
                <td>
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
