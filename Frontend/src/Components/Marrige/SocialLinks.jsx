import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaSms } from "react-icons/fa";

const SocialLinks = () => {
    return (
        <div className="flex justify-center gap-4 mt-6">

            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition"
            >
                <FaFacebookF size={18} />
            </a>

            <a
                href="https://chatgpt.com/c/69ad03ca-1f48-8321-963d-c83a5ceb64c3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white p-3 rounded-full hover:scale-110 transition"
            >
                <FaInstagram size={18} />
            </a>

            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 text-white p-3 rounded-full hover:scale-110 transition"
            >
                <FaTwitter size={18} />
            </a>

            <a
                href="https://wa.me/919301858537"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition"
            >
                <FaWhatsapp size={18} />
            </a>
            <a
                href="tel:9301858537"
                className="bg-blue-500 text-white p-3 rounded-full"
            >
                <FaPhone />
            </a>
            <a
                href="sms:8982844050?body=I%20want%20to%20book%20a%20wedding%20car"
                className="bg-blue-500 text-white p-3 rounded-full hover:scale-110 transition"
            >
                <FaSms size={18} />
            </a>

        </div>
    );
};

export default SocialLinks;