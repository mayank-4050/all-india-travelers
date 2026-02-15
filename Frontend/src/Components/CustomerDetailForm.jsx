import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './UperNavbar';

const CustomerDetailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  const [passenger, setPassenger] = useState({
    name: '',
    phone: '',
    email: '',
    idType: 'Aadhar Card',
    idNumber: '' // Changed from idImage to idNumber
  }); 

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('passengerData', JSON.stringify(passenger));
    navigate("/onewaypayadvance", { state: { offer } });
  };

  if (!offer) {
    return <p className="text-center text-red-500 mt-5">No trip data found.</p>;
  }
  
  return (
    <div className='w-full'>
      <Navbar />
      <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Passenger Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Passenger Name" 
            value={passenger.name} 
            onChange={handleChange} 
            className="w-full border px-3 py-2 rounded" 
            required 
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Passenger Phone" 
            value={passenger.phone} 
            onChange={handleChange} 
            className="w-full border px-3 py-2 rounded" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Passenger Email" 
            value={passenger.email} 
            onChange={handleChange} 
            className="w-full border px-3 py-2 rounded" 
            required 
          />
          <select 
            name="idType" 
            value={passenger.idType} 
            onChange={handleChange} 
            className="w-full border px-3 py-2 rounded"
          >
            <option>Aadhar Card</option>
            <option>Voter ID Card</option>
          </select>
          <input 
            type="text" 
            name="idNumber" // New field for ID proof number
            placeholder="ID Proof Number" 
            value={passenger.idNumber} 
            onChange={handleChange} 
            className="w-full border px-3 py-2 rounded" 
            required 
          />
          <button 
            type="submit" 
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 w-full"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailForm;
