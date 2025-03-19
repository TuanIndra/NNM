import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActorTable from "./Shared/ActorTable";
import ActorModal from "./Shared/ActorModal";
import MovieSelectionModal from "./Shared/MovieSelectionModal";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchActors(), fetchMovies()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await fetch(ACTORS_API_URL);
      if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
      const data = await response.json();
      console.log("Actors data with knownForMovies:", data);
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
      console.log("Movies data:", data.movies);
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

  const openEditModal = (actor) => {
    setEditingActor(actor);
    setActorName(actor.name);
    setBirthDate(actor.birthDate ? actor.birthDate.split("T")[0] : "");
    setBirthPlace(actor.birthPlace || "");
    setProfileImage(actor.profileImage || "");
    setKnownForMovies(
      Array.isArray(actor.knownForMovies)
        ? actor.knownForMovies.map((movie) => (typeof movie === "string" ? movie : movie._id.toString()))
        : []
    );
    setSelectedMovies(
      Array.isArray(actor.knownForMovies)
        ? actor.knownForMovies.map((movie) => (typeof movie === "string" ? movie : movie._id.toString()))
        : []
    );
    setShowModal(true);
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
        return item.title;
      } else {
        const movieId = item.toString();
        const foundMovie = movies.find((m) => m._id.toString() === movieId);
        return foundMovie ? foundMovie.title : "Không xác định";
      }
    });

    return movieTitles.join(", ") || "Không có phim";
  };

  return (
    <div className="p-4">
      <button
        onClick={openAddModal}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600"
      >
        Thêm Diễn Viên
      </button>

      <ActorTable
        actors={actors}
        getMovieTitlesByIds={getMovieTitlesByIds}
        onEdit={openEditModal}
        onDelete={handleDeleteActor}
        loading={loading}
      />

      <ActorModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingActor={editingActor}
        actorName={actorName}
        setActorName={setActorName}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        birthPlace={birthPlace}
        setBirthPlace={setBirthPlace}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        knownForMovies={knownForMovies}
        getMovieTitlesByIds={getMovieTitlesByIds}
        movies={movies}
        setShowMovieModal={setShowMovieModal}
        handleSaveActor={handleSaveActor}
        resetForm={resetForm}
      />

      <MovieSelectionModal
        showMovieModal={showMovieModal}
        setShowMovieModal={setShowMovieModal}
        movies={movies}
        selectedMovies={selectedMovies}
        handleMovieSelection={handleMovieSelection}
        handleSaveMovies={handleSaveMovies}
      />
    </div>
  );
};

export default ManageActor;