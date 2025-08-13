import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import crista from '../Photos/crista.jpg';
import dzire from '../Photos/Dizire.jpg';
import tavera from '../Photos/tavera.jpg';
import zest from '../Photos/zest.jpg';
import ertiga from '../Photos/ertiga.jpg';

const OneWayShowVecl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    from, to, pickupDate, dropDate, date,
    startTime, endTime, pickupInfo,
    distance, duration
  } = location.state || {};

  const finalPickupDate = pickupDate || date || "";

  const calculateRate = (vehicle, distanceKm) => {
    if (vehicle === 'Dzire') {
      if (distanceKm <= 20) return { amount: 800, perKmRate: null };
      if (distanceKm <= 40) return { amount: 1200, perKmRate: null };
      if (distanceKm <= 80) return { amount: 2000, perKmRate: null };
      if (distanceKm <= 100) return { amount: 20 * distanceKm, perKmRate: 20 };
      if (distanceKm <= 250) return { amount: 18 * distanceKm, perKmRate: 18 };
      if (distanceKm > 250) return { amount: 16 * distanceKm, perKmRate: 16 };
    }

    if (vehicle === 'Crysta') {
      if (distanceKm <= 20) return { amount: 1395, perKmRate: null };
      if (distanceKm <= 40) return { amount: 2295, perKmRate: null };
      if (distanceKm <= 80) return { amount: 2795, perKmRate: null };
      if (distanceKm <= 100) return { amount: 32 * distanceKm, perKmRate: 32 };
      if (distanceKm <= 250) return { amount: 30 * distanceKm, perKmRate: 30 };
      if (distanceKm > 250) return { amount: 28 * distanceKm, perKmRate: 28 };
    }

    if (vehicle === 'Tavera') {
      if (distanceKm <= 20) return { amount: 1995, perKmRate: null };
      if (distanceKm <= 40) return { amount: 1595, perKmRate: null };
      if (distanceKm <= 80) return { amount: 1195, perKmRate: null };
      if (distanceKm <= 100) return { amount: 25 * distanceKm, perKmRate: 25 };
      if (distanceKm <= 250) return { amount: 23 * distanceKm, perKmRate: 23 };
      if (distanceKm > 250) return { amount: 22 * distanceKm, perKmRate: 22 };
    }

    if (vehicle === 'Zest') {
      if (distanceKm <= 20) return { amount: 745, perKmRate: null };
      if (distanceKm <= 40) return { amount: 1195, perKmRate: null };
      if (distanceKm <= 80) return { amount: 1795, perKmRate: null };
      if (distanceKm <= 100) return { amount: 19 * distanceKm, perKmRate: 19 };
      if (distanceKm <= 250) return { amount: 17 * distanceKm, perKmRate: 17 };
      if (distanceKm > 250) return { amount: 15 * distanceKm, perKmRate: 15 };
    }

    if (vehicle === 'Ertiga') {
      if (distanceKm <= 20) return { amount: 1395, perKmRate: null };
      if (distanceKm <= 40) return { amount: 1795, perKmRate: null };
      if (distanceKm <= 80) return { amount: 2195, perKmRate: null };
      if (distanceKm <= 100) return { amount: 26 * distanceKm, perKmRate: 26 };
      if (distanceKm <= 250) return { amount: 24 * distanceKm, perKmRate: 24 };
      if (distanceKm > 250) return { amount: 22 * distanceKm, perKmRate: 22 };
    }

    return { amount: 15 * distanceKm, perKmRate: 15 }; // Default rate
  };

  const km = Math.ceil(distance || 0);

  const vehicles = [
    { vehicle: 'Crysta', img: crista, seats: 7 },
    { vehicle: 'Dzire', img: dzire, seats: 5 },
    { vehicle: 'Tavera', img: tavera, seats: 8 },
    { vehicle: 'Zest', img: zest, seats: 6 },
    { vehicle: 'Ertiga', img: ertiga, seats: 6 },
  ].map(v => {
    const { amount, perKmRate } = calculateRate(v.vehicle, km);
    return { ...v, amount, perKmRate };
  });

  const handleConfirm = (v) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/onewayconfirmvehical", {
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
          amount: v.amount,
          perKmRate: v.perKmRate,
          distance: km
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
              <th className='border px-2 py-2'>Amount (₹)</th>
              <th className='border px-2 py-2'>Distance (km)</th>
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
                  <img src={v.img} alt={v.vehicle} className="w-16 object-cover rounded-md mx-auto" />
                </td>

                <td className='border px-2 py-2 whitespace-nowrap'>{v.vehicle}</td>
                <td className='border px-2 py-2'>{from}</td>
                <td className='border px-2 py-2'>{to}</td>
                <td className='border px-2 py-2 whitespace-nowrap'>{startTime}</td>
                {endTime && <td className='border px-2 py-2 whitespace-nowrap'>{endTime}</td>}
                {pickupInfo && <td className='border px-2 py-2'>{pickupInfo}</td>}
                <td className='border px-2 py-2'>{v.seats}</td>
                
                <td className='border px-2 py-2'>{km} km</td>
                <td className='border px-2 py-2 text-green-600 font-semibold'>
                  ₹{v.amount.toLocaleString('en-IN')}
                </td>
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

export default OneWayShowVecl;
