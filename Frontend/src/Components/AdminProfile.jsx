import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { 
  Menu, X, Calendar, Users, Handshake, FileText, 
  Gift, Heart, Settings, MapPin, Mail, Phone, 
  Camera, LayoutDashboard, MapPinned, Bell, CheckCircle2, ChevronRight, UserCircle, ArrowRightCircle,
  Car 
} from "lucide-react";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const AdminProfile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({
    name: "", phone: "", email: "", area: "", city: "", 
    state: "", pincode: "", profileImage: "", createdAt: "",
  });

  // ✅ Notification States
  const [activeAlert, setActiveAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Socket Listener for New Bookings
  useEffect(() => {
    socket.on("new_booking_alert", (data) => {
      setActiveAlert(data);
      
      // Notification Sound
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.play().catch(e => console.log("Audio play blocked by browser"));

      // 8 second baad notification gayab ho jaye
      setTimeout(() => setActiveAlert(null), 8000);
    });

    return () => socket.off("new_booking_alert");
  }, []);

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        const data = await res.json();
        setProfile({
          name: data.fullName || "Mayank Kori",
          phone: data.mobile || "91XXXXXXXX",
          email: data.email || "admin@ait.com",
          area: data.area || "Area Name",
          city: data.city || "Jabalpur",
          state: data.state || "MP",
          pincode: data.pincode || "482001",
          profileImage: data.profileImage || "",
          createdAt: data.createdAt || ""
        });
      } catch (err) { console.log(err); }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18}/> },
    { name: "View Bookings", path: "/admin/view-bookings", icon: <Calendar size={18}/> },
    { name: "One Way Bookings", path: "/admin/onewaybookingforadmin", icon: <ArrowRightCircle size={18} className="text-orange-600"/> }, 
    { name: "Local Bookings", path: "/admin/localbookings", icon: <Car size={18} className="text-orange-600"/> }, 
    { name: "Round Trip Bookings", path: "/admin/roundtripbookingforadmin", icon: <MapPinned size={18} className="text-orange-600"/> },
    { name: "All Customers", path: "/allcustomers", icon: <Users size={18}/> },
    { name: "All Agents", path: "/allagents", icon: <Handshake size={18}/> },
    { name: "Agent Requests", path: "/admin/agent-requests", icon: <FileText size={18}/> },
    { name: "Offers & Gifts", path: "/alloffersforadmin", icon: <Gift size={18}/> },
    { name: "Marriage Events", path: "/admin/marriage-bookings", icon: <Heart size={18}/> },
    { name: "System Settings", path: "/admin/settings", icon: <Settings size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans text-slate-900 relative">
      <Navbar />

      {/* ✅ REAL-TIME NOTIFICATION POPUP */}
      {activeAlert && (
        <div className="fixed top-24 right-5 z-[100] animate-in fade-in slide-in-from-right-10 duration-500">
          <div className="bg-white border-l-4 border-orange-600 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-5 max-w-sm flex items-start gap-4">
            <div className="bg-orange-100 p-2 rounded-full text-orange-600">
              <Bell size={24} className="animate-ring" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-[10px] uppercase tracking-widest text-orange-600 mb-1">New Booking Alert</h4>
              <p className="text-sm font-bold text-gray-950 uppercase italic leading-tight">
                {activeAlert.customer || "A new trip has been booked!"}
              </p>
              <Link 
                to="/admin/onewaybookingforadmin" 
                onClick={() => setActiveAlert(null)} 
                className="text-[9px] font-black uppercase text-gray-400 hover:text-orange-600 mt-2 flex items-center gap-1 transition-colors"
              >
                View Details <ChevronRight size={12}/>
              </Link>
            </div>
            <button onClick={() => setActiveAlert(null)} className="text-gray-300 hover:text-gray-500 transition-colors">
              <X size={16}/>
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed md:sticky top-0 h-screen w-72 bg-white border-r border-gray-100 transition-all z-50 ${sidebarOpen ? "left-0" : "-left-72 md:left-0"}`}>
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-12">
              All <span className="text-orange-600 italic underline decoration-4 underline-offset-4">India</span>
            </h2>
            
            <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${location.pathname === item.path ? "bg-gray-950 text-white shadow-xl shadow-gray-900/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"}`}
                >
                  <div className="flex items-center gap-3 font-bold text-[11px] uppercase tracking-widest">
                    {item.icon} {item.name}
                  </div>
                  {location.pathname === item.path && <ChevronRight size={14} className="text-orange-500" />}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6 md:p-12">
          <header className="flex justify-between items-center mb-12">
              <div>
                 <h1 className="text-4xl font-black italic uppercase tracking-tighter">My <span className="text-orange-600">Profile</span></h1>
                 <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1 italic">Control Center & Identity</p>
              </div>
              <button onClick={() => setSidebarOpen(true)} className="md:hidden bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-orange-600">
                <Menu size={24}/>
              </button>
          </header>

          {/* Profile Card UI (Rest of your code remains same) */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="bg-white p-8 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 text-center sticky top-28">
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-50 border-4 border-white shadow-xl shadow-gray-200">
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt="Admin" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                        <UserCircle size={80} />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-orange-600 text-white p-3 rounded-2xl shadow-lg cursor-pointer hover:bg-gray-950 transition-colors">
                    <Camera size={18} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-950">{profile.name}</h2>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mt-3 border border-green-100 font-sans">
                  <CheckCircle2 size={12}/> Verified Admin
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10 italic border-b pb-4">Personal Info</h3>
                <div className="grid md:grid-cols-2 gap-8 uppercase font-sans">
                  <div>
                    <label className="text-[9px] font-black text-orange-600/50 uppercase tracking-widest block mb-2 italic"><Mail size={12} className="inline mr-1"/> Email</label>
                    <p className="font-black text-gray-950 text-sm tracking-tight lowercase">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-orange-600/50 uppercase tracking-widest block mb-2 italic"><Phone size={12} className="inline mr-1"/> Contact</label>
                    <p className="font-black text-gray-950 text-sm tracking-tight">{profile.phone}</p>
                  </div>
                </div>
              </section>

              <section className="bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10 italic border-b pb-4 flex items-center gap-2"><MapPin size={16} className="text-orange-600"/> Office Address</h3>
                <div className="grid grid-cols-2 gap-8 uppercase italic font-sans font-black">
                  <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Area</p><p className="text-sm tracking-tighter">{profile.area}</p></div>
                  <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">City</p><p className="text-sm tracking-tighter">{profile.city}</p></div>
                  <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">State</p><p className="text-sm tracking-tighter">{profile.state}</p></div>
                  <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Pin</p><p className="text-sm tracking-tighter">{profile.pincode}</p></div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ CSS Animation for Bell */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          100% { transform: rotate(0); }
        }
        .animate-ring { animation: ring 1.5s ease infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default AdminProfile;