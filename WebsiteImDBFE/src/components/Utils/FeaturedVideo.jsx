import React from 'react';
import { FaPlay, FaChevronRight, FaRegThumbsUp, FaRegHeart } from 'react-icons/fa';

const videos = [
    {
        title: "Season 2 Official Trailer",
        subtitle: "The Last of Us",
        duration: "1:55",
        image: "https://via.placeholder.com/300x180/111", // Thay bằng ảnh thực tế
        likes: 844,
        hearts: 573,
    },
    {
        title: "Why Director Bong Joon Ho's 'Mickey 17' Cast Loves Him",
        subtitle: "Mickey 17",
        duration: "3:08",
        image: "https://via.placeholder.com/300x180/222",
        likes: 173,
        hearts: 74,
    },
    {
        title: "Official Trailer - Season 5",
        subtitle: "You",
        duration: "2:22",
        image: "https://via.placeholder.com/300x180/333",
        likes: 47,
        hearts: 22,
    }
];

const FeaturedVideos = () => {
    return (
        <div className="w-full bg-black text-white p-5">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-yellow-500 mb-1">Featured Videos</h2>
            <p className="text-gray-400 text-sm mb-4">Playing 3 of 19</p>

            {/* Grid hiển thị video */}
            <div className="flex space-x-4 overflow-x-auto">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="w-80 bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:bg-[#121212] hover:cursor-pointer"
                    >
                        {/* Ảnh video */}
                        <div className="relative">
                            <img src={video.image} alt={video.title} className="w-full h-44 object-cover" />

                            {/* Thời lượng video */}
                            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                                <FaPlay className="mr-1 text-yellow-400" /> {video.duration}
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold">{video.title}</h3>
                            <p className="text-gray-400 text-xs">{video.subtitle}</p>

                            {/* Reactions */}
                            <div className="flex items-center text-gray-400 text-xs mt-2 space-x-4">
                                <span className="flex items-center">
                                    <FaRegThumbsUp className="mr-1" /> {video.likes}
                                </span>
                                <span className="flex items-center">
                                    <FaRegHeart className="mr-1 text-pink-400" /> {video.hearts}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Nút mũi tên */}
                <div className="flex items-center justify-center">
                    <button className="bg-black/60 p-3 rounded-full border border-gray-500 hover:bg-gray-700">
                        <FaChevronRight className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedVideos;
