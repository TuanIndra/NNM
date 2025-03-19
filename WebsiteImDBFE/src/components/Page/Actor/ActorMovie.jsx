import React from "react";
import KnownForCard from "./KnownForCard";

const ActorMovies = ({ movies }) => {
    return (
        <div className="bg-gray-100 p-5 rounded-lg shadow-md w-[856px]">
            <h2 className="text-xl font-bold mb-3 text-black">Actor Movies</h2>

            <div className="space-y-3">
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <KnownForCard
                            key={movie._id || index}
                            movie={{
                                title: movie.title,
                                year: movie.releaseYear,
                                rating: movie.ratings?.length > 0
                                    ? (movie.ratings.reduce((sum, r) => sum + r.rating, 0) / movie.ratings.length).toFixed(1)
                                    : "N/A",
                                poster: movie.poster,
                            }}
                        />
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>

            <div className="mt-4 border-t border-gray-300 pt-3 text-center">
                <button className="text-blue-500 font-semibold hover:underline">
                    Xem tất cả
                </button>
            </div>
        </div>
    );
};

export default ActorMovies;