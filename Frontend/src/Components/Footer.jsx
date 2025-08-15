import React from 'react';
import backgroundImg from '../Photos/travelLogo.png';
import Footerlogo from '../Photos/All_India_Travel_Logo_Colorful.png';
import insta from '../Photos/insta.png';
import whatsapp from '../Photos/whatsapp.png';
import facebook from '../Photos/facebook.png';
import twiter from '../Photos/twiter.png'
import Linkedin from '../Photos/linkedin.png';
import visting from '../Photos/visting.jpg';
import footerImg from '../Photos/footerImg.jpg'

const Footer = () => {
    return (
        <div className="">
            <div className="relative w-full py-20 mt-20 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-contain"
                    style={{
                        backgroundImage: `url(${backgroundImg})`,
                    }}
                ></div>

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-90"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center h-full text-white">
                    <div className="w-[90%] h-fit flex flex-col lg:flex-row gap-10">
                        {/* Left Section */}
                        <div className="w-full lg:w-[30%] flex flex-col">
                            <img className='w-[50%] h-auto' src={Footerlogo} alt="Footer Logo" />
                            <p className='text-gray-500 mt-2'>Anshika Online Siddh Baba Road Lalmati Jabalpur M.P. 482001</p>
                            <span className='text-gray-500'>7987189304</span>
                            <span className='text-gray-500'>allindiatrevls6607@gmail.com</span>
                            <div className="flex gap-3 mt-5">
                                <img className='w-7' src={whatsapp} alt="Whatsapp" />
                                <img className='w-7' src={insta} alt="Instagram" />
                                <img className='w-7' src={Linkedin} alt="Linkedin" />
                                <img className='w-7' src={twiter} alt="Twitter" />
                                <img className='w-7' src={facebook} alt="Facebook" />
                            </div>
                        </div>

                        {/* Useful Links */}
                        <div className="w-full lg:w-[20%] flex flex-col py-7">
                            <h2 className='font-bold mb-5'>USEFUL LINKS</h2>
                            {[
                                'About Us',
                                'Contact Us',
                                'Enquiry',
                                'Cancellation',
                                'Privacy policy',
                                'Terms & condition',
                                'Disclaimer'
                            ].map((text, i) => (
                                <span key={i} className='text-gray-500'>
                                    <i className="fa-solid fa-hand-point-right text-sm mr-1"></i> {text}
                                </span>
                            ))}
                        </div>

                        {/* Services */}
                        <div className="w-full lg:w-[20%] flex flex-col py-7">
                            <h2 className='font-bold mb-5'>SERVICES</h2>
                            {[
                                'View Offer',
                                'Process',
                                'Registration',
                                'Online Services',
                                'Train Booking',
                                'flight Booking'
                            ].map((text, i) => (
                                <span key={i} className='text-gray-500'>
                                    <i className="fa-solid fa-hand-point-right text-sm mr-1"></i> {text}
                                </span>
                            ))}
                        </div>

                        {/* Visiting Image */}
                        <div className="w-full lg:w-[30%]">
                            <img className='w-full h-auto mt-5 lg:mt-15' src={visting} alt="Visiting" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border border-white h-20"></div>
            <div className="">
                <img src={footerImg}></img>
            </div>
        </div>
    );
};

export default Footer;
