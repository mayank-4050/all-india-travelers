import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

// Assets
import backgroundImg from '/Photos/all india travels.png';
import insta from '/Photos/insta.png';
import whatsapp from '/Photos/whatsapp.png';
import facebook from '/Photos/facebook.png';
import twiter from '/Photos/twiter.png';
import Linkedin from '/Photos/Linkedin.png';
import visting from '/Photos/visting.jpg';
import footerImg from '/Photos/footerImg.jpg';
import Footerlogo from '/Photos/allindiatravelsback.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const usefulLinks = [
        { text: 'About Us', path: '/about' },
        { text: 'Contact Us', path: '/contactus' },
        { text: 'Enquiry', path: '/enquiry' },
        { text: 'Cancellation', path: '/cancellation' },
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms & Condition', path: '/terms' },
    ];

    const services = [
        { text: 'View Offer', path: '/todayoffer' },
        { text: 'Process', path: '/process' },
        { text: 'Registration', path: '/register' },
        { text: 'Train Booking', path: '/railwayticket' },
        { text: 'Flight Booking', path: '/flightticket' },
    ];

    return (
        <footer className="relative w-full bg-gray-950 pt-16 overflow-hidden">
            {/* Background Texture Overlay */}
            <div 
                className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain pointer-events-none"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                    
                    {/* 1. Brand Profile */}
                    <div className="space-y-6">
                        <img className='w-48 h-auto brightness-110' src={Footerlogo} alt="All India Travels" />
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-gray-400 group">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                                <p className="text-sm leading-relaxed group-hover:text-white transition">
                                    Anshika Online Siddh Baba Road, <br />
                                    Lalmati, Jabalpur, M.P. 482001
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 group">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <p className="text-sm group-hover:text-white transition">+91 7987189304</p>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 group">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <p className="text-sm group-hover:text-white transition break-all">allindiatrevls6607@gmail.com</p>
                            </div>
                        </div>
                        
                        {/* Social Icons with Pulse Effect */}
                        <div className="flex gap-4 pt-2">
                            {[whatsapp, insta, Linkedin, twiter, facebook].map((img, idx) => (
                                <a key={idx} href="#" className="transform hover:scale-125 transition-all duration-300 hover:-translate-y-1">
                                    <img className='w-7 h-7 object-contain rounded-full shadow-lg shadow-black/50' src={img} alt="Social" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h2 className='text-white font-bold text-lg mb-8 relative inline-block'>
                            USEFUL LINKS
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
                        </h2>
                        <ul className="space-y-3">
                            {usefulLinks.map((link, i) => (
                                <li key={i}>
                                    <NavLink to={link.path} className="text-gray-400 hover:text-orange-400 text-sm flex items-center gap-2 group transition-all">
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Our Services */}
                    <div>
                        <h2 className='text-white font-bold text-lg mb-8 relative inline-block'>
                            OUR SERVICES
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
                        </h2>
                        <ul className="space-y-3">
                            {services.map((link, i) => (
                                <li key={i}>
                                    <NavLink to={link.path} className="text-gray-400 hover:text-orange-400 text-sm flex items-center gap-2 group transition-all">
                                        <Globe className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Business Card & Trust */}
                    <div className="space-y-6">
                        <h2 className='text-white font-bold text-lg mb-8 relative inline-block'>
                            OFFICIAL CARD
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
                        </h2>
                        <div className="relative group overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                            <img 
                                className='w-full h-auto transform group-hover:scale-110 transition duration-700' 
                                src={visting} 
                                alt="Visiting Card" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <span className="text-white text-xs font-bold bg-orange-600 px-4 py-2 rounded-full shadow-lg">VIEW CARD</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 italic text-center">Certified & Trusted Travel Partner Since 2020</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {currentYear} <span className="text-orange-500 font-bold">All India Travels</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Secure Booking</span>
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Verified Service</span>
                    </div>
                </div>
            </div>

            {/* Visual Footer Strip */}
            <div className="w-full">
                <img src={footerImg} alt="Footer Aesthetic" className="w-full h-auto opacity-80" />
            </div>
        </footer>
    );
};

export default Footer;