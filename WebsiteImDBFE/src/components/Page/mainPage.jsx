import React, { useState, useEffect } from "react";
import SampleVideo from "../../assets/sample.mp4";
import UpNext from "./upNext";
import Slider from "./../Utils/Slider";
import Banner from "../Utils/Banner";
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

                // Kiểm tra xem data.movies có tồn tại và là mảng không
                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                const formattedMovies = moviesArray.map((movie) => ({
                    _id: movie._id,
                    title: movie.title,
                    image: movie.poster,
                    bannerImage: movie.bannerImage,
                    rating:
                        movie.ratings.length > 0
                            ? (
                                  movie.ratings.reduce((sum, r) => sum + r.rating, 0) /
                                  movie.ratings.length
                              ).toFixed(1)
                            : 0,
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
                    <FeatureNew />
                </div>

                <div className="mt-20">
                    console.log("Movies state ngay trước khi render FeaturedVideos:", movies)
                    <FeaturedVideos movies={movies} />
                </div>

                <div className="mt-20">
                    <FeaturedVideos />
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
                            <MovieSlider movies={movies} />
                        </div>
                        <div className="text-white mt-20">
                            <a className="text-xl font-bold text-white">Phim mới</a>
                            <MovieSlider movies={movies} />
                        </div>
                        <div className="text-white mt-20">
                            <a className="text-xl font-bold text-white">Phim được yêu thích</a>
                            <MovieSlider movies={movies} />
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;