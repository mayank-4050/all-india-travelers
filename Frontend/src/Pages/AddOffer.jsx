import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";
const vehicles = ["Crysta", "Tavera", "Dzire"];

const AddOffer = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [seats, setSeats] = useState("");
  const [distance, setDistance] = useState(null);

  // 🔹 Load city/place suggestions from Geoapify API
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

  // 🔹 Fetch distance when From & To are selected
  useEffect(() => {
    const fetchDistance = async () => {
      if (from && to) {
        try {
          const res = await axios.post("http://localhost:5000/api/distance", {
            from: from.label,
            to: to.label,
          });
          setDistance(res.data.distance);
        } catch (err) {
          console.error("Distance error:", err);
          setDistance(null);
        }
      }
    };
    fetchDistance();
  }, [from, to]);

  // 🔹 Submit Offer to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!from || !to || !vehicle || !amount || !date || !startTime || !endTime || !seats) {
      alert("Please fill all fields");
      return;
    }

  const newOffer = {
  from: from?.label || from || "",
  to: to?.label || to || "",
  vehicle: vehicle.charAt(0).toUpperCase() + vehicle.slice(1).toLowerCase(), // ensures "Crysta", "Tavera", "Dzire"
  amount: Number(amount) || 0,
  date: date || "",
  seats: Number(seats) || 0,
  startTime: startTime || "",
  endTime: endTime || "",
  distance: distance ? Number(distance) : 0,
};



    try {
      await axios.post("http://localhost:5000/api/offers", newOffer);
      alert("✅ Offer submitted successfully!");

      // Reset form
      setFrom(null);
      setTo(null);
      setVehicle("");
      setAmount("");
      setDate("");
      setSeats("");
      setStartTime("");
      setEndTime("");
      setDistance(null);
    } catch (err) {
      console.error("Offer submit error:", err);
      alert("❌ Failed to submit offer");
    }
  };

  return (
    <div className="">
      <div
        className="mx-auto mt-10 p-6 border border-orange-500 rounded-lg shadow-md max-w-2xl relative"
        // style={{
        //   backgroundImage: `url(${backgroundImg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4 text-center text-orange-500 italic">
            Add Travel <span className="text-black">Offer</span>
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* From Place */}
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              placeholder="From"
              value={from}
              onChange={setFrom}
            />

            {/* To Place */}
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              placeholder="To"
              value={to}
              onChange={setTo}
            />

            {/* Vehicle */}
            <select
              className="w-full border p-2 rounded"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Amount */}
            <input
              className="w-full border p-2 rounded"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Date */}
            <input
              className="w-full border p-2 rounded"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Seats */}
            <input
              className="w-full border p-2 rounded"
              type="number"
              placeholder="Seats Available"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />

            {/* Pickup Time */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                className="w-full border p-2 rounded"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            {/* Drop Time */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Drop Time
              </label>
              <input
                className="w-full border p-2 rounded"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
              >
                Submit Offer
              </button>
            </div>
          </form>

          {/* Show calculated distance */}
          {distance && (
            <p className="mt-2 text-center text-green-700 font-semibold">
              Distance: {distance} km
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
