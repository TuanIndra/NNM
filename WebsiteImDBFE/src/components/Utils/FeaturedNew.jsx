import React, { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const FeaturedNew = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load 9 phim mới nhất từ API và chia thành 3 nhóm
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
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sắp xếp theo ngày tạo mới nhất
                    .slice(0, 9); // Lấy 9 phim mới nhất

                // Chia 9 phim thành 3 nhóm, mỗi nhóm 3 phim
                const groupedMovies = [];
                for (let i = 0; i < latestMovies.length; i += 3) {
                    const group = latestMovies.slice(i, i + 3);
                    groupedMovies.push({
                        title: `New Releases: ${group.map(m => m.title).join(", ")}`, // Tiêu đề là danh sách tên phim
                        link: "See more", // Có thể thay bằng link thực tế nếu cần
                        images: group.map(m => m.poster || "https://picsum.photos/150/200"), // Dùng poster cho 3 ảnh nhỏ
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
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Featured New</h2>

            {/* Danh sách featured */}
            {loading ? (
                <p className="text-gray-400">Đang tải phim...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex space-x-4 overflow-x-auto">
                    {featuredItems.map((item, index) => (
                        <div key={index} className="w-80 bg-[#111] rounded-lg shadow-lg overflow-hidden">
                            {/* Banner 3 ảnh gộp lại */}
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

<<<<<<< HEAD
                        {/* Nội dung */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold">{item.title}</h3>
                            <a href="/detailNews" className="text-blue-400 text-sm hover:underline">
                                {item.link}
                            </a>
=======
                            {/* Nội dung */}
                            <div className="p-3">
                                <h3 className="text-sm font-bold">{item.title}</h3>
                                <a href="#" className="text-blue-400 text-sm hover:underline">
                                    {item.link}
                                </a>
                            </div>
>>>>>>> 0be751134d045a6a1a51f25894512e5c799baa27
                        </div>
                    ))}

<<<<<<< HEAD
                {/* Nút mũi tên */}
                <div className="flex items-center justify-center">
                    <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700"
                    aria-label='Next news'>
                        <FaChevronRight className="text-white" />
                    </button>
=======
                    {/* Nút mũi tên */}
                    {featuredItems.length > 0 && (
                        <div className="flex items-center justify-center">
                            <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700">
                                <FaChevronRight className="text-white" />
                            </button>
                        </div>
                    )}
>>>>>>> 0be751134d045a6a1a51f25894512e5c799baa27
                </div>
            )}
        </div>
    );
};

export default FeaturedNew;