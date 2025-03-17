import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/movies";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false); // Thêm trạng thái isSaving
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [movieData, setMovieData] = useState({
        title: "",
        description: "",
        releaseYear: "",
        genre: [],
        director: "",
        actors: "",
        poster: "",
        trailer: "",
        bannerImage: "",
    });

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchMovies();
        fetchGenres();
        console.log("Movie data state after update:", movieData);
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/genres");
            if (!response.ok) throw new Error("Lỗi khi tải danh sách thể loại");
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách thể loại:", error);
            toast.error("Lỗi khi tải danh sách thể loại!");
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            toast.error("Lỗi khi tải danh sách phim!");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    };

    const filteredMovies = movies.filter((movie) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            movie?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie?.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie?.genre?.name?.toLowerCase().includes(searchLower) ||
            (Array.isArray(movie.actors) &&
                movie.actors.some(actor => actor?.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    });

    const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const openAddModal = () => {
        setEditMode(false);
        setMovieData({
            title: "",
            description: "",
            releaseYear: "",
            genre: [],
            director: "",
            actors: "",
            poster: "",
            trailer: "",
            bannerImage: ""
        });
        setShowModal(true);
    };

    const openEditModal = (movie) => {
        if (!movie || !movie.releaseYear) {
            console.error("Lỗi: movie hoặc releaseYear bị undefined", movie);
            return;
        }

        setEditMode(true);
        setSelectedMovie(movie);
        setMovieData({
            title: movie.title || "",
            description: movie.description || "",
            releaseYear: movie.releaseYear ? movie.releaseYear.toString() : "",
            genre: movie.genre ? movie.genre.map(g => g._id || g) : [],
            director: movie.director || "",
            actors: movie.actors ? movie.actors.join(", ") : "",
            poster: movie.poster || "",
            trailer: movie.trailer || "",
            bannerImage: movie.bannerImage || "",
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    };

    const handleSaveMovie = async () => {
        if (!movieData.title || !movieData.description || !movieData.releaseYear || !movieData.genre || !movieData.director || !movieData.trailer) {
            toast.warn("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Kiểm tra URL hợp lệ
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch (error) {
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

        const requestBody = {
            title: movieData.title,
            description: movieData.description,
            releaseYear: parseInt(movieData.releaseYear),
            genre: movieData.genre,
            director: movieData.director,
            actors: movieData.actors.split(",").map(actor => actor.trim()),
            poster: movieData.poster,
            trailer: movieData.trailer,
            bannerImage: movieData.bannerImage,
        };

        setIsSaving(true);

        try {
            let response;
            if (editMode) {
                response = await fetch(`${API_URL}/${selectedMovie._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                });
            } else {
                response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                });
            }

            if (!response.ok) throw new Error("Lỗi khi lưu phim");

            await fetchMovies();
            setShowModal(false);
            toast.success(editMode ? "Cập nhật phim thành công!" : "Thêm phim thành công!");
        } catch (error) {
            console.error("Lỗi khi lưu phim:", error);
            toast.error("Lỗi khi lưu phim!");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteMovie = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phim này?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Lỗi khi xóa phim");

            await fetchMovies();
            toast.success("Xóa phim thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa phim:", error);
            toast.error("Lỗi khi xóa phim!");
        }
    };

    const handleGenreChange = (genreId) => {
        setMovieData((prev) => {
            const currentGenres = prev.genre;
            if (currentGenres.includes(genreId)) {
                return { ...prev, genre: currentGenres.filter(id => id !== genreId) };
            } else {
                return { ...prev, genre: [...currentGenres, genreId] };
            }
        });
    };

    return (
        <div className="p-4">
            <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                Thêm Phim
            </button>
            <input
                type="text"
                placeholder="Tìm kiếm phim theo tên, đạo diễn, diễn viên..."
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
                            {currentMovies.map(movie => (
                                <tr key={movie._id} className="border-b text-center">
                                    <td className="p-3">{movie.title}</td>
                                    <td className="p-3">{movie.releaseYear}</td>
                                    <td className="p-3">
                                        {Array.isArray(movie.genre) ? movie.genre.map(g => g.name).join(", ") : "Không có thể loại"}
                                    </td>
                                    <td className="p-3">{Array.isArray(movie.actors) ? movie.actors.join(", ") : "Không có diễn viên"}</td>
                                    <td className="p-3">{movie.director || "Không rõ"}</td>
                                    <td className="p-3 flex justify-center">
                                        <button onClick={() => openEditModal(movie)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Sửa</button>
                                        <button onClick={() => handleDeleteMovie(movie._id)} className="bg-red-500 text-white px-3 py-1 rounded">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            Trang trước
                        </button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button
                            onClick={handleNextPage}
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
                                    value={movieData.genre.map(id => genres.find(g => g._id === id)?.name).filter(Boolean).join(", ")}
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
                            <input
                                type="text"
                                name="actors"
                                placeholder="Diễn viên (cách nhau bởi dấu phẩy)"
                                value={movieData.actors}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
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
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 mr-2 rounded">Hủy</button>
                            <button onClick={handleSaveMovie} disabled={isSaving} className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300">
                                {isSaving ? "Đang lưu..." : "Lưu"}
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
                            {genres.map(genre => (
                                <div key={genre._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={genre._id}
                                        checked={movieData.genre.includes(genre._id)}
                                        onChange={() => handleGenreChange(genre._id)}
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
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMovies;