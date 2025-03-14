import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IoIosArrowForward } from "react-icons/io";
import FeaturedVideos from '../Utils/FeaturedVideo';
const TrailerPage = () => {
    const { id } = useParams();  // Lấy ID từ URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Không thể tải dữ liệu phim');
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <p className="text-white">Đang tải...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!movie) return <p className="text-white">Không tìm thấy phim</p>;

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
                <div className="flex space-x-6 items-start">
                    {/* Video Player */}
                    <div className="flex flex-col w-[70%]">
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-lg font-semibold text-white mb-4 px-4 py-2 rounded-md w-fit mt-2 transition-all duration-300 hover:bg-[#121212]"
                        >
                            Quay lại
                        </button>
                        <iframe
                            className="w-full h-[460px] max-w-4xl rounded-lg shadow-lg"
                            src={`https://www.youtube.com/embed/${new URL(movie.trailer).pathname.slice(1)}?autoplay=1&mute=1`}
                            title={movie.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Sidebar bên phải */}
                    <div className="w-[30%] bg-[#121212] p-4 rounded-lg shadow-lg flex flex-col">
                        <div className="flex">
                            <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded-lg" />
                            <h2 className="text-white text-lg font-semibold ml-5">{movie.title}</h2>
                        </div>
                        <hr className="border-t border-gray-500 my-4 w-full" />
                        <p className="text-gray-300 text-sm mt-2">{movie.description}</p>
                        <p className="text-gray-400 mt-2"><strong>Thể loại:</strong> {movie.genre?.name || "Không có thể loại"}</p>
                        <p className="text-gray-400 mt-1"><strong>Đạo diễn:</strong> {movie.director}</p>
                        <p className="text-gray-400 mt-1"><strong>Diễn viên:</strong> {movie.actors}</p>
                        <p className="text-gray-400 mt-1"><strong>Năm phát hành:</strong> {movie.year}</p>
                    </div>
                </div>
                <div>
                    <FeaturedVideos />
                </div>
            </div>
        </div>
    );
};

export default TrailerPage;
