import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../UperNavbar"

const MarriageBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/marriage/all");

      setBookings(res.data);

    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  return (
    <div className="p-6">
        <Navbar/>

      <h2
        className="text-center text-orange-600 mb-6"
        style={{ fontFamily: "Dancing Script", fontSize: "38px" }}
      >
        Wedding Car Booking
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white border rounded-lg shadow">

          <thead className="bg-orange-500 text-white">

            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Created</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-2 px-4">{booking.name}</td>
                <td className="py-2 px-4">{booking.phone}</td>
                <td className="py-2 px-4">{booking.date}</td>
                <td className="py-2 px-4">{booking.location}</td>
                <td className="py-2 px-4">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MarriageBookings;