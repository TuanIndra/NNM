const ActorMovies = () => {
    const movies = [
        { _id: "2", title: "Top Gun", releaseYear: 1986 },
        { _id: "3", title: "Jerry Maguire", releaseYear: 1996 },
    ];

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold ml-24">Known For</h2>
            <div className="mt-5 flex space-x-4">
                {movies.map(movie => (
                    <div key={movie._id} className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-lg font-semibold">{movie.title}</p>
                        <p className="text-sm text-gray-400">Year: {movie.releaseYear}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorMovies;
