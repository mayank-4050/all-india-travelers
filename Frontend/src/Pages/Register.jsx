import React, { useState } from 'react';
import Navbar from '../Components/UperNavbar';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    travelerName: '',
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    state: '',
    pincode: '',
    idProofType: '',
    idProofImage: null,
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) return alert('Role is required');
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = new FormData();
    data.append('role', role);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Registered Successfully!');
      } else {
        alert('❌ Error: ' + result.message);
      }
    } catch (error) {
      console.error('❌ Registration failed:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="p-5 max-w-3xl mx-auto bg-white border border-orange-500 shadow rounded mt-6">
        <h2 className="text-2xl font-bold italic mb-6 text-center text-orange-500">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border py-1 px-2 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {role === 'Agent' && (
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Traveler Name:</label>
              <input
                type="text"
                name="travelerName"
                value={formData.travelerName}
                onChange={handleChange}
                className="w-full border py-1 px-2 rounded"
              />
            </div>
          )}

          {/* Common Fields */}
          <div>
            <label className="block mb-1 font-semibold">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mobile Number:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          {/* Agent-only Fields */}
          {role === 'Agent' && (
            <>
              <div>
                <label className="block mb-1 font-semibold">State:</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border py-1 px-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border py-1 px-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">ID Proof Type:</label>
                <select
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  className="w-full border py-1 px-2 rounded"
                >
                  <option value="">-- Select ID Proof --</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Voter ID Card">Voter ID Card</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Upload ID Proof:</label>
                <input
                  type="file"
                  name="idProofImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border py-1 px-2 rounded"
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border py-1 px-2 rounded"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orange-600 text-white py-1 px-6 rounded hover:bg-orange-700 active:scale-95"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          Already have an account?{' '}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
