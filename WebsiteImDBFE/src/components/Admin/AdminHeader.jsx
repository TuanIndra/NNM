import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const getPageTitle = () => {
        if (location.pathname.includes("/admin/movies")) return "Quản lý Phim";
        if (location.pathname.includes("/admin/users")) return "Quản lý Người dùng";
        if (location.pathname.includes("/admin/reviews")) return "Quản lý Đánh giá";
        if (location.pathname.includes("/admin/stats")) return "Thống kê";
        return "Admin Dashboard";
    };

    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold text-[#F5C518]">{getPageTitle()}</h1>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="px-3 py-1 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <FaSearch className="absolute right-2 top-2 text-gray-400" />
                </div>
                <FaBell className="text-yellow-400 text-xl cursor-pointer" />
                <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-white text-2xl cursor-pointer" />
                    {userName && <span className="text-white font-semibold">{userName}</span>}
                </div>
                <button
                    className="bg-[#F5C518] text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
