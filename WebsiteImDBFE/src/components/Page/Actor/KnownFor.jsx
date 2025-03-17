import React from "react";
import KnownForCard from "./KnownForCard";

const KnownFor = () => {
    // Dữ liệu fake, sau này có thể thay thế bằng API
    const movies = [
        {
            id: 1,
            title: "Phi Công Siêu Đẳng",
            originalTitle: "Top Gun",
            rating: 7.0,
            year: 1986,
            role: "Maverick",
            image: "https://m.media-amazon.com/images/I/71UFBvO7U8L._AC_SY679_.jpg",
        },
        {
            id: 2,
            title: "Nhiệm Vụ Bất Khả Thi",
            originalTitle: "Mission: Impossible",
            rating: 7.2,
            year: 1996,
            role: "Ethan Hunt",
            image: "https://m.media-amazon.com/images/I/81spsT1cGpL._AC_SY679_.jpg",
        },
        {
            id: 3,
            title: "Quản Lý Và Người Tình",
            originalTitle: "Jerry Maguire",
            rating: 7.3,
            year: 1996,
            role: "Jerry Maguire",
            image: "https://m.media-amazon.com/images/I/51l3hM4aQWL._AC_SY679_.jpg",
        },
        {
            id: 4,
            title: "Bản Báo Cáo Thiểu Số",
            originalTitle: "Minority Report",
            rating: 7.6,
            year: 2002,
            role: "Chief John Anderton",
            image: "https://m.media-amazon.com/images/I/91tKOTGYa4L._AC_SY679_.jpg",
        },
    ];

    return (
        <div className="mt-10 w-[856px] h-[332px]">
            <h2 className="text-2xl font-bold text-black flex items-center">
                <span className="border-l-4 border-yellow-500 pl-3">Known for</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {movies.map((movie) => (
                    <KnownForCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default KnownFor;
