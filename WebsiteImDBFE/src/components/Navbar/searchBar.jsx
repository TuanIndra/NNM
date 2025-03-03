import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="ml-10 flex items-center">
      <input type="text" placeholder="Tìm kiếm" className="bg-gray-700 text-white px-4 py-2 rounded-md" />
      <a href="/watchlist" className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md">Danh sách xem</a>

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
        <a href="/login" className="ml-3 text-sm font-medium hover:bg-gray-700 px-3 py-2 rounded-md">Đăng nhập</a>
      )}
    </div>
  );
};

export default SearchBar;
