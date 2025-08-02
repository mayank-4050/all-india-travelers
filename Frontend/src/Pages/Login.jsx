import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../Components/UperNavbar';

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        emailOrMobile,
        password,
        role,
      });

      const { token, user } = response.data; // सही तरीका
      const userRole = user.role;

      // Save token & role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      // Debugging in console
      console.log("User Role Saved:", userRole);
      console.log("Token Saved:", token);

      // Redirect based on role
      if (userRole === "Admin") {
        navigate("/adminprofile");
      } else if (userRole === "Agent") {
        navigate("/agentprofile");
      } else {
        navigate("/customerprofile");
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="w-full md:w-[40%] mt-6 rounded py-6 px-5 flex flex-col items-center border border-orange-500 shadow-md bg-white">
        
        <h1 className="text-orange-500 italic font-bold text-2xl mb-5">Login</h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="bg-red-100 text-red-600 px-4 py-2 rounded w-full text-center mb-3">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Role Select */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border py-2 px-3 rounded w-full"
          >
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Customer">Customer</option>
          </select>

          {/* Email or Mobile */}
          <input
            type="text"
            placeholder="Email or Mobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="border py-2 px-3 rounded w-full"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border py-2 px-3 rounded w-full"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 w-full rounded cursor-pointer hover:bg-orange-600 active:scale-95 transition"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-3 text-sm">
          New User?
          <NavLink to="/register">
            <span className="text-blue-500 ml-1 hover:underline">Register</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
