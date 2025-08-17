import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Import local images
import Crysta from "/Photos/crysta.jpg";
import Dzire from "/Photos/dzire.jpg";
import Tavera from "/Photos/tavera.jpg";
import Zest from "/Photos/zest.jpg";
import Ertiga from "/Photos/ertiga.webp";

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // ✅ Vehicle → Image mapping
  const vehicleImages = {
    Dzire: Dzire,
    Crysta: Crysta,
    Tavera: Tavera,
    Zest: Zest,
    Ertiga: Ertiga,
  };

  // ✅ Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/offers");
        if (res.data.success) {
          setOffers(res.data.data);
        } else {
          console.error("Failed to fetch offers:", res.data.error);
        }
      } catch (err) {
        console.error("❌ Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Available Offers</h1>

      {offers.length === 0 ? (
        <p>No offers found.</p>
      ) : (
        <div className="overflow-x-auto hidden md:block">
          {/* ✅ Table for Desktop */}
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-orange-300 text-sm">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Vehicle</th>
                <th className="p-2 border">Seats</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Waiting Time</th>
                <th className="p-2 border">Distance</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">
                    <img
                      src={vehicleImages[offer.vehicle] || "/Photos/default.jpg"}
                      alt={offer.vehicle}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">{offer.from}</td>
                  <td className="p-2 border">{offer.to}</td>
                  <td className="p-2 border">{offer.vehicle}</td>
                  <td className="p-2 border">{offer.seats}</td>
                  <td className="p-2 border">{offer.date}</td>
                  <td className="p-2 border">
                    {offer.startTime} - {offer.endTime}
                  </td>
                  <td className="p-2 border">{offer.distance || "—"} km</td>
                  <td className="p-2 border font-bold text-green-600">
                    ₹{offer.amount}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() =>
                        navigate("/offerconvehical", { state: { offer } })
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Card layout for Mobile */}
      <div className="md:hidden space-y-4">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="border rounded-lg shadow p-3 flex flex-col gap-2"
          >
            <img
              src={vehicleImages[offer.vehicle] || "/Photos/default.jpg"}
              alt={offer.vehicle}
              className="w-full h-32 object-cover rounded"
            />
            <p>
              <span className="font-semibold">From:</span> {offer.from}
            </p>
            <p>
              <span className="font-semibold">To:</span> {offer.to}
            </p>
            <p>
              <span className="font-semibold">Vehicle:</span> {offer.vehicle} (
              {offer.seats} seats)
            </p>
            <p>
              <span className="font-semibold">Date:</span> {offer.date}
            </p>
            <p>
              <span className="font-semibold">Waiting:</span>{" "}
              {offer.startTime} - {offer.endTime}
            </p>
            <p>
              <span className="font-semibold">Distance:</span>{" "}
              {offer.distance || "—"} km
            </p>
            <p className="text-green-600 font-bold">₹{offer.amount}</p>
            <button
              onClick={() =>
                navigate("/offerconvehical", { state: { offer } })
              }
              className="bg-green-500 text-white px-3 py-2 rounded w-full"
            >
              Confirm
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
