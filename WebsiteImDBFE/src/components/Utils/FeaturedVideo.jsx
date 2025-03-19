import React, { useState } from 'react';
import { FaPlay, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FeaturedVideos = ({ movies = [] }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    // Lấy 8 phim có đánh giá trung bình cao nhất, tương tự Banner
    const topMovies = movies
        .map(movie => ({
            ...movie,
            averageRating: parseFloat(movie.rating) || 0,
            id: movie._id,
            bannerImage: movie.bannerImage || "https://picsum.photos/1200/500", // Fallback như Banner
            title: movie.title,
        }))
        .sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            return b.id.localeCompare(a.id);
        })
        .slice(0, 8); // Chỉ lấy 8 phim cao nhất

    // Tính tổng số trang (mỗi trang 3 phim)
    const moviesPerPage = 3;
    const totalPages = Math.ceil(topMovies.length / moviesPerPage);

    // Lấy 3 phim (hoặc ít hơn) cho trang hiện tại
    const startIndex = currentPage * moviesPerPage;
    const featuredMovies = topMovies.slice(startIndex, startIndex + moviesPerPage);

    // Xử lý khi nhấn nút mũi tên
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNavigateToTrailer = (movieId) => {
        navigate(`/movie/${movieId}`);
    };
    // Xử lý lỗi ảnh như trong Banner
    const handleImageError = (e) => {
        e.target.src = "https://picsum.photos/1200/500"; // Fallback ảnh
        e.target.onerror = null; // Ngăn lặp lại lỗi
    };

    return (
        <div className="w-full bg-black text-white p-5">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-yellow-500 mb-1">Featured Videos</h2>
            <p className="text-gray-400 text-sm mb-4">
                {featuredMovies.length > 0 
                    ? `Showing ${startIndex + 1} - ${startIndex + featuredMovies.length} of ${topMovies.length}`
                    : "No featured movies"}
            </p>

            {/* Grid hiển thị video */}
            <div className="flex items-center space-x-4 overflow-x-hidden">
                {/* Nút mũi tên trái */}
                {currentPage > 0 && (
                    <div className="flex items-center justify-center mr-4">
                        <button 
                            className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700"
                            onClick={handlePrevPage}
                        >
                            <FaChevronLeft className="text-white" />
                        </button>
                    </div>
                )}

                {/* Danh sách phim */}
                {featuredMovies.length > 0 ? (
                    featuredMovies.map((video, index) => (
                        <div
                            key={index}
                            className="flex-1 bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:bg-[#121212] hover:cursor-pointer min-w-0"
                            onClick={() => handleNavigateToTrailer(video.id)}
                        >
                            {/* Ảnh video */}
                            <div className="relative">
                                <img 
                                    src={video.bannerImage} 
                                    alt={video.title} 
                                    className="w-full h-44 object-cover" 
                                    onError={handleImageError} // Xử lý lỗi ảnh như Banner
                                />
                                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                                    <FaPlay className="mr-1 text-yellow-400" /> {video.duration}
                                </div>
                            </div>

                            {/* Nội dung */}
                            <div className="p-3">
                                <h3 className="text-sm font-bold">{video.title}</h3>
                                <p className="text-gray-400 text-xs">{video.subtitle}</p>

                                {/* Hiển thị đánh giá trung bình */}
                                <div className="flex items-center text-gray-400 text-xs mt-2 space-x-4">
                                    <span className="flex items-center">
                                        ⭐ {video.averageRating.toFixed(1)} / 10
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">
                        {movies.length === 0 ? "Đang tải phim..." : "Không có phim nào để hiển thị."}
                    </p>
                )}

                {/* Nút mũi tên phải */}
                {topMovies.length > moviesPerPage && currentPage < totalPages - 1 && (
                    <div className="flex items-center justify-center ml-4">
                        <button 
                            className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700"
                            onClick={handleNextPage}
                        >
                            <FaChevronRight className="text-white" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedVideos;