import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/customers");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleViewClick = (id) => {
    navigate(`/singlecustomerdetail/${id}`);
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-lg font-semibold text-gray-500 animate-pulse">
        Loading customers...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        All Customers
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto border-collapse text-sm font-medium">
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white sticky top-0">
            <tr>
              {[
                "ID",
                "Full Name",
                "Email",
                "Mobile",
                "Area",
                "City",
                "State",
                "Pincode",
                "More",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-5 text-left tracking-wide select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer._id}
                className={`transition-colors duration-300 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 cursor-pointer`}
              >
                <td className="py-3 px-5 max-w-xs truncate">{customer._id}</td>
                <td className="py-3 px-5">{customer.fullName}</td>
                <td className="py-3 px-5">{customer.email}</td>
                <td className="py-3 px-5">{customer.mobile}</td>
                <td className="py-3 px-5">{customer.area}</td>
                <td className="py-3 px-5">{customer.city}</td>
                <td className="py-3 px-5">{customer.state}</td>
                <td className="py-3 px-5">{customer.pincode}</td>
                <td className="py-3 px-5">
                  <button
                    onClick={() => handleViewClick(customer._id)}
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <ViewIcon />
                    View
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

export default AllCustomers;
