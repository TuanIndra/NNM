import React, { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const FeaturedNew = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestMovies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/movies");
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu phim");
                }
                const data = await response.json();

                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                const latestMovies = moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 9);

                const groupedMovies = [];
                for (let i = 0; i < latestMovies.length; i += 3) {
                    const group = latestMovies.slice(i, i + 3);
                    groupedMovies.push({
                        title: `New Releases: ${group.map(m => m.title).join(", ")}`,
                        movieIds: group.map(m => m._id), // Lưu danh sách ID phim
                        images: group.map(m => m.poster || "https://picsum.photos/150/200"),
                        type: "list",
                    });
                }

                setFeaturedItems(groupedMovies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestMovies();
    }, []);

    return (
        <div className="w-full bg-black text-white p-5">
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Featured New</h2>

            {loading ? (
                <p className="text-gray-400">Đang tải phim...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex space-x-4 overflow-x-auto">
                    {featuredItems.map((item, index) => (
                        <div key={index} className="w-80 bg-[#111] rounded-lg shadow-lg overflow-hidden">
                            <div className="grid grid-cols-3 gap-0 w-full h-40 overflow-hidden">
                                {item.images.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt={`Feature ${index}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                ))}
                            </div>

                            <div className="p-3">
                                <h3 className="text-sm font-bold">{item.title}</h3>
                                <Link 
                                    to={`/search?movieIds=${encodeURIComponent(item.movieIds.join(','))}`} 
                                    className="text-blue-400 text-sm hover:underline"
                                >
                                    See more
                                </Link>
                            </div>
                        </div>
                    ))}

                    {featuredItems.length > 0 && (
                        <div className="flex items-center justify-center">
                            <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700">
                                <FaChevronRight className="text-white" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeaturedNew;