import React from 'react'
import AddOffer from '../Pages/AddOffer'
import Navbar from '../Components/UperNavbar'
import logo from '../Photos/All_India_Travel_Logo_Colorful.png'
const AdminProfile = () => {
    return (
        <div className='w-full px-8 py-2'>
            <Navbar/>
            <div className="flex flex-col md:flex-row flex-wrap gap-6 mt-6  px-4 rounded-lg ">
                {/* Profile Card */}
                <div className="w-full md:w-[40%] h-fit mt-10 p-4 border border-red-800 rounded-xl shadow-md bg-white">
                    <div className="flex flex-col gap-4">
                        <p className="text-base md:text-lg text-gray-800">
                            <span className="font-semibold">Name:</span> Mayank Kori
                        </p>
                        <p className="text-base md:text-lg text-gray-800">
                            <span className="font-semibold">Email:</span> mayank@example.com
                        </p>
                        <p className="text-base md:text-lg text-gray-800">
                            <span className="font-semibold">Phone Number:</span> 123-456-7890
                        </p>
                        <p className="text-base md:text-lg text-gray-800">
                            <span className="font-semibold">Address:</span> Jabalpur, MP
                        </p>

                        <button className="w-full bg-green-700 py-2 rounded-xl text-white font-medium hover:bg-green-800 transition active:scale-95">
                            Update Information
                        </button>
                    </div>
                    
                </div>

                {/* AddOffer Component */}
                <div className="w-full md:w-[55%]">
                    <AddOffer />
                </div>
            </div>







            <div className="w-full flex flex-col gap-5 mt-8">
                <div className="w-full border border-red-700 rounded-xl p-6 shadow-md bg-white">

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm md:text-base text-gray-800 mb-6">
                        <p><span className="font-semibold">Name:</span> Mayank Kori</p>
                        <p><span className="font-semibold">Phone Number:</span> 123-456-7890</p>
                        <p><span className="font-semibold">Email:</span> mayank@example.com</p>

                        <p><span className="font-semibold">Source Address:</span> City A</p>
                        <p><span className="font-semibold">Destination Address:</span> City B</p>
                        <p><span className="font-semibold">Date:</span> 31-07-2025</p>

                        <p><span className="font-semibold">Start Time:</span> 10:00 AM</p>
                        <p><span className="font-semibold">End Time:</span> 2:00 PM</p>
                        <p><span className="font-semibold">Amount:</span> ₹2000</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Pending</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Cancel</button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Confirm</button>
                    </div>
                </div>


                <div className="w-full border border-red-700 rounded-xl p-6 shadow-md bg-white">

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm md:text-base text-gray-800 mb-6">
                        <p><span className="font-semibold">Name:</span> Mayank Kori</p>
                        <p><span className="font-semibold">Phone Number:</span> 123-456-7890</p>
                        <p><span className="font-semibold">Email:</span> mayank@example.com</p>

                        <p><span className="font-semibold">Source Address:</span> City A</p>
                        <p><span className="font-semibold">Destination Address:</span> City B</p>
                        <p><span className="font-semibold">Date:</span> 31-07-2025</p>

                        <p><span className="font-semibold">Start Time:</span> 10:00 AM</p>
                        <p><span className="font-semibold">End Time:</span> 2:00 PM</p>
                        <p><span className="font-semibold">Amount:</span> ₹2000</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Pending</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Cancel</button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Confirm</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminProfile
