import React, { useState, useEffect } from "react";
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const WatchlistPage = () => {
    const navigate = useNavigate();
    const [watchlists, setWatchlists] = useState([]);
    const [newWatchlistName, setNewWatchlistName] = useState("");
    const [newWatchlistDescription, setNewWatchlistDescription] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchWatchlists();
    }, []);

    const fetchWatchlists = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/watchlist", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (response.ok) {
                setWatchlists(data.watchlists);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Lỗi kết nối server!");
        }
    };

    const createWatchlist = async () => {
        if (!newWatchlistName.trim()) {
            alert("Tên danh sách không được để trống!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/watchlist/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newWatchlistName,
                    description: newWatchlistDescription
                })
            });

            const data = await response.json();
            if (response.ok) {
                setWatchlists([...watchlists, data.watchlist]);
                setNewWatchlistName("");
                setNewWatchlistDescription("");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Lỗi kết nối server!");
        }
    };

    const deleteWatchlist = async (watchlistId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh sách này?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/watchlist/${watchlistId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setWatchlists(watchlists.filter(watchlist => watchlist._id !== watchlistId));
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
                    <h1 className="text-3xl font-bold">Danh sách theo dõi của bạn</h1>

                    {/* Form tạo watchlist */}
                    <div className="mt-6 bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold">Tạo danh sách mới</h2>
                        <input
                            type="text"
                            placeholder="Tên danh sách..."
                            value={newWatchlistName}
                            onChange={(e) => setNewWatchlistName(e.target.value)}
                            className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
                        />
                        <textarea
                            placeholder="Mô tả (tùy chọn)..."
                            value={newWatchlistDescription}
                            onChange={(e) => setNewWatchlistDescription(e.target.value)}
                            className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
                        />
                        <button
                            className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600"
                            onClick={createWatchlist}>
                            + Tạo danh sách
                        </button>
                    </div>

                    {/* Hiển thị danh sách watchlist */}
                    {watchlists.length === 0 ? (
                        <div className="mt-10 bg-gray-800 p-6 rounded-lg text-center">
                            <p className="text-gray-400 text-lg">Danh sách này trống.</p>
                        </div>
                    ) : (
                        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {watchlists.map((watchlist) => (
                                <li key={watchlist._id} className="bg-gray-800 p-4 rounded-lg">
                                    <div
                                        className="cursor-pointer hover:bg-gray-700 transition p-2 rounded-lg"
                                        onClick={() => navigate(`/watchlist/${watchlist._id}`)}>
                                        <h2 className="text-xl font-semibold">{watchlist.name}</h2>
                                        <p className="text-gray-400">{watchlist.description}</p>
                                    </div>
                                    <button
                                        className="mt-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full"
                                        onClick={() => deleteWatchlist(watchlist._id)}>
                                        Xóa danh sách
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
