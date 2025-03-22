// src/pages/WatchlistMoviesPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { toast } from "react-toastify";
import { AuthContext } from "./../../../context/AuthContext";

const WatchlistMoviesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext); // Lấy token từ context
    const [movies, setMovies] = useState([]);
    const [watchlistName, setWatchlistName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetchMovies();
    }, [id, token]);

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
                if (data.message === "Token has expired" || data.message === "Invalid Token" || data.message === "Access Denied") {
                    // Không cần xử lý ở đây, AuthProvider sẽ tự động đăng xuất
                } else {
                    toast.error(data.message, { position: "top-center" });
                }
            }
        } catch (error) {
            toast.error("Lỗi kết nối server!", { position: "top-center" });
        } finally {
            setLoading(false);
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

            const data = await response.json();
            if (response.ok) {
                setMovies(movies.filter(movie => movie._id !== movieId));
            } else {
                if (data.message === "Token has expired" || data.message === "Invalid Token") {
                    // Không cần xử lý, AuthProvider sẽ tự động đăng xuất
                } else {
                    toast.error(data.message, { position: "top-center" });
                }
            }
        } catch (error) {
            toast.error("Lỗi kết nối server!", { position: "top-center" });
        }
    };

    if (loading) return <p className="text-white">Đang tải...</p>;

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
                                    <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded-lg" />
                                    <div className="ml-4 flex-grow">
                                        <h2 className="text-xl font-semibold">{movie.title}</h2>
                                        <p className="text-gray-400">{movie.releaseYear} • {movie.genre}</p>
                                        {movie.ratings && movie.ratings.length > 0 && (
                                            <p className="text-yellow-400 mt-1">
                                                ⭐ {(
                                                    movie.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
                                                    movie.ratings.length
                                                ).toFixed(1)} ({movie.ratings.length} votes)
                                            </p>
                                        )}
                                    </div>
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