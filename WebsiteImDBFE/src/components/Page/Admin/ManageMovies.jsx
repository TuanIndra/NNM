import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieList from "./Shared/MovieList";
import MovieModal from "./Shared/MovieModal";
import ActorMovieModal from "./Shared/ActorMovieModal";
import GenreModal from "./Shared/GenreModal";

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
    genre: [],
    director: "",
    actors: [],
    poster: "",
    trailer: "",
    bannerImage: "",
  });
  const [selectedActors, setSelectedActors] = useState([]);

  const token = localStorage.getItem("token");

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
      // Đảm bảo actors và genre là mảng ID
      const normalizedMovies = data.movies.map((movie) => ({
        ...movie,
        actors: movie.actors.map((a) => (typeof a === "object" ? a._id : a)),
        genre: movie.genre.map((g) => (typeof g === "object" ? g._id : g)),
      }));
      setMovies(normalizedMovies || []);
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
          (Array.isArray(movie.genre) && movie.genre.some((g) => g.name?.toLowerCase().includes(searchLower))) ||
          (Array.isArray(movie.actors) &&
            movie.actors.some((actor) =>
              (typeof actor === "object" ? actor.name : actors.find((a) => a._id === actor)?.name || "")
                ?.toLowerCase()
                .includes(searchLower)
            ))
        );
      })
    : [];

  const totalPages = Math.ceil(filteredMovies.length / 6);

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
      theatricalReleaseDate: "",
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
      theatricalReleaseDate: movie.theatricalReleaseDate || "",
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
      genre: prev.genre.includes(genreId) ? prev.genre.filter((id) => id !== genreId) : [...prev.genre, genreId],
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

  const getActorNamesByIds = (actorIds) => {
    if (!Array.isArray(actorIds) || actorIds.length === 0) return "Không có diễn viên";
    const actorNames = actorIds.map((id) => actors.find((a) => a._id.toString() === id.toString())?.name || "Không xác định");
    if (actorNames.length <= 3) return actorNames.join(", ");
    return `${actorNames.slice(0, 3).join(", ")}...`;
  };
  
  const getGenreNamesByIds = (genreIds) => {
    if (!Array.isArray(genreIds) || genreIds.length === 0) return "Không có thể loại";
    const genreNames = genreIds.map((id) => genres.find((g) => g._id.toString() === id.toString())?.name || "Không xác định");
    return genreNames.join(", ");
  };
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
      <MovieList
        movies={filteredMovies}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        openEditModal={openEditModal}
        handleDeleteMovie={handleDeleteMovie}
        getActorNamesByIds={getActorNamesByIds}
        getGenreNamesByIds={getGenreNamesByIds}
      />
      <MovieModal
        showModal={showModal}
        setShowModal={setShowModal}
        editMode={editMode}
        movieData={movieData}
        handleInputChange={handleInputChange}
        handleSaveMovie={handleSaveMovie}
        isSaving={isSaving}
        setShowActorModal={setShowActorModal}
        setShowGenreModal={setShowGenreModal}
        getActorNamesByIds={getActorNamesByIds}
        getGenreNamesByIds={getGenreNamesByIds}
      />
      <ActorMovieModal
        showActorModal={showActorModal}
        setShowActorModal={setShowActorModal}
        actors={actors}
        selectedActors={selectedActors}
        handleActorSelection={handleActorSelection}
        handleSaveActors={handleSaveActors}
      />
      <GenreModal
        showGenreModal={showGenreModal}
        setShowGenreModal={setShowGenreModal}
        genres={genres}
        movieData={movieData}
        handleGenreChange={handleGenreChange}
      />
    </div>
  );
};

export default ManageMovies;