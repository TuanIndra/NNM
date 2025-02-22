import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaUsers, FaStar, FaChartBar } from "react-icons/fa";
import logo from '../../assets/logo.png'
const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`h-screen bg-black text-white ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 p-4 relative`}>
            <div className={`flex justify-center mb-6 transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                <a href="#" className="flex-shrink-0">
                <img
                    className="h-8 w-auto"
                    src={logo}
                    alt="IMDb"
                />
                </a>
            </div>

            <nav>
                <ul>
                    <li className="mb-4 flex items-center">
                        <FaFilm className="mr-2 text-[#F5C518]" />
                        {!isCollapsed && <Link to="/admin/movies" className="hover:text-[#F5C518]">Quản lý Phim</Link>}
                    </li>
                    <li className="mb-4 flex items-center">
                        <FaUsers className="mr-2 text-[#F5C518]" />
                        {!isCollapsed && <Link to="/admin/users" className="hover:text-[#F5C518]">Quản lý Người dùng</Link>}
                    </li>
                    <li className="mb-4 flex items-center">
                        <FaStar className="mr-2 text-[#F5C518]" />
                        {!isCollapsed && <Link to="/admin/reviews" className="hover:text-[#F5C518]">Quản lý Đánh giá</Link>}
                    </li>
                    <li className="mb-4 flex items-center">
                        <FaChartBar className="mr-2 text-[#F5C518]" />
                        {!isCollapsed && <Link to="/admin/stats" className="hover:text-[#F5C518]">Thống kê</Link>}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
