import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaUsers, FaStar, FaChartBar, FaBars, FaGripLines, FaCog } from "react-icons/fa";
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    return (
        <div className={`h-screen bg-gray-900 text-white ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 p-4 relative shadow-lg`}>
            <div className="flex justify-between items-center mb-6">
                {!isCollapsed && (
                    <a href="#">
                        <img className="h-8 w-auto" src={logo} alt="IMDb" />
                    </a>
                )}
                <button className="text-yellow-400 text-xl" onClick={toggleSidebar}>
                    {isCollapsed ? <FaBars /> : <FaBars />}
                </button>
            </div>

            <nav>
                <ul>
                    <li className="mb-4 flex items-center hover:bg-gray-800 p-2 rounded">
                        <Link to="/admin/movies" className="flex items-center w-full text-white hover:text-yellow-400">
                            <FaFilm className="mr-2 text-yellow-400" />
                            {!isCollapsed && <span>Quản lý Phim</span>}
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center hover:bg-gray-800 p-2 rounded">
                        <Link to="/admin/users" className="flex items-center w-full text-white hover:text-yellow-400">
                            <FaUsers className="mr-2 text-yellow-400" />
                            {!isCollapsed && <span>Quản lý Người dùng</span>}
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center hover:bg-gray-800 p-2 rounded">
                        <Link to="/admin/genres" className="flex items-center w-full text-white hover:text-yellow-400">
                            <FaUsers className="mr-2 text-yellow-400" />
                            {!isCollapsed && <span>Quản lý Thể loại</span>}
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center hover:bg-gray-800 p-2 rounded">
                        <Link to="/admin/reviews" className="flex items-center w-full text-white hover:text-yellow-400">
                            <FaStar className="mr-2 text-yellow-400" />
                            {!isCollapsed && <span>Quản lý Đánh giá</span>}
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center hover:bg-gray-800 p-2 rounded">
                        <Link to="/admin/stats" className="flex items-center w-full text-white hover:text-yellow-400">
                            <FaChartBar className="mr-2 text-yellow-400" />
                            {!isCollapsed && <span>Thống kê</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                <button className="text-yellow-400 text-xl" onClick={toggleSettings}><FaCog /></button>
                {!isCollapsed && <span>Cài đặt</span>}
            </div>

            {isSettingsOpen && (
                <div className="absolute bottom-16 left-4 bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-yellow-400 font-semibold mb-2">Tùy chỉnh Sidebar</h3>
                    <div className="flex space-x-2">
                        <button className="w-6 h-6 bg-blue-500 rounded-full"></button>
                        <button className="w-6 h-6 bg-green-500 rounded-full"></button>
                        <button className="w-6 h-6 bg-red-500 rounded-full"></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSidebar;