import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IoIosArrowForward } from "react-icons/io";

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/${id}`);
                const data = await response.json();
                console.log("Dữ liệu phim:", data);
                setMovie(data);
            } catch (error) {
                console.error("Lỗi tải dữ liệu phim:", error);
            }
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <p className="text-white">Đang tải...</p>;

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
                <div className="flex space-x-6">
                    <div className="flex flex-col w-[70%]">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg font-semibold text-white mb-4 px-4 py-2 rounded-md w-fit mt-2 transition-all duration-300 hover:bg-[#121212]"
                        >
                            Quay lại
                        </button>
                        <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-full h-[460px] max-w-4xl object-cover rounded-lg shadow-lg" 
                        />
                    </div>

                    {/* Thông tin phim */}
                    <div className="self-start w-[30%] bg-[#121212] p-4 rounded-lg shadow-lg h-[500px] flex flex-col items-start py-4">
                        <div className='flex flex-row'>
                            <img
                                src={movie.poster}
                                alt="Thumbnail"
                                className="w-20 h-28 object-cover rounded-lg"
                            />
                            <h2 className="text-white text-lg font-semibold ml-5">{movie.title}</h2>
                            {/* <a href="#" className="ml-20 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-gray-700">
                                <IoIosArrowForward color="white" />
                            </a> */}
                        </div>
                        <hr className="border-t border-gray-500 my-4 w-full" />
                        <p className="text-gray-300 text-sm mt-2 text-center">
                            {movie.description || "Chưa có mô tả cho bộ phim này."}
                        </p>
                        <p className="text-gray-300 text-sm mt-2"><strong>Thể loại:</strong> {movie.genre}</p>
                        <p className="text-gray-300 text-sm mt-2"><strong>Đạo diễn:</strong> {movie.director}</p>
                        <p className="text-gray-300 text-sm mt-2"><strong>Diễn viên:</strong> {movie.actors && movie.actors.length > 0 ? movie.actors.join(', ') : "Chưa có thông tin"}</p>
                        <p className="text-gray-300 text-sm mt-2"><strong>Năm phát hành:</strong> {movie.releaseYear}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
