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
                console.log("Loại:", type, "Truy vấn:", query);
                const response = await fetch("http://localhost:5000/api/movies?limit=250");
                if (!response.ok) throw new Error("Không thể tải danh sách phim");
                const data = await response.json();
                const moviesArray = Array.isArray(data.movies) ? data.movies : [];
                console.log("Danh sách phim:", moviesArray);

                let filteredItems = [];
                switch (type.toLowerCase()) {
                    case "phim":
                        filteredItems = handleMovies(moviesArray, query);
                        break;

                    case "chươngtrìnhtv":
                        const tvShows = moviesArray.filter(movie => !movie.theatricalReleaseDate);
                        console.log("Chương trình TV:", tvShows);
                        filteredItems = handleTVShows(tvShows, query);
                        break;

                    case "xem":
                        filteredItems = handleWatch(moviesArray, query);
                        break;

                    case "giảithưởng&sựkiện":
                        filteredItems = handleAwards(moviesArray, query);
                        break;

                    case "ngườinổitiếng":
                        filteredItems = handleCelebs(moviesArray, query);
                        break;

                    case "cộngđồng":
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
            case "Lịch phát hành":
                return moviesArray
                    .filter(movie => movie.theatricalReleaseDate || movie.createdAt)
                    .sort((a, b) => new Date(b.theatricalReleaseDate || b.createdAt) - new Date(a.theatricalReleaseDate || a.createdAt))
                    .map(movie => formatMovie(movie));
            case "Top 250 phim":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 250)
                    .map(movie => formatMovie(movie));
            case "Phim phổ biến nhất":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Duyệt phim theo thể loại":
                return moviesArray.map(movie => formatMovie(movie));
            case "Doanh thu phòng vé cao nhất":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Lịch chiếu & Vé":
            case "Tin tức phim":
            case "Tiêu điểm phim Ấn Độ":
                return moviesArray.slice(0, 10).map(movie => formatMovie(movie));
            default:
                return moviesArray
                    .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleTVShows = (tvShows, query) => {
        switch (query) {
            case "Có gì trên TV & Streaming":
                return tvShows
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Top 250 chương trình TV":
                return tvShows
                    .filter(show => show.ratings && show.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 250)
                    .map(movie => formatMovie(movie));
            case "Chương trình TV phổ biến nhất":
                return tvShows
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 50)
                    .map(movie => formatMovie(movie));
            case "Duyệt chương trình TV theo thể loại":
                return tvShows.map(movie => formatMovie(movie));
            case "Tin tức TV":
                return tvShows.slice(0, 10).map(movie => formatMovie(movie));
            default:
                return tvShows
                    .filter(show => show.title.toLowerCase().includes(query.toLowerCase()))
                    .map(movie => formatMovie(movie));
        }
    };

    const handleWatch = (moviesArray, query) => {
        switch (query) {
            case "Xem gì":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Trailer mới nhất":
                return moviesArray
                    .filter(movie => movie.trailer)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie, true));
            case "Tác phẩm gốc IMDb":
                return moviesArray
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5)
                    .map(movie => formatMovie(movie));
            case "Lựa chọn IMDb":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Tiêu điểm IMDb":
                return moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map(movie => formatMovie(movie));
            case "Podcast IMDb":
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
            case "Liên hoan phim SXSW":
                return moviesArray
                    .filter(movie => movie.theatricalReleaseDate || movie.createdAt)
                    .sort((a, b) => new Date(b.theatricalReleaseDate || b.createdAt) - new Date(a.theatricalReleaseDate || a.createdAt))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Tháng lịch sử phụ nữ":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Giải thưởng STARmeter":
                return moviesArray
                    .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
                    .slice(0, 10)
                    .map(movie => formatMovie(movie));
            case "Trung tâm giải thưởng":
                return moviesArray
                    .filter(movie => movie.ratings && movie.ratings.length > 0)
                    .sort((a, b) => {
                        const aRating = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length;
                        const bRating = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length;
                        return bRating - aRating;
                    })
                    .slice(0, 15)
                    .map(movie => formatMovie(movie));
            case "Trung tâm liên hoan":
                return moviesArray
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 15)
                    .map(movie => formatMovie(movie));
            case "Tất cả sự kiện":
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
        let allActors = [];
        moviesArray.forEach(movie => {
            if (movie.actors && Array.isArray(movie.actors)) {
                allActors = allActors.concat(movie.actors);
            }
        });

        const uniqueActors = Array.from(new Map(allActors.map(actor => [actor._id || actor.name, actor])).values());

        switch (query) {
            case "Sinh ngày hôm nay":
                return uniqueActors
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 10)
                    .map(actor => formatActor(actor));
            case "Người nổi tiếng phổ biến nhất":
                const actorCount = {};
                allActors.forEach(actor => {
                    actorCount[actor._id || actor.name] = (actorCount[actor._id || actor.name] || 0) + 1;
                });
                return uniqueActors
                    .sort((a, b) => (actorCount[b._id || b.name] || 0) - (actorCount[a._id || a.name] || 0))
                    .slice(0, 10)
                    .map(actor => formatActor(actor));
            case "Tin tức người nổi tiếng":
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
        switch (query) {
            case "Trung tâm trợ giúp":
                return [
                    { id: "help1", title: "Hướng dẫn sử dụng IMDb", description: "Tìm hiểu cách sử dụng các tính năng của IMDb." },
                    { id: "help2", title: "Liên hệ hỗ trợ", description: "Gửi câu hỏi cho đội ngũ hỗ trợ của chúng tôi." }
                ].map(item => formatCommunity(item));
            case "Khu vực đóng góp":
                return [
                    { id: "contrib1", title: "Đóng góp nội dung", description: "Thêm thông tin phim hoặc diễn viên." },
                    { id: "contrib2", title: "Xếp hạng phim", description: "Đánh giá phim yêu thích của bạn." }
                ].map(item => formatCommunity(item));
            case "Thăm dò ý kiến":
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
                    {type && query ? `${type.charAt(0).toUpperCase() + type.slice(1)} - ${query}` : "Kết quả Menu"}
                </h1>

                <section>
                    <h2 className="text-xl font-semibold mb-2 mt-24">
                        {type === "chươngtrìnhtv" ? "Chương trình TV" :
                         type === "xem" ? "Xem" :
                         type === "giảithưởng&sựkiện" ? "Giải thưởng & Sự kiện" :
                         type === "ngườinổitiếng" ? "Người nổi tiếng" :
                         type === "cộngđồng" ? "Cộng đồng" : "Phim"}
                    </h2>
                    <div className="bg-gray-100 p-4 rounded">
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : items.length > 0 ? (
                            <>
                                {items.map((item) => (
                                    <a
                                        key={item.id}
                                        href={type === "ngườinổitiếng" ? `/actor/${item.id}` : type === "cộngđồng" ? `#${item.id}` : `/movie/${item.id}`}
                                        className="flex items-center mb-2 border-b border-gray-300 pb-2 last:border-b-0 hover:bg-gray-200 p-2 rounded-md transition"
                                    >
                                        {type !== "cộngđồng" && (
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
                                                        Xem Trailer
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </>
                        ) : (
                            <p>Không tìm thấy {type === "chươngtrìnhtv" ? "chương trình TV" : 
                                             type === "xem" ? "nội dung xem" : 
                                             type === "giảithưởng&sựkiện" ? "giải thưởng hoặc sự kiện" : 
                                             type === "ngườinổitiếng" ? "người nổi tiếng" : 
                                             type === "cộngđồng" ? "nội dung cộng đồng" : "phim"}.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MenuResultsPage;