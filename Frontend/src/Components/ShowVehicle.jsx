import React from 'react';
import { useNavigate } from 'react-router-dom';
import crista from '../Photos/crista.webp';
import dzire from '../Photos/Dizire.webp';
import tavera from '../Photos/tavera.webp';
import zest from '../Photos/zest.webp';
import ertiga from '../Photos/ertiga.webp';

const ShowVehicle = ({ from, to, pickupDate, dropDate, date, startTime, endTime, pickupInfo }) => {
  const navigate = useNavigate();

  const finalPickupDate = pickupDate || date || "";

  const vehicles = [
    { vehicle: 'Crysta', img: crista, seats: 7, amount: 10000 },
    { vehicle: 'Dzire', img: dzire, seats: 5, amount: 8000 },
    { vehicle: 'Tavera', img: tavera, seats: 8, amount: 6000 },
    { vehicle: 'Zest', img: zest, seats: 6, amount: 6000 },
    { vehicle: 'Ertiga', img: ertiga, seats: 6, amount: 6000 },
  ];

  const handleConfirm = (v) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/confirmvehical", {
      state: {
        offer: {
          from,
          to,
          pickupDate: finalPickupDate,
          dropDate: dropDate || null,
          startTime,
          endTime: endTime || null,
          pickupInfo,
          vehicle: v.vehicle,
          seats: v.seats,
          amount: v.amount
        }
      }
    });
  };

  return (
    <div className='bg-white p-4 rounded-xl shadow-lg'>
      <h2 className='text-xl font-bold text-orange-600 mb-4 text-center'>Available Vehicles</h2>

      <div className="overflow-x-auto">
        <table className='min-w-full text-sm text-center border border-gray-200'>
          <thead className='bg-orange-100 text-gray-700'>
            <tr>
              {dropDate ? (
                <>
                  <th className='border px-2 py-2'>Pickup Date</th>
                  <th className='border px-2 py-2'>Drop Date</th>
                </>
              ) : (
                <th className='border px-2 py-2'>Date</th>
              )}
              <th className='border px-2 py-2'>Car Image</th>
              <th className='border px-2 py-2'>Car Name</th>
              <th className='border px-2 py-2'>From</th>
              <th className='border px-2 py-2'>To</th>
              <th className='border px-2 py-2'>Start Time</th>
              {endTime && <th className='border px-2 py-2'>End Time</th>}
              {pickupInfo && <th className='border px-2 py-2'>Pickup Info</th>}
              <th className='border px-2 py-2'>Seats</th>
              <th className='border px-2 py-2'>Amount</th>
              <th className='border px-2 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {dropDate ? (
                  <>
                    <td className='border px-2 py-2 whitespace-nowrap'>{pickupDate}</td>
                    <td className='border px-2 py-2 whitespace-nowrap'>{dropDate}</td>
                  </>
                ) : (
                  <td className='border px-2 py-2 whitespace-nowrap'>{finalPickupDate}</td>
                )}

                <td className='border px-2 py-2'>
                  <img src={v.img} alt={v.vehicle} className="w-16  object-cover rounded-md mx-auto" />
                </td>

                <td className='border px-2 py-2 whitespace-nowrap'>{v.vehicle}</td>
                <td className='border px-2 py-2'>{from}</td>
                <td className='border px-2 py-2'>{to}</td>
                <td className='border px-2 py-2 whitespace-nowrap'>{startTime}</td>
                {endTime && <td className='border px-2 py-2 whitespace-nowrap'>{endTime}</td>}
                {pickupInfo && <td className='border px-2 py-2'>{pickupInfo}</td>}
                <td className='border px-2 py-2'>{v.seats}</td>
                <td className='border px-2 py-2'>₹{v.amount}</td>
                <td className='border px-2 py-2'>
                  <button
                    onClick={() => handleConfirm(v)}
                    className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs sm:text-sm'
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowVehicle;
