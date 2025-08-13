import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const InactiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AdCusDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true); // default active

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/customers/${id}`);
        setCustomer(res.data);
        // You can adapt this if your backend has a status field:
        setIsActive(res.data.active !== undefined ? res.data.active : true);
      } catch (error) {
        console.error("Error fetching customer detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
    // Optional: Update status on backend here
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500 font-semibold animate-pulse">
        Loading customer details...
      </p>
    );
  }

  if (!customer) {
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        Customer not found.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Customer Detail
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">ID:</span> {customer._id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Full Name:</span> {customer.fullName}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Email:</span> {customer.email}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Mobile:</span> {customer.mobile}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Area:</span> {customer.area}
        </p>
        <p>
          <span className="font-semibold text-gray-900">City:</span> {customer.city}
        </p>
        <p>
          <span className="font-semibold text-gray-900">State:</span> {customer.state}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Pincode:</span> {customer.pincode}
        </p>
      </div>

      <button
        onClick={toggleActive}
        className={`mt-6 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 ${
          isActive
            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400"
            : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400"
        }`}
      >
        {isActive ? <InactiveIcon /> : <ActiveIcon />}
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
};

export default AdCusDetail;
