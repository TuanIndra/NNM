import React from "react";

const MoreTrailers = ({ movies }) => {
    return (
        <div className="mt-10 ml-[156px]">
            <h2 className="text-2xl font-bold mb-4">More Trailers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies && movies.length > 1 ? (
                    movies.slice(1).map(movie => (
                        <div key={movie._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                            {movie.trailer ? (
                                <iframe
                                    className="w-full h-48 rounded-lg"
                                    src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=0&mute=0`}
                                    title={movie.title}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-48 bg-gray-500 flex items-center justify-center">
                                    No trailer available
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No additional trailers available</p>
                )}
            </div>
        </div>
    );
};

export default MoreTrailers;