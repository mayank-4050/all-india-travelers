import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center  h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700">You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized; // ✅ This is the missing piece
