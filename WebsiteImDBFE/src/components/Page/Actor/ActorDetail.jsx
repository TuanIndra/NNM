import React from "react";
import Navbar from "../../Navbar/Navbar";

const ActorDetail = () => {
    // 🔹 Dữ liệu Fake để thiết kế UI
    const actor = {
        name: "Tom Cruise",
        birthDate: "1962-07-03",
        birthPlace: "Syracuse, New York, USA",
        profileImage: "https://images2.thanhnien.vn/528068263637045248/2024/11/28/5-1732774990424925790598.jpg",
        knownForMovies: [
            { _id: "1", title: "Top Gun", releaseYear: 1986 },
            { _id: "2", title: "Mission: Impossible", releaseYear: 1996 },
            { _id: "3", title: "Jerry Maguire", releaseYear: 1996 },
        ],
    };

    return (
        <div className="bg-black">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-black text-white p-10 min-h-screen mt-10">
                    <div className="flex-col">
                        {/* Cột chứa ảnh và tên */}
                        <div className="w-1/4 pr-5">
                            <h1 className="text-5xl font-bold text-center mb-4">{actor.name}</h1>

                        </div>
                        <div className="flex-row">
                            <img
                                src={actor.profileImage}
                                alt={actor.name}
                                className="w-[25%] rounded-2xl h-[350px]"
                            />
                        </div>

                        {/* Cột chứa thông tin diễn viên */}
                        <div className="w-3/4">
                            <p className="text-lg text-gray-400">{actor.birthPlace}</p>
                            <p className="text-lg text-gray-400">Born: {actor.birthDate}</p>
                        </div>
                    </div>

                    {/* Danh sách phim */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold">Known For</h2>
                        <div className="mt-5 flex space-x-4">
                            {actor.knownForMovies.map(movie => (
                                <div key={movie._id} className="bg-gray-800 p-3 rounded-lg">
                                    <p className="text-lg font-semibold">{movie.title}</p>
                                    <p className="text-sm text-gray-400">Year: {movie.releaseYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorDetail;
