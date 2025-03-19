import React, { useState, useEffect } from "react";
import { FaRegPlayCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestMovies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/movies");
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu phim");
                }
                const data = await response.json();
                console.log("Dữ liệu từ API (Banner):", data); // Debug

                // Kiểm tra xem data.movies có tồn tại và là mảng không
                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                const sortedMovies = moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map((movie) => ({
                        _id: movie._id,
                        bannerImage: movie.bannerImage || "https://picsum.photos/1200/500",
                        poster: movie.poster || "https://picsum.photos/150/200",
                        title: movie.title,
                    }));

                setMovies(sortedMovies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [movies]);

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handleNavigateToDetail = () => {
        navigate(`/movie/${movies[currentIndex]._id}`);
    };

    const handleImageError = (e) => {
        e.target.src = "https://picsum.photos/1200/500"; // Fallback ảnh
        e.target.onerror = null; // Ngăn lặp lại lỗi
    };

    if (loading) {
        return <div className="text-white">Đang tải banner...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (movies.length === 0) {
        return <div className="text-white">Không có phim nào để hiển thị</div>;
    }

    const currentMovie = movies[currentIndex];

    return (
        <div className="relative w-full flex justify-center">
            <img
                src={currentMovie.bannerImage}
                className="w-full h-[500px] object-cover rounded-lg shadow-md transition-opacity duration-500"
                alt="Movie Banner"
                loading="lazy"
                onError={handleImageError}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/100 to-transparent"></div>

            <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                <FaArrowLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                <FaArrowRight size={24} />
            </button>

            <div
                className="absolute left-5 bottom-2 w-[60%] h-auto text-white flex items-end justify-start shadow-lg rounded-lg p-4 bg-transparent cursor-pointer"
                onClick={handleNavigateToDetail}
            >
                <img
                    src={currentMovie.poster}
                    alt={currentMovie.title}
                    className="w-[150px] h-[200px] object-cover rounded-lg"
                    onError={handleImageError}
                />
                <div>
                    <FaRegPlayCircle className="ml-5 w-20 h-20 hover:text-orange-300 transition cursor-pointer" />
                </div>
                <div className="ml-5 text-lg font-bold break-words flex-1">
                    {currentMovie.title}
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
                {movies.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-orange-300" : "bg-gray-400"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;