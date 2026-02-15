import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const AgentProfile = () => {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---------------- INPUT HANDLER ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ---------------- UPDATE PROFILE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("http://localhost:5000/api/auth/profile", {
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

      if (!res.ok) throw new Error("Update failed");
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
        createdAt: data.createdAt || "",
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  // ---------------- FETCH PROFILE ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
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
          createdAt: data.createdAt || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`fixed md:static left-0 h-full w-64 bg-white shadow-md p-6 z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <h2 className="text-xl font-bold mb-6 text-orange-600">
            Agent Dashboard
          </h2>

          <nav className="flex flex-col space-y-3">

            <NavLink
              to="/addoffer"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-200 font-semibold"
                    : "hover:bg-orange-100"
                }`
              }
            >
              ➕ Add Offer
            </NavLink>

            <NavLink
              to="/my-offers"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-200 font-semibold"
                    : "hover:bg-orange-100"
                }`
              }
            >
              📦 Posted Offers
            </NavLink>

            {/* 🔥 NEW CONFIRMED BOOKINGS OPTION */}
            <NavLink
              to="/agent-confirmed-bookings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-200 font-semibold"
                    : "hover:bg-orange-100"
                }`
              }
            >
              ✅ Confirmed Bookings
            </NavLink>

            <NavLink
              to="/agenttermcondition"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-200 font-semibold"
                    : "hover:bg-orange-100"
                }`
              }
            >
              📜 Terms & Conditions
            </NavLink>

          </nav>
        </aside>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-50 bg-orange-600 text-white p-2 rounded-full shadow"
        >
          <Menu size={22} />
        </button>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-white">
              <h1 className="text-2xl font-bold">Agent Profile</h1>
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

            {/* BODY */}
            <div className="p-6">

              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-orange-500 overflow-hidden shadow">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                      👤
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="mt-3 text-sm bg-gray-100 px-3 py-1 rounded cursor-pointer">
                    Change Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name", "email", "phone", "area", "city", "state", "pincode"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize">
                          {field}
                        </label>

                        {isEditing ? (
                          <input
                            name={field}
                            value={profile[field]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">
                            {profile[field]}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-end mt-8 gap-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-orange-600 text-white rounded-lg"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentProfile;
