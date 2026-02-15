import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { Menu } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch admin profile
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

  // Booking notifications
  useEffect(() => {
    socket.on("newBooking", (booking) => {
      setNotification(`📢 New booking from ${booking.customerName}`);
      setTimeout(() => setNotification(null), 5000);
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

      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`fixed left-0 h-full w-64 bg-white shadow-md border-r transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-orange-600">
              Admin Panel
            </h2>

            <nav className="space-y-4">

              <Link
                to="/admin/view-bookings"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
              >
                📅 View Bookings
              </Link>

              <Link
                to="/allcustomers"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
              >
                👥 All Customers
              </Link>

              <Link
                to="/allagents"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
              >
                🤝 All Agents
              </Link>

              {/* ✅ NEW OPTION */}
              <Link
                to="/admin/agent-requests"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
              >
                📝 Agent Requests
              </Link>

              <Link
                to="/alloffersforadmin"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
              >
                🎁 All Offers with Agent Info
              </Link>

            </nav>
          </div>
        </aside>

        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-50 bg-orange-600 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={22} />
        </button>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto p-6 md:ml-64">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">

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

            <div className="p-6">

              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden ring-4 ring-orange-200">
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
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Personal Information
                    </h2>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.name}
                    </p>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.email}
                    </p>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.phone}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Address Information
                    </h2>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.area}
                    </p>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.city}
                    </p>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.state}
                    </p>

                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {profile.pincode}
                    </p>
                  </div>
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
