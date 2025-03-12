import React, { useState, useEffect } from 'react';
import { FaStar, FaPlay } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const [watchlists, setWatchlists] = useState([]); // Danh sách watchlist của user
  const [showWatchlist, setShowWatchlist] = useState(false); // Hiển thị popup
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Lấy danh sách watchlist khi nhấn nút
  const fetchWatchlists = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Vui lòng đăng nhập để thêm vào watchlist!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/watchlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải danh sách watchlist');
      }

      const data = await response.json();
      setWatchlists(data.watchlists || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhấn nút "+ Watchlist"
  const handleWatchlistClick = () => {
    fetchWatchlists();
    setShowWatchlist(true);
  };

  // Tạo watchlist mới và thêm phim
  const createAndAddToWatchlist = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    try {
      // Tạo watchlist mới
      const createResponse = await fetch('http://localhost:5000/api/watchlist/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Watchlist mặc định',
          description: 'Watchlist được tạo tự động',
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Không thể tạo watchlist');
      }

      const createData = await createResponse.json();
      const watchlistId = createData.watchlist._id;

      // Thêm phim vào watchlist vừa tạo
      const addResponse = await fetch('http://localhost:5000/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          watchlistId,
          movieId: movie._id, // Giả sử movie có _id từ API
        }),
      });

      if (!addResponse.ok) {
        throw new Error('Không thể thêm phim vào watchlist');
      }

      const addData = await addResponse.json();
      setWatchlists([...watchlists, addData.watchlist]);
      alert('Đã tạo watchlist mới và thêm phim!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm phim vào watchlist đã có
  const addToExistingWatchlist = async (watchlistId) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          watchlistId,
          movieId: movie._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể thêm phim vào watchlist');
      }

      const data = await response.json();
      setWatchlists(watchlists.map(wl => (wl._id === watchlistId ? data.watchlist : wl)));
      alert('Đã thêm phim vào watchlist!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden w-48 relative">
      <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-3 text-white">
        <div className="flex items-center text-yellow-400">
          <FaStar className="mr-1" /> <span>{movie.rating}</span>
        </div>
        <h3 className="text-sm font-bold mt-1 line-clamp-2 min-h-[40px]">{movie.title}</h3>
        <button
          onClick={handleWatchlistClick}
          className="bg-gray-700 text-white text-sm w-full mt-2 py-1 rounded flex items-center justify-center hover:bg-gray-600"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : '+ Watchlist'}
        </button>
        <button className="text-white text-sm w-full mt-2 py-1 rounded flex items-center justify-center">
          <FaPlay className="mr-2" /> Trailer
        </button>

        {/* Popup hiển thị watchlist */}
        {showWatchlist && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/90 p-3 rounded-lg text-white z-10">
            <h4 className="text-sm font-bold mb-2">Thêm vào Watchlist</h4>
            {error ? (
              <p className="text-red-500 text-xs">{error}</p>
            ) : watchlists.length > 0 ? (
              <ul className="text-xs space-y-2 max-h-40 overflow-y-auto">
                {watchlists.map((wl) => (
                  <li key={wl._id} className="flex justify-between items-center">
                    <span>{wl.name}</span>
                    <button
                      onClick={() => addToExistingWatchlist(wl._id)}
                      className="text-blue-400 hover:underline"
                      disabled={loading}
                    >
                      Thêm
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <button
                onClick={createAndAddToWatchlist}
                className="text-blue-400 text-xs hover:underline"
                disabled={loading}
              >
                Tạo watchlist mới và thêm phim
              </button>
            )}
            <button
              onClick={() => setShowWatchlist(false)}
              className="mt-2 text-blue-400 text-xs hover:underline"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;