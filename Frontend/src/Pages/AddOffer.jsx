import React, { useState } from 'react';
import Select from 'react-select';
import backgroundImg from '../Photos/travelLogo.png';

const cities = [
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'jabalpur', label: 'Jabalpur' },
  { value: 'goa', label: 'Goa' },
  { value: 'shimla', label: 'Shimla' },
];

const vehicles = ['Crysta', 'Tavera', 'Dzire'];

const AddOffer = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vehicle, setVehicle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [seats, setSeats] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !vehicle || !amount || !date || !startTime || !endTime || !seats) {
      alert('Please fill all fields');
      return;
    }

    const newOffer = {
      from: from.label,
      to: to.label,
      vehicle,
      amount,
      date,
      seats,
      startTime,
      endTime,
    };

    const existingOffers = JSON.parse(localStorage.getItem('offers') || '[]');
    existingOffers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(existingOffers));

    alert('Offer submitted successfully!');

    // Reset form
    setFrom(null);
    setTo(null);
    setVehicle('');
    setAmount('');
    setDate('');
    setSeats('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="">
      <div
        className="mx-auto mt-10 p-6 border border-orange-500 rounded-lg shadow-md max-w-2xl relative"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div>

        {/* Form content */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4 text-center text-orange-500 italic">
            Add Travel <span className="text-black">Offer</span>
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select options={cities} placeholder="From" value={from} onChange={setFrom} />
            <Select options={cities} placeholder="To" value={to} onChange={setTo} />

            <select
              className="w-full border p-2 rounded"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((v, i) => (
                <option key={i} value={v}>{v}</option>
              ))}
            </select>

            <input
              className="w-full border p-2 rounded"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              type="number"
              placeholder="Seats Available"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />

            {/* Submit button spans full width */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
              >
                Submit Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
