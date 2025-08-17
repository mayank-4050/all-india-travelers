import React from 'react'
import Navbar from '../Components/UperNavbar'
import { NavLink } from 'react-router-dom'

const AdvanceConAdmin = () => {
    return (
        <div className='w-full'>
            <div className="flex items-center flex-col">
                <Navbar />
                <div className="w-[50%] flex flex-col justify-center items-center p-10 border-2 rounded-xl mt-10">
                    <p className='bg-blue-300 text-blue-700 mb-5 px-3 py-1 rounded border-2'>If Customer Paid Advance Click "Yes" OtherWise "No"</p>
                    <form>
                        <div className="flex flex-col gap-5">
                            <input type='text' className='px-3 py-1 rounded w-70 border' placeholder='Enter Advance Amount'></input>
                            <div className="flex gap-2 justify-center">
                                <NavLink to='/onewaydutyslip'>
                                    <button className='bg-green-600 px-5 text-white rounded cursor-pointer active:scale-95'>Yes</button>
                                </NavLink>
                                <NavLink to='/onewaydutyslip'>
                                    <button className='bg-red-600 px-5 text-white rounded cursor-pointer active:scale-95'>No</button>
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdvanceConAdmin
