import React from "react";
import { FaStar } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

const KnownForCard = ({ movie }) => {
    return (
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden relative">
            {/* Ảnh phim */}
            <img src={movie.image} alt={movie.title} className="w-[68px] h-[100px] object-cover" />

            {/* Nội dung */}
            <div className="p-3 flex flex-col flex-1 relative">
                <h3 className="text-sm font-semibold text-black">{movie.title}</h3>
                <div className="flex items-center text-sm text-gray-600">
                    <FaStar className="text-yellow-500 mr-1" />
                    {movie.rating} Movie
                </div>
                <p className="text-sm text-gray-500">{movie.role}</p>
                <p className="text-sm text-gray-500">{movie.year}</p>

                {/* 🔹 Icon "i" nằm góc dưới bên phải */}
                <FaCircleInfo className="text-gray-400 text-lg absolute bottom-2 right-2 cursor-pointer" />
            </div>
        </div>
    );
};

export default KnownForCard;
