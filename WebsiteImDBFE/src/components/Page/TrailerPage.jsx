import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import FeaturedVideos from '../Utils/FeaturedVideo';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrailerPage = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    // ✅ Kiểm tra xem có user._id hay không
    console.log("🔹 Kiểm tra user từ localStorage:", user);
    console.log("🔹 User ID:", user?._id);
    console.log("🔹 Token từ localStorage:", token);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                console.log("Fetching movie with ID:", id);
                const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (!response.ok) throw new Error('Không thể tải dữ liệu phim');

                const data = await response.json();
                console.log("Fetched movie data:", data);

                setMovie(data);
                if (user) {
                    console.log("User ID:", storedUser._id);
                    const existingRating = data.ratings.find(r => r.userId === user._id);
                    if (existingRating) setUserRating(existingRating.rating);
                }
            } catch (err) {
                console.error("Lỗi khi fetch phim:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);  // 🔥 Chỉ phụ thuộc vào `id`, không phụ thuộc vào `token` và `user`

    const handleRating = async (rating) => {
        if (!token) {
            toast.error('Vui lòng đăng nhập để đánh giá!');
            return navigate('/login');
        }
        
        console.log("User ID:", user?._id, "Movie ID:", id, "Rating:", rating);

        try {
            const response = await fetch(`http://localhost:5000/api/movies/${id}/rate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: user ? user._id : null, rating }),
            });

            if (!response.ok) throw new Error('Không thể gửi đánh giá');
            const updatedMovie = await response.json();
            
            console.log("Updated movie data after rating:", updatedMovie);

            setMovie(updatedMovie);
            setUserRating(rating);
            toast.success('Đánh giá thành công!');
        } catch (err) {
            console.error("Lỗi khi gửi đánh giá:", err);
            toast.error(err.message);
        }
    };

    if (loading) return <p className="text-white">Đang tải...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!movie) return <p className="text-white">Không tìm thấy phim</p>;

    const calculateAverageRating = () => {
        if (!Array.isArray(movie.ratings) || movie.ratings.length === 0) return "Chưa có đánh giá";
        const total = movie.ratings.reduce((sum, r) => sum + r.rating, 0);
        return (total / movie.ratings.length).toFixed(1);
    };

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
                <div className="flex space-x-6 items-start">
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

                    <div className="w-[30%] bg-[#121212] p-4 rounded-lg shadow-lg flex flex-col">
                        <div className="flex">
                            <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded-lg" />
                            <h2 className="text-white text-lg font-semibold ml-5">{movie.title}</h2>
                        </div>
                        <hr className="border-t border-gray-500 my-4 w-full" />
                        <p className="text-gray-300 text-sm mt-2">{movie.description}</p>
                        <p className="text-gray-400 mt-2"><strong>Thể loại:</strong> {movie.genre?.map(g => g.name).join(", ") || "Không có thể loại"}</p>
                        <p className="text-gray-400 mt-1"><strong>Đạo diễn:</strong> {movie.director || "Không rõ"}</p>
                        <p className="text-gray-400 mt-1"><strong>Diễn viên:</strong> {movie.actors?.map(a => a.name).join(", ") || "Không có diễn viên"}</p>
                        <p className="text-gray-400 mt-1"><strong>Năm phát hành:</strong> {movie.releaseYear}</p>
                        <div className="mt-4">
                            <span className="text-gray-400"><strong>Đánh giá trung bình:</strong> </span>
                            <span className="text-yellow-400">{calculateAverageRating()} / 10</span>
                            <span className="text-gray-400"> ({movie.ratings.length} lượt)</span>
                        </div>

                        <div className="mt-4">
                            <span className="text-gray-400"><strong>Đánh giá của bạn:</strong></span>
                            <div className="flex space-x-1 mt-2">
                                {[...Array(10)].map((_, index) => {
                                    const star = index + 1;
                                    return (
                                        <FaStar
                                            key={star}
                                            size={24}
                                            className={`cursor-pointer transition-colors ${ (hoverRating || userRating) >= star ? "text-yellow-400" : "text-gray-600" }`}
                                            onClick={() => handleRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FeaturedVideos />
        </div>
    );
};

export default TrailerPage;
