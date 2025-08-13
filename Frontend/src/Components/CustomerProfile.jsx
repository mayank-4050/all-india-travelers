import React, { useState, useEffect } from 'react';
import Navbar from './UperNavbar';

const CustomerProfile = () => {
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

  // --- helpers ---
  const normalize = (s) => String(s || '').trim().toLowerCase();
  const getId = (b) => b?._id || b?.id || b?.bookingId;

  // Customer-facing display mapping
  const displayStatusForCustomer = (status) => {
    const s = normalize(status);
    if (s === 'cancelled by the customer') return 'Cancellation Pending';
    if (s === 'cancelled') return 'Canceled';
    if (s === 'confirmed') return 'Confirmed';
    if (s === 'pending') return 'Pending';
    return status || 'Pending';
  };

  const statusBadgeClass = (status) => {
    const s = normalize(status);
    if (s === 'confirmed') return 'bg-green-100 text-green-800';
    if (s === 'cancelled' || s === 'cancelled by the customer') return 'bg-red-100 text-red-800';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not provided';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPickupTime = (booking) => {
    if (!booking) return 'Not provided';

    const candidates = [
      booking.pickupTime,
      booking.time,
      booking.startTime,
      booking.journey?.pickupTime,
      booking.journey?.time,
      booking.journey?.startTime,
      booking.pickup_time,
      booking.timeSlot
    ];

    for (const c of candidates) {
      if (c && String(c).trim() !== '') return String(c);
    }

    const dateCandidate = booking.pickupDate || booking.date || booking.journey?.pickupDate || booking.journey?.date;
    if (dateCandidate) {
      const d = new Date(dateCandidate);
      if (!Number.isNaN(d.getTime())) {
        const hours = d.getHours();
        const minutes = d.getMinutes();
        if (hours !== 0 || minutes !== 0) {
          return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        }
      }
    }

    return 'Not provided';
  };

  const getFrom = (booking) =>
    booking?.from || booking?.journey?.from || booking?.pickupLocation || booking?.origin || '';
  const getTo = (booking) =>
    booking?.to || booking?.journey?.to || booking?.dropLocation || booking?.destination || '';

  // (kept for completeness; not used for this task)
  const confirmBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/confirm`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to confirm booking');

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          getId(booking) === bookingId ? { ...booking, status: 'confirmed' } : booking
        )
      );
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  // ✅ Customer cancel → DB: "cancelled by the customer" ; UI (customer): "Cancellation Pending"
  const handleCancelByCustomer = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PUT', // customer-facing status update route in your backend
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled by the customer' })
      });

      if (!response.ok) {
        console.error('Failed to cancel booking');
        return;
      }

      // You can read the updated doc from response if needed:
      // const updated = await response.json();

      // Optimistic UI: set to "cancelled by the customer" (customer screen will show "Cancellation Pending")
      setBookings(prev =>
        prev.map(b =>
          getId(b) === bookingId ? { ...b, status: 'cancelled by the customer' } : b
        )
      );
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const profileRes = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!profileRes.ok) throw new Error('Failed to fetch profile');
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

        const bookingsRes = await fetch('http://localhost:5000/api/bookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!bookingsRes.ok) {
          console.warn('Bookings fetch returned not OK, trying /api/bookings/my...');
          const altRes = await fetch('http://localhost:5000/api/bookings/my', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          if (altRes.ok) {
            const altData = await altRes.json();
            setBookings(
              Array.isArray(altData)
                ? altData.map(booking => ({ ...booking, status: normalize(booking.status) || 'pending' }))
                : (altData.bookings || altData.data || []).map(booking => ({ ...booking, status: normalize(booking.status) || 'pending' }))
            );
          } else {
            console.warn('Alternative bookings endpoint also failed');
            setBookings([]);
          }
          return;
        }

        const bookingsData = await bookingsRes.json();
        if (Array.isArray(bookingsData)) {
          setBookings(bookingsData.map(booking => ({ ...booking, status: booking.status || 'pending' })));
        } else if (bookingsData.bookings) {
          setBookings(bookingsData.bookings.map(booking => ({ ...booking, status: booking.status || 'pending' })));
        } else if (bookingsData.data) {
          setBookings(bookingsData.data.map(booking => ({ ...booking, status: booking.status || 'pending' })));
        } else if (bookingsData.result) {
          setBookings(bookingsData.result.map(booking => ({ ...booking, status: booking.status || 'pending' })));
        } else {
          setBookings(bookingsData ? [{ ...bookingsData, status: bookingsData.status || 'pending' }] : []);
        }
      } catch (error) {
        console.error('Error fetching profile or bookings:', error);
      }
    };

    fetchProfileAndBookings();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-orange-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Customer Profile</h1>
            <p className="text-orange-100">Manage your personal information</p>
            {profile.createdAt && (
              <p className="mt-2 text-sm text-orange-200">
                Account Created On: {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

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
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Ride History
            </h2>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const id = getId(booking);
                const statusDisplay = displayStatusForCustomer(booking.status);
                return (
                  <div key={id || index} className="border-b py-4">
                    <div className="mb-2">
                      <p className="font-medium">From: {getFrom(booking)}</p>
                      <p className="font-medium">To: {getTo(booking)}</p>
                      <p className="text-gray-500">
                        Date: {formatDate(booking.pickupDate || booking.date || booking.journey?.pickupDate)}
                      </p>
                      <p className="text-gray-500">Pickup Time: {getPickupTime(booking)}</p>
                      <p className="text-gray-500">
                        Total Amount: ₹{booking.totalAmount || booking.journey?.totalAmount || booking.amount || '0'}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={`px-2 py-1 rounded-full text-xs ${statusBadgeClass(booking.status)}`}>
                          {statusDisplay}
                        </span>
                      </p>
                    </div>

                    {/* Only ONE button: Cancel Booking 
                        Show when status is pending or confirmed */}
                    {['pending', 'confirmed'].includes(normalize(booking.status)) && (
                      <button
                        onClick={() => handleCancelByCustomer(id)}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-car text-4xl mb-2"></i>
                <p>No ride history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
