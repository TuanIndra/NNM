import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(""); // State lưu từ khóa tìm kiếm
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

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?query=${query}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    if (location.pathname === "/watchlist") {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  const handleWatchlistClick = () => {
    if (!user) {
      navigate("/require-login", { state: { from: "/watchlist" } });
    } else {
      navigate("/watchlist");
    }
  };

  const handleLoginClick = () => {
    if (location.pathname === "/home") {
      navigate("/login");
    } else {
      navigate("/require-login");
    }
  };

  return (
    <div className="ml-10 flex items-center">
      {/* Ô nhập tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch} // Bắt sự kiện Enter
        className="bg-gray-700 text-white px-4 py-2 rounded-md"
      />

      {/* Điều hướng đến Watchlist */}
      <button
        onClick={handleWatchlistClick}
        className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md"
      >
        Danh sách xem
      </button>

      {user ? (
        <div className="relative ml-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white font-medium">
            {user.name} ▼
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-md w-32 z-50">
              <button className="block w-full text-left px-6 py-2 hover:bg-gray-100 whitespace-nowrap">
                Hồ sơ
              </button>
              <button className="block w-full text-left px-6 py-2 hover:bg-gray-100 whitespace-nowrap">
                Cài đặt
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-6 py-2 hover:bg-gray-100 whitespace-nowrap"
              >
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
