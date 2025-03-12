import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi parse user từ localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    if (location.pathname === "/watchlist") {
      navigate("/"); // Chuyển về trang chủ nếu đang ở /watchlist
    } else {
      window.location.reload(); // Reload cho các trang khác
    }
  };

  const handleWatchlistClick = () => {
    if (!user) {
      navigate("/require-login", { state: { from: "/watchlist" } }); // Truyền state
    } else {
      navigate("/watchlist");
    }
  };

  // Xử lý nút "Đăng nhập"
  const handleLoginClick = () => {
    if (location.pathname === "/home") {
      navigate("/login"); // Chuyển thẳng đến /login nếu đang ở trang chủ
    } else {
      navigate("/require-login"); // Chuyển đến /require-login nếu ở trang khác
    }
  };

  return (
    <div className="ml-10 flex items-center">
      <input type="text" placeholder="Tìm kiếm" className="bg-gray-700 text-white px-4 py-2 rounded-md" />

      {/* Điều hướng đến Watchlist */}
      <button onClick={handleWatchlistClick} className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md">
        Danh sách xem
      </button>

      {user ? (
        <div className="relative ml-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white font-medium">
            {user.name} ▼
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded-lg shadow-md">
              <button onClick={handleLogout} className="block w-full text-left px-8 py-2 hover:bg-gray-100">
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleLoginClick} className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md">
          Đăng nhập
        </button>
      )}
    </div>
  );
};

export default SearchBar;