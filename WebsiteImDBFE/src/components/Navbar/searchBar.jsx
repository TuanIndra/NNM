import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

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
    window.location.reload();
  };

  const handleWatchlistClick = () => {
    if (!user) {
      navigate("/require-login"); // Chuyển hướng nếu chưa đăng nhập
    } else {
      navigate("/watchlist");
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
        <button onClick={() => navigate("/require-login")} className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md">
          Đăng nhập
        </button>
      )}
    </div>
  );
};

export default SearchBar;
