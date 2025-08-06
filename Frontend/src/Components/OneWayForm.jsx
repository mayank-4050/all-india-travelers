import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ShowVehicle from "./ShowVehicle";

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888";

const OneWayForm = () => {
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropQuery, setDropQuery] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickupPlace, setPickupPlace] = useState(null);
  const [dropPlace, setDropPlace] = useState(null);
  const [journeyDate, setJourneyDate] = useState("");
  const [time, setTime] = useState("");
  const [pickupInfo, setPickupInfo] = useState("Bus station to Bus station");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef(null);

  const fetchPickupSuggestions = async (value) => {
    setPickupQuery(value);
    if (value.length > 2) {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
      );
      const data = await res.json();
      setPickupSuggestions(data.features || []);
    } else {
      setPickupSuggestions([]);
    }
  };

  const fetchDropSuggestions = async (value) => {
    setDropQuery(value);
    if (value.length > 2) {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
      );
      const data = await res.json();
      setDropSuggestions(data.features || []);
    } else {
      setDropSuggestions([]);
    }
  };

  useEffect(() => {
    const fetchDistance = async () => {
      if (pickupPlace && dropPlace) {
        try {
          setLoading(true);
          const res = await axios.post("http://localhost:5000/api/distance", {
            from: pickupPlace,
            to: dropPlace,
          });
          setDistance(res.data.distance);
          setDuration(res.data.duration);
        } catch {
          setDistance(null);
          setDuration(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDistance();
  }, [pickupPlace, dropPlace]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupPlace || !dropPlace || !journeyDate || !time) {
      alert("Please fill all fields");
      return;
    }
    setShowTable(true);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="w-full flex flex-col items-center mt-8 px-4">
      <div className="w-full max-w-lg shadow-lg rounded-xl p-6 border bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          One Way Booking
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pickup Place"
              value={pickupQuery}
              onChange={(e) => fetchPickupSuggestions(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg"
            />
            {pickupSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                {pickupSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setPickupPlace(place.properties.formatted);
                      setPickupQuery(place.properties.formatted);
                      setPickupSuggestions([]);
                    }}
                  >
                    {place.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drop */}
          <div className="relative">
            <input
              type="text"
              placeholder="Drop Place"
              value={dropQuery}
              onChange={(e) => fetchDropSuggestions(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg"
            />
            {dropSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                {dropSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setDropPlace(place.properties.formatted);
                      setDropQuery(place.properties.formatted);
                      setDropSuggestions([]);
                    }}
                  >
                    {place.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <input
            type="date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            className="w-full px-4 py-1 border rounded-lg"
          />

          {/* Time */}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-1 border rounded-lg"
          />

          {/* Distance */}
          {loading ? (
            <div className="text-sm text-gray-500">Calculating route...</div>
          ) : (
            distance && (
              <div className="text-center text-sm text-green-700 border py-1 rounded bg-green-50">
                Distance: <b>{distance} km</b> | Duration: <b>{duration} mins</b>
              </div>
            )
          )}

          {/* Pickup Info */}
          <select
            value={pickupInfo}
            onChange={(e) => setPickupInfo(e.target.value)}
            className="w-full px-4 py-1 border rounded-lg"
          >
            <option>Bus station to Bus station</option>
            <option>Railway Station to Railway Station</option>
            <option>Highway to Highway</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-1 rounded-lg font-semibold"
          >
            View Details
          </button>
        </form>
      </div>

      {/* ShowVehicle */}
      {showTable && (
        <div ref={tableRef} className="w-[95%] mt-10">
          <ShowVehicle
            from={pickupPlace}
            to={dropPlace}
            date={journeyDate}
            startTime={time}
            pickupInfo={pickupInfo}
          />
        </div>
      )}
    </div>
  );
};

export default OneWayForm;
