import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const WatchlistMoviesPage = () => {
    const { id } = useParams(); // Lấy ID watchlist từ URL
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [watchlistName, setWatchlistName] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchMovies();
    }, [id]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/watchlist/${id}/movies`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (response.ok) {
                setMovies(data.movies);
                setWatchlistName(data.name);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Lỗi kết nối server!");
        }
    };

    const removeMovieFromWatchlist = async (movieId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phim này khỏi Watchlist?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`http://localhost:5000/api/watchlist/${id}/movies/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                setMovies(movies.filter(movie => movie._id !== movieId));
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert("Lỗi kết nối server!");
        }
    };
    


    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-3xl font-bold">{watchlistName}</h1>
                    <p className="text-gray-400 mt-2">Danh sách phim trong danh sách theo dõi của bạn</p>

                    {movies.length === 0 ? (
                        <div className="mt-10 bg-gray-800 p-6 rounded-lg text-center">
                            <p className="text-gray-400 text-lg">Danh sách này trống.</p>
                            <button
                                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                                onClick={() => navigate('/watchlist')}
                            >
                                ← Quay lại danh sách Watchlist
                            </button>
                        </div>
                    ) : (
                        <ul className="mt-6 space-y-6">
                            {movies.map((movie) => (
                                <li key={movie._id} className="bg-gray-800 p-4 rounded-lg flex items-center">
                                    {/* Ảnh Poster */}
                                    <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded-lg" />

                                    {/* Thông tin phim */}
                                    <div className="ml-4 flex-grow">
                                        <h2 className="text-xl font-semibold">{movie.title}</h2>
                                        <p className="text-gray-400">{movie.releaseYear} • {movie.genre}</p>

                                        {/* Rating nếu có */}
                                        {movie.ratings && movie.ratings.length > 0 && (
                                            <p className="text-yellow-400 mt-1">
                                                ⭐ {(
                                                    movie.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
                                                    movie.ratings.length
                                                ).toFixed(1)} ({movie.ratings.length} votes)
                                            </p>
                                        )}
                                    </div>

                                    {/* Nút xóa phim */}
                                    <button
                                        className="ml-auto bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                                        onClick={() => removeMovieFromWatchlist(movie._id)}
                                    >
                                        ❌ Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button
                        className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                        onClick={() => navigate('/watchlist')}
                    >
                        ← Quay lại danh sách Watchlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WatchlistMoviesPage;
