import React from 'react';
import { PlayCircle, ThumbsUp, Heart } from 'lucide-react';
import { MdOutlineNavigateNext } from "react-icons/md";
const upNextVideos = [
    {
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7e-ltIVeMwAGbE2MnOymabGB2oO8TV7O15Q&s',
        duration: '4:28',
        title: 'This Monkey Has a Sick Sense of Humor',
        subtitle: 'Watch Our Interview',
        likes: 20,
        reactions: 16,
    },
    {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Bring_Her_Back_film_poster.jpg/220px-Bring_Her_Back_film_poster.jpg',
        duration: '1:05',
        title: 'Bring Her Back',
        subtitle: 'From the Directors of Talk to Me',
        likes: 248,
        reactions: 73,
    },
    {
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMzdjYWZlMDQtYzdhNi00NmRlLTg2NzUtMTI3MWFhZDliNjBiXkEyXkFqcGc@._V1_.jpg',
        duration: '4:32',
        title: 'The Reacher Cast Reveal Secret Skills and More',
        subtitle: 'Watch Our Interview',
        likes: 17,
        reactions: 9,
    },
];

const UpNext = () => {
    return (
        <div className="bg-[#121212] text-white p-4 rounded-lg w-120 h-[500px]">
            <h2 className="text-lg font-bold mb-4 text-blue-500">Up next</h2>
            <div className="space-y-4">
                {upNextVideos.map((video, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="relative w-20 h-28 flex-shrink-0">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                                {video.duration}
                            </span>
                            <PlayCircle className="absolute inset-0 m-auto text-white w-6 h-6 opacity-80" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold truncate">
                                {video.title}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {video.subtitle}
                            </p>
                            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{video.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{video.reactions}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <a href='#' className='text-white flex items-center left-2 bottom-0 hover:text-orange-300 cursor-pointer text-xl font-bold'>
                    Xem thêm
                    <MdOutlineNavigateNext></MdOutlineNavigateNext>
                </a>
            </div>

        </div>
    );
};

export default UpNext;
