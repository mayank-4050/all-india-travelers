import React, { useState } from "react";
import axios from "axios";
import { User, Phone, MapPin, Calendar } from "lucide-react";

const MarriageBookingForm = () => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/marriage/create", form);

      alert("🎉 Booking Submitted Successfully");

      setForm({
        name: "",
        phone: "",
        date: "",
        location: ""
      });

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

      {/* Heading */}
      <h2
        className="text-center text-orange-600 mb-6"
        style={{ fontFamily: "Dancing Script", fontSize: "38px" }}
      >
        Wedding Car Booking
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Wedding Location"
            className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Book Wedding Car
        </button>

      </form>

    </div>
  );
};

export default MarriageBookingForm;