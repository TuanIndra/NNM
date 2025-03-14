import React, { useState, useEffect } from 'react';
import { PlayCircle, ThumbsUp, Heart } from 'lucide-react';
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate

const UpNext = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) {
          throw new Error('Không thể tải danh sách phim');
        }
        const data = await response.json();

        // Sắp xếp phim theo createdAt (mới nhất lên đầu)
        const sortedMovies = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Lấy 3 phim mới nhất và ánh xạ dữ liệu
        const upNextData = sortedMovies.slice(0, 3).map(movie => ({
          _id: movie._id, // Giữ _id để chuyển hướng
          thumbnail: movie.poster || 'https://via.placeholder.com/150',
          duration: 'N/A',
          title: movie.title,
          subtitle: `${movie.director} • ${movie.releaseYear}`,
          likes: movie.ratings ? movie.ratings.length : 0,
          reactions: movie.comments ? movie.comments.length : 0,
        }));

        setVideos(upNextData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Hàm xử lý chuyển hướng khi nhấn vào phim
  const handleNavigateToDetail = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="bg-[#121212] text-white p-4 rounded-lg w-120 h-[500px]">
      <h2 className="text-lg font-bold mb-4 text-blue-500">Up next</h2>
      {loading ? (
        <p className="text-white">Đang tải phim...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 rounded-md p-2 transition" // Thêm hover effect
              onClick={() => handleNavigateToDetail(video._id)} // Chuyển hướng khi nhấn
            >
              <div className="relative w-20 h-28 flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
                <PlayCircle className="absolute inset-0 m-auto text-white w-6 h-6 opacity-80" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold truncate">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.subtitle}</p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{video.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{video.reactions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <a
            href="#"
            className="text-white flex items-center left-2 bottom-0 hover:text-orange-300 cursor-pointer text-xl font-bold"
          >
            Xem thêm
            <MdOutlineNavigateNext />
          </a>
        </div>
      )}
    </div>
  );
};

export default UpNext;