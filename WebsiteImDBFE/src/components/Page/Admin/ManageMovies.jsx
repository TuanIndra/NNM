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
    const [movieData, setMovieData] = useState({
        title: "",
        description: "",
        releaseYear: "",
        genre: "",
        director: "",
        actors: "",
        poster: ""
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredMovies = movies.filter((movie) => {
        return (
            movie?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie?.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie?.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(movie.actors) && 
                movie.actors.some(actor => actor?.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    });
    
    

    const openAddModal = () => {
        setEditMode(false);
        setMovieData({ title: "", releaseYear: "", genre: "", director: "", actors: "", poster: "" });
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
            releaseYear: movie.releaseYear ? movie.releaseYear.toString() : "",  // ✅ Kiểm tra trước khi gọi .toString()
            genre: movie.genre || "",
            director: movie.director || "",
            actors: movie.actors ? movie.actors.join(", ") : "",
            poster: movie.poster || ""
        });
        setShowModal(true);
    };
    
    

    const handleInputChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    };

    const handleSaveMovie = async () => {
        if (!movieData.title || !movieData.description || !movieData.releaseYear || !movieData.genre || !movieData.director) {
            toast.warn("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
    
        const requestBody = {
            title: movieData.title,
            description: movieData.description,  // ✅ Bổ sung description
            releaseYear: parseInt(movieData.releaseYear),
            genre: movieData.genre,
            director: movieData.director,
            actors: movieData.actors.split(",").map(actor => actor.trim()), // ✅ Chia danh sách diễn viên
            poster: movieData.poster
        };
    
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
        }
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
                    {filteredMovies.map(movie => (
                        <tr key={movie._id} className="border-b text-center">
                            <td className="p-3">{movie.title}</td>
                            <td className="p-3">{movie.releaseYear}</td>
                            <td className="p-3">{movie.genre}</td>
                            <td className="p-3">{movie.actors.join(", ")}</td>
                            <td className="p-3">{movie.director || "Không rõ"}</td>
                            <td className="p-3 flex justify-center">
                                <button onClick={() => openEditModal(movie)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                    Sửa
                                </button>
                                <button onClick={() => handleDeleteMovie(movie._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">{editMode ? "Chỉnh sửa phim" : "Thêm phim mới"}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="title" placeholder="Tên phim" value={movieData.title} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="text" name="description" placeholder="Mô tả phim" value={movieData.description} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="number" name="releaseYear" placeholder="Năm phát hành" value={movieData.releaseYear} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="text" name="genre" placeholder="Thể loại" value={movieData.genre} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="text" name="director" placeholder="Đạo diễn" value={movieData.director} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="text" name="actors" placeholder="Diễn viên (cách nhau bởi dấu phẩy)" value={movieData.actors} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="text" name="poster" placeholder="URL Poster" value={movieData.poster} onChange={handleInputChange} className="border p-2 rounded" />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 mr-2 rounded">Hủy</button>
                            <button onClick={handleSaveMovie} className="bg-green-500 text-white px-4 py-2 rounded">Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMovies;
