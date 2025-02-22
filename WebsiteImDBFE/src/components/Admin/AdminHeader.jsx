import { useNavigate, useLocation } from "react-router-dom";

const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/"); 
    };

    // Xác định tiêu đề dựa vào đường dẫn
    const getPageTitle = () => {
        if (location.pathname.includes("/admin/movies")) return "Quản lý Phim";
        if (location.pathname.includes("/admin/users")) return "Quản lý Người dùng";
        if (location.pathname.includes("/admin/reviews")) return "Quản lý Đánh giá";
        if (location.pathname.includes("/admin/stats")) return "Thống kê";
        return "Admin Dashboard"; // Mặc định
    };

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#F5C518]">{getPageTitle()}</h1>
            <button 
                className="bg-[#F5C518] text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400"
                onClick={handleLogout}
            >
                Đăng xuất
            </button>
        </header>
    );
};

export default AdminHeader;
