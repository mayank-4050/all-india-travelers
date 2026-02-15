import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Fetch only logged-in agent offers
  const fetchMyOffers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/offers/my-offers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOffers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching my offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  // 🔴 Delete Offer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/offers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMyOffers(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🟢 Edit Offer (navigate to AddOffer page with state)
  const handleEdit = (offer) => {
    navigate("/addoffer", { state: { editOffer: offer } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          My Posted Offers
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : offers.length === 0 ? (
          <p className="text-gray-500">You have not posted any offers yet.</p>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                {/* Offer Info */}
                <div className="space-y-1">
                  <p className="font-semibold text-lg">
                    {offer.from} → {offer.to}
                  </p>
                  <p className="text-sm text-gray-600">
                    {offer.vehicle} | {offer.seats} seats
                  </p>
                  <p className="text-sm text-gray-600">
                    {offer.date} | {offer.startTime} - {offer.endTime}
                  </p>
                  <p className="text-green-600 font-bold text-lg">
                    ₹{offer.amount}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Offer Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/addoffer")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
          >
            ➕ Add New Offer
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyOffers;
