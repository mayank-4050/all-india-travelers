import React, { useState, useEffect } from 'react';
import Navbar from './UperNavbar';
import { NavLink } from 'react-router-dom';

const AgentProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    profileImage: '',
    createdAt: ''
  });

  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // --- helpers and fetch logic remain unchanged ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: profile.name,
          mobile: profile.phone,
          email: profile.email,
          address: profile.area,
          city: profile.city,
          state: profile.state,
          pincode: profile.pincode,
          profileImage: profile.profileImage
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedData = await response.json();

      setProfile({
        name: updatedData.fullName || '',
        phone: updatedData.mobile || '',
        email: updatedData.email || '',
        area: updatedData.address || '',
        city: updatedData.city || '',
        state: updatedData.state || '',
        pincode: updatedData.pincode || '',
        profileImage: updatedData.profileImage || '',
        createdAt: updatedData.createdAt || ''
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        // Fetch profile
        const profileRes = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const profileData = await profileRes.json();
        setProfile({
          name: profileData.fullName || '',
          phone: profileData.mobile || '',
          email: profileData.email || '',
          area: profileData.area || profileData.address || '',
          city: profileData.city || '',
          state: profileData.state || '',
          pincode: profileData.pincode || '',
          profileImage: profileData.profileImage || '',
          createdAt: profileData.createdAt || ''
        });

        // Fetch bookings (optional, not displayed here)
        const bookingsRes = await fetch('http://localhost:5000/api/bookings', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const bookingsData = await bookingsRes.json();
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (error) {
        console.error('Error fetching profile or bookings:', error);
      }
    };

    fetchProfileAndBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-6 flex-shrink-0">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <nav className="flex flex-col space-y-3">
           
            <NavLink
              to="/addoffer"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg hover:bg-orange-100 ${
                  isActive ? 'bg-orange-200 font-semibold' : ''
                }`
              }
            >
              Add Offer
            </NavLink>
            
            <NavLink
              to="/agenttermcondition"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg hover:bg-orange-100 ${
                  isActive ? 'bg-orange-200 font-semibold' : ''
                }`
              }
            >
              Terms & Conditions
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-orange-600 p-6 text-white">
              <h1 className="text-2xl font-bold">Agent Profile</h1>
              <p className="text-orange-100">Manage your personal information</p>
              {profile.createdAt && (
                <p className="mt-2 text-sm text-orange-200">
                  Account Created On: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Profile Form */}
            <div className="p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="mt-4">
                    <label className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded cursor-pointer transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      Change Photo
                    </label>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Personal Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Address Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="area"
                          value={profile.area}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.area}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={profile.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={profile.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8 space-x-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>

              <NavLink to='/agenttermcondition'>
                <p className='text-blue-500 mt-4'>Customer Terms & Conditions</p>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentProfile;
