import React, { useState, useEffect } from 'react';
import { PlayCircle, ThumbsUp, Heart } from 'lucide-react';
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const UpNext = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies?page=1&limit=10');
        if (!response.ok) {
          throw new Error('Không thể tải danh sách phim');
        }
        const data = await response.json();

        // Access data.movies instead of data directly
        const sortedMovies = data.movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const upNextData = sortedMovies.slice(0, 3).map(movie => ({
          _id: movie._id,
          thumbnail: movie.poster || 'https://via.placeholder.com/150',
          duration: 'N/A', // Update this if duration is added to the schema
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

  const handleNavigateToDetail = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSeeMore = () => {
    navigate('/search?query=latest'); // Navigate to a full movies list page
  };
  
  return (
    <div className="bg-[#121212] text-white p-4 rounded-lg w-120 h-[500px] flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-blue-500">Up next</h2>
      {loading ? (
        <p className="text-white">Đang tải phim...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-400">Không có phim nào để hiển thị</p>
      ) : (
        <div className="space-y-4 flex-1">
          {videos.map((video) => (
            <div
              key={video._id}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 rounded-md p-2 transition"
              onClick={() => handleNavigateToDetail(video._id)}
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
          <button
            onClick={handleSeeMore}
            className="text-white flex items-center hover:text-orange-300 cursor-pointer text-xl font-bold mt-auto"
          >
            Xem thêm
            <MdOutlineNavigateNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpNext;