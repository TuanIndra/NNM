import React from "react";
import KnownForCard from "./KnownForCard";

const KnownFor = ({ movies }) => {
    console.log("Movies received in KnownFor:", movies); // Log để kiểm tra dữ liệu

    return (
        <div className="mt-10 w-[856px] h-[332px]">
            <h2 className="text-2xl font-bold text-black flex items-center">
                <span className="border-l-4 border-yellow-500 pl-3">Known for</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {movies && movies.length > 0 ? (
                    movies.slice(0, 4).map((movie) => (
                        <KnownForCard
                            key={movie._id}
                            movie={{
                                title: movie.title,
                                rating: movie.ratings?.length > 0
                                    ? (movie.ratings.reduce((sum, r) => sum + r.rating, 0) / movie.ratings.length).toFixed(1)
                                    : "N/A",
                                year: movie.releaseYear,
                                poster: movie.poster,
                            }}
                        />
                    ))
                ) : (
                    <p>No known movies</p>
                )}
            </div>
        </div>
    );
};

export default KnownFor;