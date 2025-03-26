import React from "react";
import { FaTimes, FaFilm, FaTv, FaAward, FaUserFriends, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const menuItems = [
    {
        title: "Phim",
        icon: <FaFilm className="text-yellow-400 mr-2" />,
        links: [
            "Lịch phát hành",
            "Top 250 phim",
            "Phim phổ biến nhất",
            "Duyệt phim theo thể loại",
            "Doanh thu phòng vé cao nhất",
            "Lịch chiếu & Vé",
            "Tin tức phim",
            "Tiêu điểm phim Ấn Độ",
        ],
    },
    {
        title: "Chương trình TV",
        icon: <FaTv className="text-yellow-400 mr-2" />,
        links: [
            "Có gì trên TV & Streaming",
            "Top 250 chương trình TV",
            "Chương trình TV phổ biến nhất",
            "Duyệt chương trình TV theo thể loại",
            "Tin tức TV",
        ],
    },
    {
        title: "Xem",
        icon: <FaFilm className="text-yellow-400 mr-2" />,
        links: [
            "Xem gì",
            "Trailer mới nhất",
        ],
    },
    {
        title: "Giải thưởng & Sự kiện",
        icon: <FaAward className="text-yellow-400 mr-2" />,
        links: [
            "Oscars",
            "Liên hoan phim SXSW",
            "Tháng lịch sử phụ nữ",
            "Giải thưởng STARmeter",
            "Trung tâm giải thưởng",
            "Trung tâm liên hoan",
            "Tất cả sự kiện",
        ],
    },
    {
        title: "Người nổi tiếng",
        icon: <FaUserFriends className="text-yellow-400 mr-2" />,
        links: [
            "Sinh ngày hôm nay",
            "Người nổi tiếng phổ biến nhất",
            "Tin tức người nổi tiếng",
        ],
    },
    {
        title: "Cộng đồng",
        icon: <FaGlobe className="text-yellow-400 mr-2" />,
        links: [
            "Trung tâm trợ giúp",
            "Khu vực đóng góp",
            "Thăm dò ý kiến",
        ],
    },
];

const MenuComponent = ({ onClose }) => {
    return (
        <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 text-white flex flex-col p-10 z-[1000]"
        >
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

            <div className="grid grid-cols-3 gap-8 overflow-y-auto flex-1 scrollbar-hide">
                {menuItems.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-bold flex items-center mb-3">
                            {section.icon} {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.links.map((link, i) => (
                                <li key={i} className="text-gray-300 hover:text-white cursor-pointer">
                                    <Link
                                        to={`/menu-results?type=${encodeURIComponent(section.title.toLowerCase().replace(" ", ""))}&query=${encodeURIComponent(link)}`}
                                        onClick={onClose}
                                    >
                                        {link}
                                    </Link>
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