import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";
const vehicles = ["Crysta", "Tavera", "Dzire", "Zest", "Ertiga"];

const AddOffer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editOffer = location.state?.editOffer;

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [seats, setSeats] = useState("");
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 PREFILL FORM IF EDIT MODE
  useEffect(() => {
    if (editOffer) {
      setFrom({ label: editOffer.from, value: editOffer.from });
      setTo({ label: editOffer.to, value: editOffer.to });
      setVehicle(editOffer.vehicle);
      setAmount(editOffer.amount);
      setDate(editOffer.date);
      setSeats(editOffer.seats);
      setStartTime(editOffer.startTime);
      setEndTime(editOffer.endTime);
      setDistance(editOffer.distance || null);
    }
  }, [editOffer]);

  // 🔹 Load city suggestions
  const loadOptions = async (inputValue) => {
    if (inputValue.length < 3) return [];
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
    );
    const data = await res.json();
    return data.features.map((place) => ({
      value: place.properties.formatted,
      label: place.properties.formatted,
    }));
  };

  // 🔹 Fetch distance
  useEffect(() => {
    const fetchDistance = async () => {
      if (from && to) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/distance",
            {
              from: from.label,
              to: to.label,
            }
          );
          setDistance(res.data.distance);
        } catch (err) {
          console.error("Distance error:", err);
          setDistance(null);
        }
      }
    };
    fetchDistance();
  }, [from, to]);

  // 🔥 SUBMIT (CREATE OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to || !vehicle || !amount || !date || !startTime || !endTime || !seats) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const offerData = {
      from: from.label,
      to: to.label,
      vehicle,
      amount: Number(amount),
      date,
      seats: Number(seats),
      startTime,
      endTime,
      distance: distance || 0,
    };

    try {
      setLoading(true);

      if (editOffer) {
        // 🔥 UPDATE MODE
        await axios.put(
          `http://localhost:5000/api/offers/${editOffer._id}`,
          offerData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("✅ Offer updated successfully!");
      } else {
        // 🔥 CREATE MODE
        await axios.post(
          "http://localhost:5000/api/offers",
          offerData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("✅ Offer submitted successfully!");
      }

      navigate("/my-offers"); // Redirect after success

    } catch (err) {
      console.error("Offer submit error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          {editOffer ? "Update Travel Offer" : "Add Travel Offer"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            placeholder="From"
            value={from}
            onChange={setFrom}
          />

          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            placeholder="To"
            value={to}
            onChange={setTo}
          />

          <select
            className="border p-2 rounded"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))}
          </select>

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Seats Available"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition"
            >
              {loading
                ? "Processing..."
                : editOffer
                ? "Update Offer"
                : "Submit Offer"}
            </button>
          </div>
        </form>

        {distance && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            Distance: {distance} km
          </p>
        )}
      </div>
    </div>
  );
};

export default AddOffer;
