import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import Navbar from '../Navbar/Navbar'
const RequireLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin location
  const from = location.state?.from || "/home"; // Mặc định là /home nếu không có from

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Bạn cần đăng nhập để tiếp tục</h1>
      <p className="text-gray-400 mb-6">Vui lòng đăng nhập để sử dụng tính năng này.</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Đăng nhập ngay
      </button>
    </div>
    </div>
    
  );
};0

export default RequireLogin;