import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const MenuResultsPage = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const query = searchParams.get("query");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!type || !query) return;

            setLoading(true);
            setError(null);

            try {
                console.log("Type:", type, "Query:", query);
                const response = await fetch("http://localhost:5000/api/movies?limit=250");
                if (!response.ok) throw new Error("Không thể tải danh sách phim");
                const data = await response.json();
                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                console.log("Movies fetched:", moviesArray);

                let filteredItems = [];
                switch (type.toLowerCase()) {
                    case "movies":
                        filteredItems = handleMovies(moviesArray, query);
                        break;

                    case "tvshows":
                        const tvShows = moviesArray.filter(movie => !movie.theatricalReleaseDate);
                        console.log("Filtered TV Shows:", tvShows);
                        filteredItems = handleTVShows(tvShows, query);
                        break;

                    case "watch":
                        filteredItems = handleWatch(moviesArray, query);
                        break;

                    case "awards":
                        filteredItems = handleAwards(moviesArray, query);
                        break;

                    case "celebs":
                        filteredItems = handleCelebs(moviesArray, query);
                        break;

                    case "community":
                        filteredItems = handleCommunity(moviesArray, query);
                        break;

                    default:
                        throw new Error("Chưa hỗ trợ loại dữ liệu này");
                }

                setItems(filteredItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, query]);

    const handleMovies = (moviesArray, query) => {
        switch (query) {
            case "Release Calendar":
                return moviesArray
                    .filter(movie => movie.theatricalReleaseDate || movie.createdAt)
                    .sort((a, b) => new Date(b.theatricalReleaseDate || b.createdAt) - new Date(a.theatricalReleaseDate || a.createdAt))
                    .map(movie => formatMovie(movie));
            case "Top 250 Movies":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 250)
                    .map(movie => formatMovie(movie));
            case "Most Popular Movies":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Browse Movies by Genre":
                return moviesArray.map(movie => formatMovie(movie));
            case "Top Box Office":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Showtimes & Tickets":
            case "Movie News":
            case "India Movie Spotlight":
                return moviesArray.slice(0, 10).map(movie => formatMovie(movie));
            default:
                return moviesArray
                    .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleTVShows = (tvShows, query) => {
        switch (query) {
            case "What's on TV & Streaming":
                return tvShows
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Top 250 TV Shows":
                return tvShows
                    .filter(show => show.ratings && show.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 250)
                    .map(movie => formatMovie(movie));
            case "Most Popular TV Shows":
                return tvShows
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Browse TV Shows by Genre":
                return tvShows.map(movie => formatMovie(movie));
            case "TV News":
                return tvShows.slice(0, 10).map(movie => formatMovie(movie));
            default:
                return tvShows
                    .filter(show => show.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleWatch = (moviesArray, query) => {
        switch (query) {
            case "What to Watch":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Latest Trailers":
                return moviesArray
                    .filter(movie => movie.trailer)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie, true));
            case "IMDb Originals":
                return moviesArray
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5)
                    .map(movie => formatMovie(movie));
            case "IMDb Picks":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "IMDb Spotlight":
                return moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map(movie => formatMovie(movie));
            case "IMDb Podcasts":
                return moviesArray
                    .slice(0, 5)
                    .map(movie => formatMovie(movie));
            default:
                return moviesArray
                    .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleAwards = (moviesArray, query) => {
        switch (query) {
            case "Oscars":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "SXSW Film Festival":
                return moviesArray
                    .filter(movie => movie.theatricalReleaseDate || movie.createdAt)
                    .sort((a, b) => new Date(b.theatricalReleaseDate || b.createdAt) - new Date(a.theatricalReleaseDate || a.createdAt))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Women's History Month":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "STARmeter Awards":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Awards Central":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 15)
                    .map(movie => formatMovie(movie));
            case "Festival Central":
                return moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 15)
                    .map(movie => formatMovie(movie));
            case "All Events":
                return moviesArray
                    .slice(0, 20)
                    .map(movie => formatMovie(movie));
            default:
                return moviesArray
                    .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleCelebs = (moviesArray, query) => {
        // Thu thập tất cả diễn viên từ moviesArray
        let allActors = [];
        moviesArray.forEach(movie => {
            if (movie.actors && Array.isArray(movie.actors)) {
                allActors = allActors.concat(movie.actors);
            }
        });

        // Loại bỏ trùng lặp dựa trên _id hoặc name
        const uniqueActors = Array.from(new Map(allActors.map(actor => [actor._id || actor.name, actor])).values());

        switch (query) {
            case "Born Today":
                // Giả lập: Lấy diễn viên có ngày sinh gần với hôm nay (March 22, 2025)
                // Vì không có birthDate, lấy ngẫu nhiên 10 người
                return uniqueActors
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 10)
                    .map(actor => formatActor(actor));

            case "Most Popular Celebs":
                // Giả lập: Lấy diễn viên xuất hiện nhiều nhất trong moviesArray
                const actorCount = {};
                allActors.forEach(actor => {
                    actorCount[actor._id || actor.name] = (actorCount[actor._id || actor.name] || 0) + 1;
                });
                return uniqueActors
                    .sort((a, b) => (actorCount[b._id || b.name] || 0) - (actorCount[a._id || a.name] || 0))
                    .slice(0, 10)
                    .map(actor => formatActor(actor));

            case "Celebrity News":
                // Giả lập: Lấy 5 diễn viên ngẫu nhiên
                return uniqueActors
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5)
                    .map(actor => formatActor(actor));

            default:
                return uniqueActors
                    .filter(actor => actor.name.toLowerCase().includes(query.toLowerCase()))
                    .map(actor => formatActor(actor));
        }
    };

    const handleCommunity = (moviesArray, query) => {
        // Giả lập dữ liệu cộng đồng vì không có API riêng
        switch (query) {
            case "Help Center":
                return [
                    { id: "help1", title: "Hướng dẫn sử dụng IMDb", description: "Tìm hiểu cách sử dụng các tính năng của IMDb." },
                    { id: "help2", title: "Liên hệ hỗ trợ", description: "Gửi câu hỏi cho đội ngũ hỗ trợ của chúng tôi." }
                ].map(item => formatCommunity(item));

            case "Contributor Zone":
                return [
                    { id: "contrib1", title: "Đóng góp nội dung", description: "Thêm thông tin phim hoặc diễn viên." },
                    { id: "contrib2", title: "Xếp hạng phim", description: "Đánh giá phim yêu thích của bạn." }
                ].map(item => formatCommunity(item));

            case "Polls":
                return [
                    { id: "poll1", title: "Phim hay nhất 2025", description: "Bình chọn cho phim bạn yêu thích nhất năm nay." },
                    { id: "poll2", title: "Diễn viên xuất sắc", description: "Ai là diễn viên nổi bật nhất?" }
                ].map(item => formatCommunity(item));

            default:
                return moviesArray
                    .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const formatMovie = (movie, showTrailer = false) => ({
        id: movie._id,
        title: movie.title,
        year: movie.releaseYear || "N/A",
        image: movie.poster || "https://via.placeholder.com/100",
        actors: movie.actors ? movie.actors.map(actor => actor.name).join(", ") : "N/A",
        trailer: showTrailer && movie.trailer ? movie.trailer : null,
    });

    const formatActor = (actor) => ({
        id: actor._id || actor.name,
        name: actor.name,
        image: actor.image || "https://via.placeholder.com/100",
        knownFor: actor.knownFor || "N/A",
    });

    const formatCommunity = (item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
    });

    return (
        <div>
            <Navbar />
            <div className="p-6 mt-24 px-24 justify-center items-center">
                <h1 className="text-5xl font-bold mb-4">
                    {type && query ? `${type.charAt(0).toUpperCase() + type.slice(1)} - ${query}` : "Menu Results"}
                </h1>

                <section>
                    <h2 className="text-xl font-semibold mb-2 mt-24">
                        {type === "tvshows" ? "TV Shows" :
                         type === "watch" ? "Watch" :
                         type === "awards" ? "Awards & Events" :
                         type === "celebs" ? "Celebs" :
                         type === "community" ? "Community" : "Movies"}
                    </h2>
                    <div className="bg-gray-100 p-4 rounded">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : items.length > 0 ? (
                            <>
                                {items.map((item) => (
                                    <a
                                        key={item.id}
                                        href={type === "celebs" ? `/actor/${item.id}` : type === "community" ? `#${item.id}` : `/movie/${item.id}`}
                                        className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-b-0 hover:bg-gray-200 p-2 rounded-md transition"
                                    >
                                        {type !== "community" && (
                                            <img
                                                src={item.image}
                                                alt={item.title || item.name}
                                                className="w-[50px] h-[74px] rounded-md mr-4"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-bold">
                                                {item.title || item.name} {item.year ? `(${item.year})` : ""}
                                            </h3>
                                            <p>{item.actors || item.knownFor || item.description || "N/A"}</p>
                                            {item.trailer && (
                                                <p>
                                                    <a href={item.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                        Watch Trailer
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </>
                        ) : (
                            <p>No {type === "tvshows" ? "TV Shows" : 
                                    type === "watch" ? "watch items" : 
                                    type === "awards" ? "awards or events" : 
                                    type === "celebs" ? "celebs" : 
                                    type === "community" ? "community items" : "movies"} found.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MenuResultsPage;