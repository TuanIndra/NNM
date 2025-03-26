import React, { useState, useEffect } from "react";
import Banner from "../Utils/Banner";
import UpNext from "./upNext";
import Slider from "./../Utils/Slider";
import MovieSlider from "../Utils/MovieSlider";
import FeatureNew from "../Utils/FeaturedNew";
import FeaturedVideos from "../Utils/FeaturedVideo";
import Footer from "../Page/Footer";
import Navbar from "../Navbar/Navbar";

const MainPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/movies");
                if (!response.ok) {
                    throw new Error("Không thể tải danh sách phim");
                }
                const data = await response.json();
                console.log("Dữ liệu phim từ API (MainPage):", data);

                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                const formattedMovies = moviesArray.map((movie) => ({
                    _id: movie._id,
                    title: movie.title,
                    image: movie.poster,
                    bannerImage: movie.bannerImage,
                    rating:
                        movie.ratings && movie.ratings.length > 0
                            ? (
                                  movie.ratings.reduce((sum, r) => sum + r.rating, 0) /
                                  movie.ratings.length
                              ).toFixed(1)
                            : 0,
                    releaseYear: movie.releaseYear || "N/A", // Đảm bảo có releaseYear
                    ratingsCount: movie.ratings ? movie.ratings.length : 0,
                }));
                setMovies(formattedMovies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Lọc phim nổi bật (dựa trên số lượng đánh giá)
    const featuredMovies = movies
        .sort((a, b) => b.ratingsCount - a.ratingsCount)
        .slice(0, 10);

    // Lọc phim mới (dựa trên releaseYear)
    const newMovies = movies
        .filter((movie) => movie.releaseYear !== "N/A") // Loại bỏ phim không có năm phát hành
        .sort((a, b) => Number(b.releaseYear) - Number(a.releaseYear)) // Sắp xếp theo năm giảm dần
        .slice(0, 10);

    // Lọc phim được yêu thích (dựa trên điểm đánh giá trung bình)
    const popularMovies = movies
        .filter((movie) => movie.rating > 0)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

    return (
        <div>
            <Navbar />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-0 mt-14">
                <div className="flex items-start space-x-6 relative">
                    <Banner />
                    <div className="w-[40%] px-8">
                        <UpNext />
                    </div>
                </div>

                <div className="mt-20">
                    <FeatureNew movies={movies} />
                </div>

                <div className="mt-20">
                    <FeaturedVideos movies={movies} />
                </div>

                <div className="mt-20">
                    <FeaturedVideos movies={movies} />
                </div>

                <div className="mt-20">
                    <a className="text-xl font-bold text-white">Top diễn viên nổi tiếng</a>
                    <Slider />
                </div>

                {loading ? (
                    <p className="text-white">Đang tải phim...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="text-white mt-20">
                            <a className="text-xl font-bold text-white">Phim nổi bật</a>
                            <MovieSlider movies={featuredMovies} />
                        </div>
                        <div className="text-white mt-20">
                            <a className="text-xl font-bold text-white">Phim mới</a>
                            <MovieSlider movies={newMovies} />
                        </div>
                        <div className="text-white mt-20">
                            <a className="text-xl font-bold text-white">Phim được yêu thích</a>
                            <MovieSlider movies={popularMovies} />
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;