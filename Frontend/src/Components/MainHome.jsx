// src/components/MainHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Select from 'react-select';
import axios from 'axios';
import 'swiper/css';

import crista from '../Photos/crista.webp';
import dizire from '../Photos/Dizire.webp';
import tavera from '../Photos/tavera.webp';
import ShowVehicle from './ShowVehicle';

const cities = [
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'goa', label: 'Goa' },
  { value: 'manali', label: 'Manali' },
  { value: 'shimla', label: 'Shimla' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'varanasi', label: 'Varanasi' },
  { value: 'udaipur', label: 'Udaipur' },
  { value: 'jabalpur', label: 'Jabalpur' }
];

const MainHome = () => {
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const tableRef = useRef(null); // ✅ Table reference

  const handleBooking = () => {
    if (!fromPlace || !toPlace || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    setShowTable(true);

    // Scroll to table
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const fetchDistance = async () => {
      if (fromPlace && toPlace) {
        try {
          setLoading(true);
          const res = await axios.post("http://localhost:5000/api/distance", {
            from: fromPlace.label,
            to: toPlace.label
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

      {/* Form & Slider Container */}
      <div className="w-[95%] h-fit flex flex-col lg:flex-row gap-8 items-start justify-center">

        {/* Booking Form */}
        <div className="w-full lg:w-[50%] bg-white shadow-xl rounded-xl p-6 border border-yellow-400 flex flex-col items-center gap-5" data-aos="fade-right">
          <h2 className='font-bold text-2xl text-orange-500'>Book Your Journey</h2>

          <div className="w-[80%]">
            <Select options={cities} placeholder="From" value={fromPlace} onChange={setFromPlace} isClearable />
          </div>
          <div className="w-[80%]">
            <Select options={cities} placeholder="To" value={toPlace} onChange={setToPlace} isClearable />
          </div>

          <input className='w-[80%] p-2 border border-gray-400 rounded' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          <input className='w-[80%] p-2 border border-gray-400 rounded' type='time' value={time} onChange={(e) => setTime(e.target.value)} />

          {loading ? (
            <div className="text-sm text-gray-500">Calculating route...</div>
          ) : (
            distance && (
              <div className="w-[80%] text-center text-sm text-green-700 border border-green-400 p-2 rounded bg-green-50">
                Distance: <b>{distance} km</b> | Duration: <b>{duration} mins</b>
              </div>
            )
          )}

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

      {/* Show Vehicle Below */}
      {showTable && (
        <div ref={tableRef} className='w-[95%] mt-10'>
          <ShowVehicle
            from={fromPlace?.label}
            to={toPlace?.label}
            date={date}
            time={time}
          />
        </div>
      )}
    </div>
  );
};

export default MainHome;
