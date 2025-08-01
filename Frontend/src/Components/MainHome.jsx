// src/components/MainHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import crista from '../Photos/crista.webp';
import dizire from '../Photos/Dizire.webp';
import tavera from '../Photos/tavera.webp';
import ShowVehicle from './ShowVehicle';

const GEOAPIFY_KEY = "d2d43c2448eb403296a3e49969fa3888"; // your API key

const MainHome = () => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef(null);

  // Fetch suggestions for From input
  const fetchFromSuggestions = async (value) => {
    setFromQuery(value);
    if (value.length > 2) {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
      );
      const data = await res.json();
      setFromSuggestions(data.features || []);
    } else {
      setFromSuggestions([]);
    }
  };

  // Fetch suggestions for To input
  const fetchToSuggestions = async (value) => {
    setToQuery(value);
    if (value.length > 2) {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:in&limit=5&apiKey=${GEOAPIFY_KEY}`
      );
      const data = await res.json();
      setToSuggestions(data.features || []);
    } else {
      setToSuggestions([]);
    }
  };

  const handleBooking = () => {
    if (!fromPlace || !toPlace || !date || !time) {
      alert("Please fill all fields.");
      return;
    }
    setShowTable(true);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Fetch distance when both places are selected
  useEffect(() => {
    const fetchDistance = async () => {
      if (fromPlace && toPlace) {
        try {
          setLoading(true);
          const res = await axios.post("http://localhost:5000/api/distance", {
            from: fromPlace,
            to: toPlace
          });
          setDistance(res.data.distance);
          setDuration(res.data.duration);
        } catch (err) {
          console.error(err);
          setDistance(null);
          setDuration(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDistance();
  }, [fromPlace, toPlace]);

  return (
    <div className='w-full h-fit justify-center flex mt-8 bg-gray-50 pb-10 flex-col items-center'>
      <div className="w-[95%] flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Booking Form */}
        <div className="w-full lg:w-[50%] bg-white shadow-xl rounded-xl p-6 border border-yellow-400 flex flex-col items-center gap-5" data-aos="fade-right">
          <h2 className='font-bold text-2xl text-orange-500'>Book Your Journey</h2>

          {/* From input */}
          <div className="w-[80%] relative">
            <input
              type="text"
              placeholder="From"
              value={fromQuery}
              onChange={(e) => fetchFromSuggestions(e.target.value)}
              className="w-full border p-2 rounded"
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                {fromSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setFromPlace(place.properties.formatted);
                      setFromQuery(place.properties.formatted);
                      setFromSuggestions([]);
                    }}
                  >
                    {place.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To input */}
          <div className="w-[80%] relative">
            <input
              type="text"
              placeholder="To"
              value={toQuery}
              onChange={(e) => fetchToSuggestions(e.target.value)}
              className="w-full border p-2 rounded"
            />
            {toSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                {toSuggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setToPlace(place.properties.formatted);
                      setToQuery(place.properties.formatted);
                      setToSuggestions([]);
                    }}
                  >
                    {place.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date & Time */}
          <input className='w-[80%] p-2 border rounded' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          <input className='w-[80%] p-2 border rounded' type='time' value={time} onChange={(e) => setTime(e.target.value)} />

          {/* Distance info */}
          {loading ? (
            <div className="text-sm text-gray-500">Calculating route...</div>
          ) : (
            distance && (
              <div className="w-[80%] text-center text-sm text-green-700 border border-green-400 p-2 rounded bg-green-50">
                Distance: <b>{distance} km</b> | Duration: <b>{duration} mins</b>
              </div>
            )
          )}

          {/* Submit button */}
          <button
            onClick={handleBooking}
            className='w-[80%] bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded'
          >
            View Details
          </button>
        </div>

        {/* Car Slider */}
        <div className="w-full lg:w-[50%] bg-white shadow-xl rounded-xl border" data-aos="fade-left">
          <Swiper modules={[Autoplay]} spaceBetween={30} slidesPerView={1} autoplay={{ delay: 3000 }} loop={true}>
            {[crista, dizire, tavera].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Slide ${idx + 1}`} className='w-full h-64 object-contain rounded-md' />
                <div className="w-full flex justify-between px-10 mt-3 mb-5">
                  <p>Price: <span className='text-blue-500 font-bold'>₹2000</span></p>
                  <button className='bg-orange-500 text-white px-3 py-1 rounded'>Book Now</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Show Vehicle Table */}
      {showTable && (
        <div ref={tableRef} className='w-[95%] mt-10'>
          <ShowVehicle
            from={fromPlace}
            to={toPlace}
            date={date}
            time={time}
          />
        </div>
      )}
    </div>
  );
};

export default MainHome;
