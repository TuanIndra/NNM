import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ACTORS_API_URL = "http://localhost:5000/api/actors";
const MOVIES_API_URL = "http://localhost:5000/api/movies";

const ManageActor = () => {
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [actorName, setActorName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [knownForMovies, setKnownForMovies] = useState([]);
    const [editingActor, setEditingActor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showMovieModal, setShowMovieModal] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState([]);

    useEffect(() => {
        fetchActors();
        fetchMovies();
    }, []);

    const fetchActors = async () => {
        try {
            const response = await fetch(ACTORS_API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
            const data = await response.json();
            console.log("Actors data with knownForMovies:", data); // Debug chi tiết
            setActors(data);
        } catch (error) {
            console.error("Lỗi khi tải diễn viên:", error);
            toast.error("Lỗi khi tải danh sách diễn viên!");
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch(MOVIES_API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
            const data = await response.json();
            console.log("Movies data:", data.movies); // Debug chi tiết
            setMovies(data.movies || []);
        } catch (error) {
            console.error("Lỗi khi tải phim:", error);
            toast.error("Lỗi khi tải danh sách phim!");
        }
    };

    const handleSaveActor = async () => {
        if (!actorName.trim()) {
            toast.error("Tên diễn viên không được để trống!");
            return;
        }

        const formattedBirthDate = birthDate ? birthDate.split("T")[0] : "";
        const normalizedKnownForMovies = knownForMovies.map((id) => id.toString());
        const actorData = {
            name: actorName,
            birthDate: formattedBirthDate,
            birthPlace,
            profileImage,
            knownForMovies: normalizedKnownForMovies,
        };

        try {
            let response;
            let actorId;
            if (editingActor) {
                response = await fetch(`${ACTORS_API_URL}/${editingActor._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(actorData),
                });
                actorId = editingActor._id;
            } else {
                response = await fetch(ACTORS_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(actorData),
                });
                const newActor = await response.json();
                actorId = newActor._id;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi khi lưu diễn viên");
            }

            toast.success(editingActor ? "Cập nhật diễn viên thành công!" : "Thêm diễn viên thành công!");
            resetForm();
            fetchActors();
        } catch (error) {
            console.error("Lỗi khi lưu diễn viên:", error);
            toast.error(`Lỗi khi lưu diễn viên: ${error.message}`);
        }
    };

    const handleDeleteActor = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa diễn viên này?")) return;

        try {
            const response = await fetch(`${ACTORS_API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Lỗi khi xóa diễn viên");
            toast.success("Xóa diễn viên thành công!");
            fetchActors();
        } catch (error) {
            console.error("Lỗi khi xóa diễn viên:", error);
            toast.error("Lỗi khi xóa diễn viên!");
        }
    };

    const resetForm = () => {
        setActorName("");
        setBirthDate("");
        setBirthPlace("");
        setProfileImage("");
        setKnownForMovies([]);
        setEditingActor(null);
        setSelectedMovies([]);
        setShowModal(false);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "actorName") setActorName(value);
        if (name === "birthDate") setBirthDate(value);
        if (name === "birthPlace") setBirthPlace(value);
        if (name === "profileImage") setProfileImage(value);
    };

    const handleMovieSelection = (movieId) => {
        setSelectedMovies((prev) =>
            prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
        );
    };

    const handleSaveMovies = () => {
        setKnownForMovies(selectedMovies);
        setShowMovieModal(false);
    };

    const getMovieTitlesByIds = (movieData) => {
        if (!Array.isArray(movieData) || movieData.length === 0) return "N/A";

        const movieTitles = movieData.map((item) => {
            if (typeof item === "object" && item.title) {
                // Trường hợp data từ populate (object)
                return item.title;
            } else {
                // Trường hợp data là ID
                const movieId = item.toString();
                const foundMovie = movies.find((m) => m._id.toString() === movieId);
                return foundMovie ? foundMovie.title : "Không xác định";
            }
        });

        return movieTitles.join(", ") || "Không có phim";
    };

    return (
        <div className="p-4">
            <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                Thêm Diễn Viên
            </button>

            <table className="w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-center">Tên Diễn Viên</th>
                        <th className="p-3 text-center">Ngày Sinh</th>
                        <th className="p-3 text-center">Nơi Sinh</th>
                        <th className="p-3 text-center">Phim Đã Tham Gia</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor) => (
                        <tr key={actor._id} className="border-b text-center">
                            <td className="p-3">{actor.name}</td>
                            <td className="p-3">
                                {actor.birthDate ? new Date(actor.birthDate).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="p-3">{actor.birthPlace || "N/A"}</td>
                            <td className="p-3">
                                {getMovieTitlesByIds(actor.knownForMovies)}
                            </td>
                            <td className="p-3 flex justify-center">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => {
                                        setEditingActor(actor);
                                        setActorName(actor.name);
                                        setBirthDate(actor.birthDate ? actor.birthDate.split("T")[0] : "");
                                        setBirthPlace(actor.birthPlace || "");
                                        setProfileImage(actor.profileImage || "");
                                        setKnownForMovies(
                                            Array.isArray(actor.knownForMovies)
                                                ? actor.knownForMovies.map((movie) =>
                                                      typeof movie === "string" ? movie : movie._id.toString()
                                                  )
                                                : []
                                        );
                                        setSelectedMovies(
                                            Array.isArray(actor.knownForMovies)
                                                ? actor.knownForMovies.map((movie) =>
                                                      typeof movie === "string" ? movie : movie._id.toString()
                                                  )
                                                : []
                                        );
                                        setShowModal(true);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                    onClick={() => handleDeleteActor(actor._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">
                            {editingActor ? "Chỉnh sửa diễn viên" : "Thêm diễn viên mới"}
                        </h3>
                        <input
                            type="text"
                            name="actorName"
                            placeholder="Tên diễn viên"
                            value={actorName}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded mb-2"
                        />
                        <input
                            type="date"
                            name="birthDate"
                            placeholder="Ngày sinh"
                            value={birthDate}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded mb-2"
                        />
                        <input
                            type="text"
                            name="birthPlace"
                            placeholder="Nơi sinh"
                            value={birthPlace}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded mb-2"
                        />
                        <input
                            type="text"
                            name="profileImage"
                            placeholder="URL ảnh đại diện"
                            value={profileImage}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded mb-2"
                        />
                        <div>
                            <button
                                onClick={() => setShowMovieModal(true)}
                                className="border p-2 rounded w-full text-left"
                            >
                                {knownForMovies.length > 0
                                    ? getMovieTitlesByIds(
                                          knownForMovies.map((id) =>
                                              movies.find((m) => m._id.toString() === id) || { _id: id }
                                          )
                                      )
                                    : "Chọn phim"}
                            </button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveActor}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showMovieModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">Chọn phim</h3>
                        <div className="max-h-64 overflow-y-auto">
                            {movies.map((movie) => (
                                <div key={movie._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMovies.includes(movie._id.toString())}
                                        onChange={() => handleMovieSelection(movie._id.toString())}
                                        className="mr-2"
                                    />
                                    <label>{movie.title}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowMovieModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveMovies}
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

export default ManageActor;