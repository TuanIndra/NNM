import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const fakeActors = [
    { id: 1, name: "Tom Cruise", role: "Actor", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Tom Cruise", role: "Producer", image: "https://via.placeholder.com/50" },
    { id: 3, name: "Johnny Depp", role: "Actor", image: "https://via.placeholder.com/50" },
    { id: 4, name: "Scarlett Johansson", role: "Actress", image: "https://via.placeholder.com/50" },
    { id: 5, name: "Robert Downey Jr.", role: "Actor", image: "https://via.placeholder.com/50" },
];

const fakeMovies = [
    { id: 1, title: "Top Gun", year: 1986, actors: ["Tom Cruise"], image: "https://via.placeholder.com/100" },
    { id: 2, title: "Mission Impossible", year: 1996, actors: ["Tom Cruise"], image: "https://via.placeholder.com/100" },
    { id: 3, title: "Edge of Tomorrow", year: 2014, actors: ["Tom Cruise"], image: "https://via.placeholder.com/100" },
    { id: 4, title: "Jack Reacher", year: 2012, actors: ["Tom Cruise"], image: "https://via.placeholder.com/100" },
    { id: 5, title: "Oblivion", year: 2013, actors: ["Tom Cruise"], image: "https://via.placeholder.com/100" },
];

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showAllActors, setShowAllActors] = useState(false);
    const [showAllMovies, setShowAllMovies] = useState(false);

    useEffect(() => {
        if (query) {
            const filteredActors = fakeActors.filter((actor) =>
                actor.name.toLowerCase().includes(query.toLowerCase())
            );
            setActors(filteredActors);

            const filteredMovies = fakeMovies.filter(
                (movie) =>
                    movie.title.toLowerCase().includes(query.toLowerCase()) ||
                    movie.actors.some((actor) => actor.toLowerCase().includes(query.toLowerCase()))
            );
            setMovies(filteredMovies);
        }
    }, [query]);

    return (
        <div>
            <Navbar />
            <div className="p-6 mt-24 px-24 justify-center items-center">
                <h1 className="text-5xl font-bold mb-4">Search "{query}"</h1>

                {/* People Section */}
                <section className="mb-6 mt-24">
                    <h2 className="text-xl font-semibold mb-2">People</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        {actors.length > 0 ? (
                            <>
                                {actors.slice(0, showAllActors ? actors.length : 4).map((actor, index) => (
                                    <a 
                                        key={actor.id} 
                                        href={`#`} 
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

                {/* Movies Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-2 mt-24">Movies</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        {movies.length > 0 ? (
                            <>
                                {movies.slice(0, showAllMovies ? movies.length : 4).map((movie) => (
                                    <a 
                                        key={movie.id} 
                                        href={`#`} 
                                        className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-b-0 hover:bg-gray-200 p-2 rounded-md transition"
                                    >
                                        <img src={movie.image} alt={movie.title} className="w-[50px] h-[74px] mr-4 rounded-md" />
                                        <div>
                                            <h3 className="font-bold">{movie.title} ({movie.year})</h3>
                                            <p>Starring: {movie.actors.join(", ")}</p>
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
