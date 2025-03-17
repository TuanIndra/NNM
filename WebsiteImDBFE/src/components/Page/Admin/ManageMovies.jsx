import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/movies";
const ACTORS_API_URL = "http://localhost:5000/api/actors";
const GENRES_API_URL = "http://localhost:5000/api/genres";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showActorModal, setShowActorModal] = useState(false);
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const [movieData, setMovieData] = useState({
        title: "",
        description: "",
        releaseYear: "",
        genre: [], // Mảng để lưu nhiều thể loại
        director: "",
        actors: [],
        poster: "",
        trailer: "",
        bannerImage: "",
    });
    const [selectedActors, setSelectedActors] = useState([]);

    const token = localStorage.getItem("token");
    const itemsPerPage = 6;

    useEffect(() => {
        fetchMovies();
        fetchGenres();
        fetchActors();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(GENRES_API_URL, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error("Lỗi khi tải danh sách thể loại");
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách thể loại!");
            console.error(error);
        }
    };

    const fetchActors = async () => {
        try {
            const response = await fetch(ACTORS_API_URL, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
            const data = await response.json();
            setActors(data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách diễn viên!");
            console.error(error);
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${API_URL}?page=1&limit=100`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
            const data = await response.json();
            setMovies(data.movies || []);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách phim!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredMovies = Array.isArray(movies)
        ? movies.filter((movie) => {
              const searchLower = searchTerm.toLowerCase();
              return (
                  movie?.title?.toLowerCase().includes(searchLower) ||
                  movie?.director?.toLowerCase().includes(searchLower) ||
                  (Array.isArray(movie.genre) && movie.genre.some(g => g.name?.toLowerCase().includes(searchLower))) ||
                  (Array.isArray(movie.actors) &&
                      movie.actors.some((actor) =>
                          (typeof actor === "object" ? actor.name : actors.find(a => a._id === actor)?.name || "")
                              ?.toLowerCase()
                              .includes(searchLower)
                      ))
              );
          })
        : [];

    const currentMovies = filteredMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

    const openAddModal = () => {
        setEditMode(false);
        setMovieData({
            title: "",
            description: "",
            releaseYear: "",
            genre: [],
            director: "",
            actors: [],
            poster: "",
            trailer: "",
            bannerImage: "",
        });
        setSelectedActors([]);
        setShowModal(true);
    };

    const openEditModal = (movie) => {
        setEditMode(true);
        setSelectedMovie(movie);
        const initialActors = Array.isArray(movie.actors)
            ? movie.actors.map((actor) => (typeof actor === "object" ? actor._id.toString() : actor.toString()))
            : [];
        const initialGenres = Array.isArray(movie.genre)
            ? movie.genre.map((g) => (typeof g === "object" ? g._id.toString() : g.toString()))
            : [];
        setMovieData({
            title: movie.title || "",
            description: movie.description || "",
            releaseYear: movie.releaseYear ? movie.releaseYear.toString() : "",
            genre: initialGenres,
            director: movie.director || "",
            actors: initialActors,
            poster: movie.poster || "",
            trailer: movie.trailer || "",
            bannerImage: movie.bannerImage || "",
        });
        setSelectedActors(initialActors);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleActorSelection = (actorId) => {
        setSelectedActors((prev) =>
            prev.includes(actorId) ? prev.filter((id) => id !== actorId) : [...prev, actorId]
        );
    };

    const handleSaveActors = () => {
        setMovieData({ ...movieData, actors: selectedActors });
        setShowActorModal(false);
    };

    const handleGenreChange = (genreId) => {
        setMovieData((prev) => ({
            ...prev,
            genre: prev.genre.includes(genreId)
                ? prev.genre.filter((id) => id !== genreId)
                : [...prev.genre, genreId],
        }));
    };

    const handleSaveMovie = async () => {
        if (!movieData.title || !movieData.description || !movieData.releaseYear || !movieData.genre.length || !movieData.director || !movieData.trailer) {
            toast.warn("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }

        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (movieData.poster && !isValidUrl(movieData.poster)) {
            toast.warn("URL Poster không hợp lệ!");
            return;
        }
        if (movieData.trailer && !isValidUrl(movieData.trailer)) {
            toast.warn("Link trailer không hợp lệ!");
            return;
        }

        const requestBody = { ...movieData, releaseYear: parseInt(movieData.releaseYear) };
        setIsSaving(true);

        try {
            const response = await fetch(editMode ? `${API_URL}/${selectedMovie._id}` : API_URL, {
                method: editMode ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi khi lưu phim");
            }

            await fetchMovies();
            setShowModal(false);
            toast.success(editMode ? "Cập nhật phim thành công!" : "Thêm phim thành công!");
        } catch (error) {
            toast.error(`Lỗi khi lưu phim: ${error.message}`);
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteMovie = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phim này?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error("Lỗi khi xóa phim");

            await fetchMovies();
            toast.success("Xóa phim thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa phim!");
            console.error(error);
        }
    };

    const getActorNamesByIds = (actorIds) =>
        Array.isArray(actorIds) && actorIds.length > 0
            ? actorIds.map((id) => actors.find((a) => a._id.toString() === id.toString())?.name || "Không xác định").join(", ")
            : "Không có diễn viên";

    const getGenreNamesByIds = (genreIds) =>
        Array.isArray(genreIds) && genreIds.length > 0
            ? genreIds.map((id) => genres.find((g) => g._id.toString() === id.toString())?.name || "Không xác định").join(", ")
            : "Không có thể loại";

    return (
        <div className="p-4">
            <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                Thêm Phim
            </button>
            <input
                type="text"
                placeholder="Tìm kiếm phim theo tên, đạo diễn, thể loại, diễn viên..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full mb-4"
            />
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <>
                    <table className="w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 text-center">Tên Phim</th>
                                <th className="p-3 text-center">Năm</th>
                                <th className="p-3 text-center">Thể loại</th>
                                <th className="p-3 text-center">Diễn viên</th>
                                <th className="p-3 text-center">Đạo diễn</th>
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMovies.map((movie) => (
                                <tr key={movie._id} className="border-b text-center">
                                    <td className="p-3">{movie.title}</td>
                                    <td className="p-3">{movie.releaseYear}</td>
                                    <td className="p-3">{Array.isArray(movie.genre) ? movie.genre.map(g => g.name).join(", ") : "Không có thể loại"}</td>
                                    <td className="p-3">{Array.isArray(movie.actors) ? movie.actors.map(a => a.name).join(", ") : "Không có diễn viên"}</td>
                                    <td className="p-3">{movie.director || "Không rõ"}</td>
                                    <td className="p-3 flex justify-center">
                                        <button
                                            onClick={() => openEditModal(movie)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMovie(movie._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            Trang trước
                        </button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            Trang sau
                        </button>
                    </div>
                </>
            )}

            {/* Modal thêm/sửa phim */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">{editMode ? "Chỉnh sửa phim" : "Thêm phim mới"}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Tên phim"
                                value={movieData.title}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Mô tả phim"
                                value={movieData.description}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <input
                                type="number"
                                name="releaseYear"
                                placeholder="Năm phát hành"
                                value={movieData.releaseYear}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={getGenreNamesByIds(movieData.genre)}
                                    readOnly
                                    placeholder="Thể loại đã chọn"
                                    className="border p-2 rounded mb-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowGenreModal(true)}
                                    className="border p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    Chọn thể loại
                                </button>
                            </div>
                            <input
                                type="text"
                                name="director"
                                placeholder="Đạo diễn"
                                value={movieData.director}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <div>
                                <button
                                    onClick={() => setShowActorModal(true)}
                                    className="border p-2 rounded w-full text-left"
                                >
                                    {movieData.actors.length > 0 ? getActorNamesByIds(movieData.actors) : "Chọn diễn viên"}
                                </button>
                            </div>
                            <input
                                type="text"
                                name="poster"
                                placeholder="URL Poster"
                                value={movieData.poster}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="trailer"
                                placeholder="Link trailer"
                                value={movieData.trailer}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="bannerImage"
                                placeholder="URL Banner Image"
                                value={movieData.bannerImage}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveMovie}
                                disabled={isSaving}
                                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                            >
                                {isSaving ? "Đang lưu..." : "Lưu"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chọn diễn viên */}
            {showActorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">Chọn diễn viên</h3>
                        <div className="max-h-64 overflow-y-auto">
                            {actors.map((actor) => (
                                <div key={actor._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedActors.includes(actor._id.toString())}
                                        onChange={() => handleActorSelection(actor._id.toString())}
                                        className="mr-2"
                                    />
                                    <label>{actor.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowActorModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                Hủy
                            </button>
                            <button onClick={handleSaveActors} className="bg-green-500 text-white px-4 py-2 rounded">
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chọn thể loại */}
            {showGenreModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">Chọn thể loại</h3>
                        <div className="max-h-64 overflow-y-auto">
                            {genres.map((genre) => (
                                <div key={genre._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={genre._id}
                                        checked={movieData.genre.includes(genre._id.toString())}
                                        onChange={() => handleGenreChange(genre._id.toString())}
                                        className="mr-2"
                                    />
                                    <label htmlFor={genre._id}>{genre.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowGenreModal(false)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMovies;