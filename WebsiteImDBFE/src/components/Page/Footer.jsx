import React from "react";
import { FaTiktok, FaInstagram, FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";

const Footer = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage

    return (
        <footer className="bg-black text-white py-6 text-center">
            {/* Đăng nhập - Chỉ hiển thị nếu chưa đăng nhập */}
            {!user && (
                <a
                    href="/login"
                    className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-md mb-5 hover:bg-yellow-500 transition"
                >
                    Sign in for more access
                </a>
            )}

            {/* Social Media & QR Code */}
            <div className="flex justify-center space-x-8 mb-6 mt-6">
                {/* Follow We Website */}
                <div className="border border-gray-600 rounded-lg px-6 py-3 flex items-center space-x-4">
                    <span className="text-gray-300 text-sm">Follow We Website on social</span>
                    <FaTiktok className="text-white text-xl hover:text-gray-400 cursor-pointer" />
                    <FaInstagram className="text-white text-xl hover:text-gray-400 cursor-pointer" />
                    <FaXTwitter className="text-white text-xl hover:text-gray-400 cursor-pointer" />
                    <FaYoutube className="text-white text-xl hover:text-gray-400 cursor-pointer" />
                    <FaFacebook className="text-white text-xl hover:text-gray-400 cursor-pointer" />
                </div>

                {/* QR Code */}
                <div className="border border-gray-600 rounded-lg px-6 py-3">
                    <span className="text-gray-300 text-sm block">Get the We Website app</span>
                    <span className="text-gray-500 text-xs">For Android and iOS</span>
                </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center space-x-4 text-gray-400 text-sm mb-5">
                <a href="#" className="hover:underline">Help</a>
                <a href="#" className="hover:underline">Site Index</a>
                <a href="#" className="hover:underline">We Website Pro</a>
                <a href="#" className="hover:underline">Box Office Mojo</a>
                <a href="#" className="hover:underline">License We Website Data</a>
                <a href="#" className="hover:underline">Press Room</a>
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Jobs</a>
                <a href="#" className="hover:underline">Conditions of Use</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
            </div>

            {/* Amazon Logo */}
            <p className="text-gray-400 text-sm">
                an <span className="text-white font-bold">amazon</span> company
            </p>

            {/* Copyright */}
            <p className="text-gray-500 text-xs mt-2">© 1990-2025 by We Website, Inc.</p>
        </footer>
    );
};

export default Footer;