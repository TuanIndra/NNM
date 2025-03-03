import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPlay } from "react-icons/fa";
const MovieCard = ({ movie }) => {
    return (
        <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden w-48">
            <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-3 text-white">
                <div className="flex items-center text-yellow-400">
                    <FaStar className="mr-1" /> <span>{movie.rating}</span>
                </div>
                <h3 className="text-sm font-bold mt-1 line-clamp-2 min-h-[40px]">{movie.title}</h3>
                <button className="bg-gray-700 text-white text-sm w-full mt-2 py-1 rounded flex items-center justify-center">
                    + Watchlist
                </button>
                <button className=" text-white text-sm w-full mt-2 py-1 rounded flex items-center justify-center">
                    <FaPlay className="mr-2" />
                    Trailer
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
