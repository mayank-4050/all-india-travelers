import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../Components/UperNavbar';

const Login = () => {

  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { emailOrMobile, password }
      );

      const { token, user } = response.data;
      const userRole = user.role;
      const userStatus = user.status;

      // 🔥 AGENT APPROVAL CHECK FIRST
      if (userRole === "Agent" && userStatus !== "approved") {
        setErrorMessage("Please Make Payment To Start Business With Us.");
        return; // ❌ Do not login yet
      }

      // ================= SAVE AUTH DATA =================
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole.toLowerCase());
      localStorage.setItem('status', userStatus);

      localStorage.setItem('customerData', JSON.stringify({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.mobile || ""
      }));

      // ================= ROLE BASED REDIRECT =================
      if (userRole === "Admin") {
        navigate("/adminprofile");
      } else if (userRole === "Agent") {
        navigate("/agentprofile");
      } else {
        navigate("/customerprofile");
      }

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid login credentials"
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">

      <Navbar />

      <div className="w-full md:w-[40%] mt-6 rounded py-6 px-5 flex flex-col items-center border border-orange-500 shadow-md bg-white">

        <h1 className="text-orange-500 italic font-bold text-2xl mb-5">
          Login
        </h1>

        {errorMessage && (
          <p className="bg-red-100 text-red-600 px-4 py-2 rounded w-full text-center mb-3">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">

          <input
            type="text"
            placeholder="Email or Mobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="border py-2 px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border py-2 px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 w-full rounded hover:bg-orange-600 transition"
          >
            Login
          </button>

        </form>

        {/* 🔥 Register & Payment Same Line - Clean Style */}
        <div className="mt-4 w-full flex justify-between text-sm">

          <div>
            New User?
            <NavLink to="/register">
              <span className="text-blue-500 ml-1 hover:underline">
                Register
              </span>
            </NavLink>
          </div>

          <NavLink to="/agent-payment">
            <span className="text-blue-500 hover:underline">
              Make Payment
            </span>
          </NavLink>

        </div>

      </div>
    </div>
  );
};

export default Login;
