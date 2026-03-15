import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { Menu, X } from "lucide-react";

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

  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch profile
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        setProfile({
          name: data.fullName || "",
          phone: data.mobile || "",
          email: data.email || "",
          area: data.area || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          profileImage: data.profileImage || "",
          createdAt: data.createdAt || ""
        });

      } catch (err) {
        console.log(err);
      }

    };

    fetchProfile();

  }, []);

  // Socket notifications
  useEffect(() => {

    socket.on("newBooking", (booking) => {

      setNotification(`📢 New booking from ${booking.customerName}`);

      setTimeout(() => setNotification(null), 5000);

    });

    return () => socket.off("newBooking");

  }, []);

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`fixed md:static left-0 top-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >

          <div className="p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-bold text-orange-600">
                Admin Panel
              </h2>

              {/* Close button mobile */}
              <X
                className="md:hidden cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              />

            </div>

            <nav className="space-y-3">

              <Link
                to="/admin/view-bookings"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                📅 View Bookings
              </Link>

              <Link
                to="/allcustomers"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                👥 All Customers
              </Link>

              <Link
                to="/allagents"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                🤝 All Agents
              </Link>

              <Link
                to="/admin/agent-requests"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                📝 Agent Requests
              </Link>

              <Link
                to="/alloffersforadmin"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                🎁 All Offers
              </Link>

              <Link
                to="/admin/marriage-bookings"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                💍 Marriage Bookings
              </Link>

              <Link
                to="/admin/settings"
                className="block px-4 py-2 rounded-lg hover:bg-orange-100"
              >
                ⚙️ Settings
              </Link>

            </nav>

          </div>

        </aside>


        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}


        {/* Menu Button mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-24 left-4 z-50 bg-orange-500 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={22} />
        </button>


        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6">

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">

              <h1 className="text-2xl font-bold">
                Admin Profile
              </h1>

              <p className="text-orange-100">
                Manage your personal information
              </p>

              {profile.createdAt && (
                <p className="mt-2 text-sm">
                  Account Created On:{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              )}

            </div>

            {/* Profile */}
            <div className="p-6">

              <div className="flex justify-center mb-8">

                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden ring-4 ring-orange-200">

                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-4xl">
                      👤
                    </div>
                  )}

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Personal */}
                <div>

                  <h2 className="font-semibold border-b pb-2 mb-4">
                    Personal Information
                  </h2>

                  <div className="space-y-3">

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.name}
                    </p>

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.email}
                    </p>

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.phone}
                    </p>

                  </div>

                </div>

                {/* Address */}
                <div>

                  <h2 className="font-semibold border-b pb-2 mb-4">
                    Address Information
                  </h2>

                  <div className="space-y-3">

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.area}
                    </p>

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.city}
                    </p>

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.state}
                    </p>

                    <p className="bg-gray-50 p-3 rounded">
                      {profile.pincode}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AdminProfile;