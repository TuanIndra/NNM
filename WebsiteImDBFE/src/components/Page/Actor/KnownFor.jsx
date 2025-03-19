import React from "react";
import KnownForCard from "./KnownForCard";

const KnownFor = ({ movies }) => {
    return (
        <div className="mt-10 w-[856px] h-[332px]">
            <h2 className="text-2xl font-bold text-black flex items-center">
                <span className="border-l-4 border-yellow-500 pl-3">Known for</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {movies && movies.length > 0 ? (
                    movies.slice(0, 4).map((movie) => (
                        <KnownForCard key={movie._id} movie={{
                            title: movie.title,
                            originalTitle: movie.originalTitle || movie.title,
                            rating: movie.rating || "N/A",
                            year: movie.releaseYear,
                            role: movie.role || "Unknown",
                            image: movie.image || "https://via.placeholder.com/68x100"
                        }} />
                    ))
                ) : (
                    <p>No known movies</p>
                )}
            </div>
        </div>
    );
};

export default KnownFor;