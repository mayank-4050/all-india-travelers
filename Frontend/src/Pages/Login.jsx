import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../Components/UperNavbar';
import register from './Register';

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        emailOrMobile,
        password,
        role,
      });

      const { token } = response.data;

      // ✅ Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar/>
      <div className=" w-[40%] rounded py-2 px-5 flex flex-col items-center border border-orange-500">
        <h1 className='text-orange-500 italic font-bold text-2xl mb-5'>Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border py-1 px-2 rounded w-full"
        >
          <option value="Admin">Admin</option>
          <option value="Agent">Agent</option>
          <option value="Customer">Customer</option>
        </select>

        <input
          type="text"
          placeholder="Email or Mobile"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          className="border py-1 px-2 rounded w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border py-1 px-2 rounded w-full"
        />

        <button type="submit" className="bg-orange-500 text-white px-4 py-2 w-full rounded cursor-pointer active:scale-95">
          Login
        </button>
      </form>
      <p>New User?<NavLink to='/register'><span className='text-blue-500'> Register</span></NavLink></p>
      </div>
    </div>
  );
};

export default Login;
