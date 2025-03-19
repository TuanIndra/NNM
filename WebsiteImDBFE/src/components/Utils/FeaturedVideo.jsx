import React from 'react';
import { FaPlay, FaChevronRight, FaRegThumbsUp, FaRegHeart } from 'react-icons/fa';

const FeaturedVideos = ({ movies = [] }) => {
    console.log("Movies nhận được trong FeaturedVideos:", movies); // Thêm log để kiểm tra movies đầu vào

    // Sắp xếp phim theo đánh giá trung bình giảm dần và lấy 7 phim đầu tiên
    const featuredMovies = movies
        .map(movie => ({
            ...movie,
            averageRating: parseFloat(movie.rating) || 0 // Chuyển rating thành số, mặc định 0 nếu không hợp lệ
        }))
        .sort((a, b) => b.averageRating - a.averageRating) // Sắp xếp giảm dần
        .slice(0, 7) // Lấy 7 phim đầu tiên
        .map(movie => ({
            title: movie.title,
            subtitle: "N/A", // Có thể thay bằng dữ liệu khác như năm phát hành nếu có
            duration: "N/A", // Có thể thêm trường duration vào schema nếu cần
            image: movie.image,
            likes: Math.floor(Math.random() * 1000), // Giả lập số lượt thích
            hearts: Math.floor(Math.random() * 500), // Giả lập số lượt yêu thích
        }));

    console.log("FeaturedMovies sau khi lọc:", featuredMovies); // Thêm log để kiểm tra kết quả lọc

    return (
        <div className="w-full bg-black text-white p-5">
            <h2 className="text-xl font-bold text-yellow-500 mb-1">Featured Videos</h2>
            <p className="text-gray-400 text-sm mb-4">
                {featuredMovies.length > 0 
                    ? `Playing ${featuredMovies.length} of ${movies.length}` 
                    : "No featured movies"}
            </p>

            <div className="flex space-x-4 overflow-x-auto">
                {featuredMovies.length > 0 ? (
                    featuredMovies.map((video, index) => (
                        <div
                            key={index}
                            className="w-80 bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:bg-[#121212] hover:cursor-pointer"
                        >
                            <div className="relative">
                                <img src={video.image} alt={video.title} loading="lazy" className="w-full h-44 object-cover" />
                                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                                    <FaPlay className="mr-1 text-yellow-400" /> {video.duration}
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-bold">{video.title}</h3>
                                <p className="text-gray-400 text-xs">{video.subtitle}</p>
                                <div className="flex items-center text-gray-400 text-xs mt-2 space-x-4">
                                    <span className="flex items-center">
                                        <FaRegThumbsUp className="mr-1" /> {video.likes}
                                    </span>
                                    <span className="flex items-center">
                                        <FaRegHeart className="mr-1 text-pink-400" /> {video.hearts}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">Không có phim nào để hiển thị.</p>
                )}
                {featuredMovies.length > 0 && (
                    <div className="flex items-center justify-center">
                        <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700">
                            <FaChevronRight className="text-white" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedVideos;