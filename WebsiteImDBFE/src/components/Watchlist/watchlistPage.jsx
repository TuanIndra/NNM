import React, { useState } from "react";
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const WatchlistPage = () => {
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState([]); // Danh sách phim theo dõi

    return (

        <div><Navbar></Navbar>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-3xl font-bold">Danh sách theo dõi của bạn</h1>
                    <p className="text-gray-400 mt-2">
                        Danh sách theo dõi của bạn là nơi lưu trữ những bộ phim bạn muốn xem sau. Bạn có thể sắp xếp và quản lý danh sách của mình tại đây.
                    </p>

                    {/* Nếu danh sách trống */}
                    {watchlist.length === 0 ? (
                        <div className="mt-10 bg-gray-800 p-6 rounded-lg text-center">
                            <p className="text-gray-400 text-lg">Danh sách này trống.</p>
                            <button
                                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                                onClick={() => navigate('/create-watchlist')}
                            >
                                + Tạo danh sách mới
                            </button>
                        </div>
                    ) : (
                        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {watchlist.map((movie, index) => (
                                <li key={index} className="bg-gray-800 p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                                    <p className="text-gray-400">{movie.year}</p>
                                    <button
                                        className="mt-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() =>
                                            setWatchlist(watchlist.filter((_, i) => i !== index))
                                        }
                                    >
                                        Xóa khỏi danh sách
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>

    );
};

export default WatchlistPage;
