import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

// Connect to backend socket server
const socket = io("http://localhost:5000", { transports: ["websocket"] });

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: "",
    createdAt: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch admin profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfile({
          name: data.fullName || "",
          phone: data.mobile || "",
          email: data.email || "",
          area: data.area || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          profileImage: data.profileImage || "",
          createdAt: data.createdAt || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Listen for new booking notifications
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("newBooking", (booking) => {
      console.log("📢 New booking received:", booking);
      setNotification(`📢 New booking from ${booking.customerName}`);
      setTimeout(() => setNotification(null), 5000);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      socket.off("newBooking");
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: profile.name,
          mobile: profile.phone,
          email: profile.email,
          area: profile.area,
          city: profile.city,
          state: profile.state,
          pincode: profile.pincode,
          profileImage: profile.profileImage,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setProfile({
        name: updatedData.fullName || "",
        phone: updatedData.mobile || "",
        email: updatedData.email || "",
        area: updatedData.area || "",
        city: updatedData.city || "",
        state: updatedData.state || "",
        pincode: updatedData.pincode || "",
        profileImage: updatedData.profileImage || "",
        createdAt: updatedData.createdAt || "",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 border-r h-screen fixed">
          <h2 className="text-xl font-bold mb-6 text-orange-600">Admin Panel</h2>
          <nav className="space-y-4">
            <Link
              to="/admin/view-bookings"
              className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
            >
              📅 View Bookings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto p-6 ml-64">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-orange-600 p-6 text-white">
              <h1 className="text-2xl font-bold">Admin Profile</h1>
              <p className="text-orange-100">
                Manage your personal information
              </p>
              {profile.createdAt && (
                <p className="mt-2 text-sm text-orange-200">
                  Account Created On:{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Profile Picture */}
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

              {/* Profile Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Personal Information
                    </h2>
                    {[
                      { label: "Full Name", name: "name", type: "text" },
                      { label: "Email", name: "email", type: "email" },
                      { label: "Phone", name: "phone", type: "tel" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isEditing ? (
                          <input
                            type={field.type}
                            name={field.name}
                            value={profile[field.name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">
                            {profile[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Address Info */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Address Information
                    </h2>
                    {[
                      { label: "Area", name: "area" },
                      { label: "City", name: "city" },
                      { label: "State", name: "state" },
                      { label: "Pincode", name: "pincode" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field.name}
                            value={profile[field.name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">
                            {profile[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
