const MoreTrailers = () => {
    const movies = [
        { _id: "2", title: "Top Gun", trailer: "dQw4w9WgXcQ" },
        { _id: "3", title: "Jerry Maguire", trailer: "OKoKYk4jC84" },
    ];

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">More Trailers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map(movie => (
                    <div key={movie._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                        <iframe
                            className="w-full h-48 rounded-lg"
                            src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=0&mute=0`}
                            title={movie.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreTrailers;
