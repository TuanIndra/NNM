import React from "react";
import KnownForCard from "./KnownForCard";

const ActorMovies = () => {
    // 🔹 Fake Data – Danh sách phim của diễn viên
    const movies = [
        {
            title: "Nhiệm Vụ Bất Khả Thi: Nghiệp Báo – Phần Một",
            year: 2023,
            rating: 7.6,
            role: "Ethan Hunt",
            image: "https://via.placeholder.com/50x75", // 🔹 Fake ảnh
        },
        {
            title: "Phi Công Siêu Đẳng Maverick",
            year: 2022,
            rating: 8.2,
            role: "Capt. Pete 'Maverick' Mitchell",
            image: "https://via.placeholder.com/50x75",
        },
        {
            title: "Au Revoir, Chris Hemsworth",
            year: 2020,
            rating: 7.5,
            role: "Team Member",
            image: "https://via.placeholder.com/50x75",
        },
        {
            title: "Nhiệm Vụ Bất Khả Thi: Sụp Đổ",
            year: 2018,
            rating: 7.7,
            role: "Ethan Hunt",
            image: "https://via.placeholder.com/50x75",
        },
        {
            title: "Xác Ướp",
            year: 2017,
            rating: 5.4,
            role: "Nick Morton",
            image: "https://via.placeholder.com/50x75",
        },
        {
            title: "Jack Reacher: Không Quay Đầu",
            year: 2016,
            rating: 6.2,
            role: "Jack Reacher",
            image: "https://via.placeholder.com/50x75",
        },
    ];

    return (
        <div className="bg-gray-100 p-5 rounded-lg shadow-md w-[856px]">
            <h2 className="text-xl font-bold mb-3 text-black">Actor Movies</h2>

            {/* 🔹 Danh sách phim */}
            <div className="space-y-3">
                {movies.map((movie, index) => (
                    <KnownForCard key={index} movie={movie} />
                ))}
            </div>

            {/* 🔹 Gạch ngang + Nút "Xem tất cả" */}
            <div className="mt-4 border-t border-gray-300 pt-3 text-center">
                <button className="text-blue-500 font-semibold hover:underline">
                    Xem tất cả
                </button>
            </div>
        </div>
    );
};

export default ActorMovies;
