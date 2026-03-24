import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, MessageCircle } from 'lucide-react';

const SocialSidebar = () => {
  const socialLinks = [
    { id: 1, name: 'WhatsApp', icon: <MessageCircle size={18} />, color: 'bg-green-500', link: 'https://wa.me/917987189304' },
    { id: 2, name: 'Instagram', icon: <Instagram size={18} />, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600', link: '#' },
    { id: 3, name: 'Facebook', icon: <Facebook size={18} />, color: 'bg-blue-600', link: '#' },
    { id: 4, name: 'Twitter', icon: <Twitter size={18} />, color: 'bg-sky-500', link: '#' },
    { id: 5, name: 'YouTube', icon: <Youtube size={18} />, color: 'bg-red-600', link: '#' },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-1">
      {socialLinks.map((social) => (
        <motion.a
          key={social.id}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          // x: -80 desktop par aur mobile par thoda zyada pichhe
          initial={{ x: -75 }} 
          whileHover={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          // Mobile par width (w-24) aur pichhe se spacing (pl-1) ko adjust kiya hai
          className={`flex items-center justify-end gap-3 pr-3 py-2 md:py-3 ${social.color} text-white rounded-r-xl shadow-lg w-28 md:w-36 group cursor-pointer`}
        >
          {/* Label: Sirf hover par dikhega */}
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {social.name}
          </span>
          
          {/* Icon: Ye hamesha kinare par dikhega */}
          <div className="shrink-0 group-hover:scale-110 transition-transform">
            {social.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;