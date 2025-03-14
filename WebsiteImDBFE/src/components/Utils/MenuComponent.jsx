import React from "react";
import { FaTimes, FaFilm, FaTv, FaAward, FaUserFriends, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
const menuItems = [
    {
        title: "Movies",
        icon: <FaFilm className="text-yellow-400 mr-2" />,
        links: [
            "Release Calendar",
            "Top 250 Movies",
            "Most Popular Movies",
            "Browse Movies by Genre",
            "Top Box Office",
            "Showtimes & Tickets",
            "Movie News",
            "India Movie Spotlight",
        ],
    },
    {
        title: "TV Shows",
        icon: <FaTv className="text-yellow-400 mr-2" />,
        links: [
            "What's on TV & Streaming",
            "Top 250 TV Shows",
            "Most Popular TV Shows",
            "Browse TV Shows by Genre",
            "TV News",
        ],
    },
    {
        title: "Watch",
        icon: <FaFilm className="text-yellow-400 mr-2" />,
        links: [
            "What to Watch",
            "Latest Trailers",
            "IMDb Originals",
            "IMDb Picks",
            "IMDb Spotlight",
            "IMDb Podcasts",
        ],
    },
    {
        title: "Awards & Events",
        icon: <FaAward className="text-yellow-400 mr-2" />,
        links: [
            "Oscars",
            "SXSW Film Festival",
            "Women's History Month",
            "STARmeter Awards",
            "Awards Central",
            "Festival Central",
            "All Events",
        ],
    },
    {
        title: "Celebs",
        icon: <FaUserFriends className="text-yellow-400 mr-2" />,
        links: ["Born Today", "Most Popular Celebs", "Celebrity News"],
    },
    {
        title: "Community",
        icon: <FaGlobe className="text-yellow-400 mr-2" />,
        links: ["Help Center", "Contributor Zone", "Polls"],
    },
];


const MenuComponent = ({ onClose }) => {
    return (
        <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full max-h-[80vh] bg-black bg-opacity-90 text-white flex flex-col p-10 z-[100] overflow-y-auto" // Thêm max-h và overflow-y
        >
            {/* IMDb Logo & Close Button */}
            <div className="flex justify-between items-center mb-8 px-4">
                <div className="text-3xl font-bold bg-yellow-400 text-black px-3 py-1 rounded">
                    IMDb
                </div>
                <button
                    className="text-yellow-400 text-2xl p-2 hover:bg-yellow-500 hover:text-black rounded-full"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-3 gap-8 min-h-0"> {/* Thêm min-h-0 để grid không vượt quá container */}
                {menuItems.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-bold flex items-center mb-3">
                            {section.icon} {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.links.map((link, i) => (
                                <li key={i} className="text-gray-300 hover:text-white cursor-pointer">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default MenuComponent;