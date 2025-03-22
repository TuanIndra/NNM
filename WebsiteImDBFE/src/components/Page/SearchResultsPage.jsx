import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showAllActors, setShowAllActors] = useState(false);
    const [showAllMovies, setShowAllMovies] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                if (query === "latest") {
                    const response = await fetch("http://localhost:5000/api/movies?page=1&limit=10");
                    if (!response.ok) {
                        throw new Error("Không thể tải danh sách phim");
                    }
                    const data = await response.json();
                    const latestMovies = data.movies
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map(movie => ({
                            id: movie._id,
                            title: movie.title,
                            year: movie.releaseYear || "N/A",
                            actors: movie.actors ? movie.actors.map(actor => actor.name) : [],
                            image: movie.poster || "https://via.placeholder.com/100",
                        }));
                    setMovies(latestMovies);
                    setActors([]);
                } else {
                    // Tìm kiếm phim và actors với query
                    const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
                    if (!response.ok) {
                        throw new Error("Không thể tải dữ liệu");
                    }
                    const data = await response.json();

                    // Xử lý phim
                    const filteredMovies = data.map(movie => ({
                        id: movie._id,
                        title: movie.title,
                        year: movie.releaseYear || "N/A",
                        actors: movie.actors ? movie.actors.map(actor => actor.name) : [],
                        image: movie.poster || "https://via.placeholder.com/100",
                    }));
                    setMovies(filteredMovies);

                    // Trích xuất actors từ danh sách phim
                    const allActors = data
                        .flatMap(movie => movie.actors || [])
                        .map(actor => ({
                            id: actor._id,
                            name: actor.name,
                            role: "Actor",
                            image: actor.profileImage || "https://via.placeholder.com/50",
                        }))
                        .filter((actor, index, self) => 
                            index === self.findIndex(a => a.id === actor.id) // Loại bỏ trùng lặp
                        );
                    setActors(allActors);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return (
        <div>
            <Navbar />
            <div className="p-6 mt-24 px-24 justify-center items-center">
                <h1 className="text-5xl font-bold mb-4">
                    {query === "latest" ? "Latest Movies" : `Search "${query}"`}
                </h1>

                {/* People Section */}
                {query !== "latest" && (
                    <section className="mb-6 mt-24">
                        <h2 className="text-xl font-semibold mb-2">People</h2>
                        <div className="bg-gray-100 p-4 rounded">
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : actors.length > 0 ? (
                                <>
                                    {actors.slice(0, showAllActors ? actors.length : 4).map((actor) => (
                                        <a 
                                            key={actor.id} 
                                            href={`/actor/${actor.id}`} 
                                            className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-b-0 hover:bg-gray-200 p-2 rounded-md transition"
                                        >
                                            <img src={actor.image} alt={actor.name} className="w-[50px] h-[50px] rounded-full mr-2" />
                                            <span className="font-bold">{actor.name}</span>
                                        </a>
                                    ))}
                                    {!showAllActors && actors.length > 4 && (
                                        <button
                                            onClick={() => setShowAllActors(true)}
                                            className="mt-2 text-blue-500 hover:underline"
                                        >
                                            Xem thêm
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>No actors found.</p>
                            )}
                        </div>
                    </section>
                )}

                {/* Movies Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-2 mt-24">Movies</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : movies.length > 0 ? (
                            <>
                                {movies.slice(0, showAllMovies ? movies.length : 4).map((movie) => (
                                    <a 
                                        key={movie.id} 
                                        href={`/movie/${movie.id}`} 
                                        className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-b-0 hover:bg-gray-200 p-2 rounded-md transition"
                                    >
                                        <img src={movie.image} alt={movie.title} className="w-[50px] h-[74px] mr-4 rounded-md" />
                                        <div>
                                            <h3 className="font-bold">{movie.title} ({movie.year})</h3>
                                            <p>Starring: {movie.actors.length > 0 ? movie.actors.join(", ") : "N/A"}</p>
                                        </div>
                                    </a>
                                ))}
                                {!showAllMovies && movies.length > 4 && (
                                    <button
                                        onClick={() => setShowAllMovies(true)}
                                        className="mt-2 text-blue-500 hover:underline"
                                    >
                                        Xem thêm
                                    </button>
                                )}
                            </>
                        ) : (
                            <p>No movies found.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SearchResultsPage;