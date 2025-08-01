// src/components/ShowVehicle.jsx
import React from 'react';
import crista from '../Photos/crista.webp'
import dzire from '../Photos/Dizire.webp'
import tavera from '../Photos/tavera.webp'
import { NavLink } from 'react-router-dom';

const ShowVehicle = ({ from, to, date, time }) => {
  const handleFinalBooking = () => {
    // alert("Vehicle booked successfully!");
    // Optionally: You can clear form data or redirect user here
  };

  return (
    <div className='bg-white p-4 rounded-xl shadow-lg'>
      <h2 className='text-xl font-bold text-orange-600 mb-4'>Available Vehicles</h2>
      <table className='w-full text-sm text-center border border-gray-200'>
        <thead className='bg-orange-100 text-gray-700'>
          <tr>
            <th className='border px-2 py-1'>Date</th>
            <th className='border px-2 py-1'>Car Image</th>
            <th className='border px-2 py-1'>Car Name</th>
            <th className='border px-2 py-1'>From</th>
            <th className='border px-2 py-1'>To</th>
            <th className='border px-2 py-1'>Start Time</th>
            <th className='border px-2 py-1'>End Time</th>
            <th className='border px-2 py-1'>Seats</th>
            <th className='border px-2 py-1'>Amount</th>
            <th className='border px-2 py-1'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-2 py-1'>{date}</td>
            <td className='border px-2 py-1'>
              <img
                src={crista}
                alt="car"
                className='w-20 h-12 object-cover mx-auto rounded'
              />
            </td>
            <td className='border px-2 py-1'>Crysta</td>
            <td className='border px-2 py-1'>{from}</td>
            <td className='border px-2 py-1'>{to}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>7</td>
            <td className='border px-2 py-1'>₹10000</td>
            <td className='border px-2 py-1'>
              <NavLink to='/confirmvehical'>
              <button
                onClick={handleFinalBooking}
                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
              >
                Comfirm
              </button>
              </NavLink>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className='border px-2 py-1'>{date}</td>
            <td className='border px-2 py-1'>
              <img
                src={dzire}
                alt="car"
                className='w-20 h-12 object-cover mx-auto rounded'
              />
            </td>
            <td className='border px-2 py-1'>Dzire</td>
            <td className='border px-2 py-1'>{from}</td>
            <td className='border px-2 py-1'>{to}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>7</td>
            <td className='border px-2 py-1'>₹8000</td>
            <td className='border px-2 py-1'>
             <NavLink to='/confirmvehical'>
              <button
                onClick={handleFinalBooking}
                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
              >
                Comfirm
              </button>
              </NavLink>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className='border px-2 py-1'>{date}</td>
            <td className='border px-2 py-1'>
              <img
                src={tavera}
                alt="car"
                className='w-20 h-12 object-cover mx-auto rounded'
              />
            </td>
            <td className='border px-2 py-1'>Tavera</td>
         <td className='border px-2 py-1'>{from}</td>
            <td className='border px-2 py-1'>{to}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>{time}</td>
            <td className='border px-2 py-1'>7</td>
            <td className='border px-2 py-1'>₹6000</td>
            <td className='border px-2 py-1'>
             <NavLink to='/confirmvehical'>
              <button
                onClick={handleFinalBooking}
                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
              >
                Comfirm
              </button>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowVehicle;
