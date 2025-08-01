import React from 'react'
import UperNavbar from '../Components/UperNavbar'
import CoverflowSlider from '../Components/CoverflowSlider';
import HeroSection from '../Components/HeroSection';

const OurServices = () => {
  return (
    <div>
      <UperNavbar/>
      <HeroSection/>
      <CoverflowSlider/>

      <div className=" px-10">
        <h1 className='text-orange-500 text-2xl italic font-bold'>We Have some More Online Services</h1>
      </div>
    </div>
  )
}

export default OurServices

