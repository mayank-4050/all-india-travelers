// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome to your profile</h2>
      {user && (
        <div className="text-gray-700 space-y-2">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
