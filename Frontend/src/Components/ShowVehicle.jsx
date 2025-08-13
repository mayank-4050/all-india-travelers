import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import crista from '../Photos/crista.jpg';
import dzire from '../Photos/Dizire.jpg';
import tavera from '../Photos/tavera.jpg';
import zest from '../Photos/zest.jpg';
import ertiga from '../Photos/ertiga.jpg';

const ShowVehicle = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {
    from, to, pickupDate, dropDate, date,
    startTime, endTime, pickupInfo,
    distance, duration // from OneWayForm
  } = location.state || {};

  const finalPickupDate = pickupDate || date || "";

  const calculateRate = (vehicle, km, hrs) => {
    if (vehicle === 'Dzire') {
      if (km <= 20 && hrs <= 2) return 800;
      if (km <= 40 && hrs <= 2) return 1200;
      if (km <= 80 && hrs <= 4) return 2000;
      if (km <= 100 && hrs <= 4) return 20;
      if (km <= 250 && hrs <= 6) return 18;
      if (km > 250 && hrs <= 8) return 16;
    }

    if (vehicle === 'Crysta') {
      if (km <= 20 && hrs <= 2) return 1395;
      if (km <= 40 && hrs <= 4) return 2295;
      if (km <= 80 && hrs <= 4) return 2795;
      if (km <= 100 && hrs <= 4) return 32;
      if (km <= 250 && hrs <= 6) return 30;
      if (km > 250 && hrs <= 8) return 28;
    }

    if (vehicle === 'Tavera') {
      if (km <= 20 && hrs <= 2) return 1995;
      if (km <= 40 && hrs <= 4) return 1595;
      if (km <= 80 && hrs <= 2) return 1195;
      if (km <= 100 && hrs <= 4) return 25;
      if (km <= 250 && hrs <= 6) return 23;
      if (km > 250 && hrs <= 8) return 22;
    }

    if (vehicle === 'Zest') {
      if (km <= 20 && hrs <= 2) return 745;
      if (km <= 40 && hrs <= 4) return 1195;
      if (km <= 80 && hrs <= 4) return 1795;
      if (km <= 100 && hrs <= 4) return 19;
      if (km <= 250 && hrs <= 6) return 17;
      if (km > 250 && hrs <= 8) return 15;
    }

    if (vehicle === 'Ertiga') {
      if (km <= 20 && hrs <= 2) return 1395;
      if (km <= 40 && hrs <= 4) return 1795;
      if (km <= 80 && hrs <= 2) return 2195;
      if (km <= 100 && hrs <= 4) return 26;
      if (km <= 250 && hrs <= 6) return 24;
      if (km > 250 && hrs <= 8) return 22;
    }

    return 10; // default rate if no condition matches
  };

  const hours = Math.ceil((duration || 0) / 60);
  const km = Math.ceil(distance || 0);

  const vehicles = [
    { vehicle: 'Crysta', img: crista, seats: 7 },
    { vehicle: 'Dzire', img: dzire, seats: 5 },
    { vehicle: 'Tavera', img: tavera, seats: 8 },
    { vehicle: 'Zest', img: zest, seats: 6 },
    { vehicle: 'Ertiga', img: ertiga, seats: 6 },
  ].map(v => {
    const rate = calculateRate(v.vehicle, km, hours);
    const amount = typeof rate === 'number' && rate < 1000 ? rate * km : rate;
    return { ...v, amount };
  });

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
                  <img src={v.img} alt={v.vehicle} className="w-16 object-cover rounded-md mx-auto" />
                </td>

                <td className='border px-2 py-2 whitespace-nowrap'>{v.vehicle}</td>
                <td className='border px-2 py-2'>{from}</td>
                <td className='border px-2 py-2'>{to}</td>
                <td className='border px-2 py-2 whitespace-nowrap'>{startTime}</td>
                {endTime && <td className='border px-2 py-2 whitespace-nowrap'>{endTime}</td>}
                {pickupInfo && <td className='border px-2 py-2'>{pickupInfo}</td>}
                <td className='border px-2 py-2'>{v.seats}</td>
                <td className='border px-2 py-2 text-green-600 font-semibold'>₹{v.amount}</td>
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