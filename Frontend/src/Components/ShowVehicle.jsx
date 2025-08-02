import React from 'react';
import crista from '../Photos/crista.webp';
import dzire from '../Photos/Dizire.webp';
import tavera from '../Photos/tavera.webp';
import { NavLink } from 'react-router-dom';

const ShowVehicle = ({ from, to, date, startTime, endTime }) => {
  const vehicles = [
    { vehicle: 'Crysta', img: crista, seats: 7, amount: 10000 },
    { vehicle: 'Dzire', img: dzire, seats: 5, amount: 8000 },
    { vehicle: 'Tavera', img: tavera, seats: 8, amount: 6000 },
  ];

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
          {vehicles.map((v, idx) => (
            <tr key={idx}>
              <td className='border px-2 py-1'>{date}</td>
              <td className='border px-2 py-1'>
                <img src={v.img} alt={v.vehicle} className='w-20 h-12 object-cover mx-auto rounded' />
              </td>
              <td className='border px-2 py-1'>{v.vehicle}</td>
              <td className='border px-2 py-1'>{from}</td>
              <td className='border px-2 py-1'>{to}</td>
              <td className='border px-2 py-1'>{startTime}</td>
              <td className='border px-2 py-1'>{endTime}</td>
              <td className='border px-2 py-1'>{v.seats}</td>
              <td className='border px-2 py-1'>₹{v.amount}</td>
              <td className='border px-2 py-1'>
                <NavLink
                  to="/confirmvehical"
                  state={{
                    offer: {
                      from,
                      to,
                      date,
                      startTime,
                      endTime,
                      vehicle: v.vehicle,
                      seats: v.seats,
                      amount: v.amount
                    }
                  }}
                >
                  <button
                    className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
                  >
                    Confirm
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowVehicle;
