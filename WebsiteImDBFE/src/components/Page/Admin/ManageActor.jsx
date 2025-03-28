import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActorTable from "./Shared/ActorTable";
import ActorModal from "./Shared/ActorModal";
import MovieSelectionModal from "./Shared/MovieSelectionModal";

const API_BASE_URL = "http://localhost:5000/api";
const ACTORS_API_URL = `${API_BASE_URL}/actors`;
const MOVIES_API_URL = `${API_BASE_URL}/movies`;

const ManageActor = () => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    actorName: "",
    birthDate: "",
    birthPlace: "",
    description: "", // Thêm description vào formData
    profileImage: "",
    knownForMovies: [],
    photos: [],
  });
  const [editingActor, setEditingActor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchActors(), fetchMovies()]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Không thể tải dữ liệu ban đầu!");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const fetchActors = useCallback(async () => {
    try {
      const response = await fetch(ACTORS_API_URL);
      if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
      const data = await response.json();
      setActors(data);
    } catch (error) {
      console.error("Error fetching actors:", error);
      toast.error("Lỗi khi tải danh sách diễn viên!");
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(MOVIES_API_URL);
      if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
      const data = await response.json();
      setMovies(data.movies || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Lỗi khi tải danh sách phim!");
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      actorName: "",
      birthDate: "",
      birthPlace: "",
      description: "", // Reset description
      profileImage: "",
      knownForMovies: [],
      photos: [],
    });
    setEditingActor(null);
    setSelectedMovies([]);
    setShowModal(false);
  }, []);

  const handleFormChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveActor = async () => {
    if (!formData.actorName.trim()) {
      toast.error("Tên diễn viên không được để trống!");
      return;
    }

    const actorData = {
      name: formData.actorName,
      birthDate: formData.birthDate ? formData.birthDate.split("T")[0] : "",
      birthPlace: formData.birthPlace,
      description: formData.description, // Thêm description vào dữ liệu gửi lên API
      profileImage: formData.profileImage,
      knownForMovies: formData.knownForMovies.map(String),
      photos: formData.photos,
    };

    try {
      const url = editingActor ? `${ACTORS_API_URL}/${editingActor._id}` : ACTORS_API_URL;
      const method = editingActor ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi lưu diễn viên");
      }

      toast.success(editingActor ? "Cập nhật diễn viên thành công!" : "Thêm diễn viên thành công!");
      resetForm();
      await fetchActors();
    } catch (error) {
      console.error("Error saving actor:", error);
      toast.error(`Lỗi khi lưu diễn viên: ${error.message}`);
    }
  };

  const handleDeleteActor = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa diễn viên này?")) return;

    try {
      const response = await fetch(`${ACTORS_API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Lỗi khi xóa diễn viên");
      toast.success("Xóa diễn viên thành công!");
      await fetchActors();
    } catch (error) {
      console.error("Error deleting actor:", error);
      toast.error("Lỗi khi xóa diễn viên!");
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (actor) => {
    setEditingActor(actor);
    setFormData({
      actorName: actor.name,
      birthDate: actor.birthDate ? actor.birthDate.split("T")[0] : "",
      birthPlace: actor.birthPlace || "",
      description: actor.description || "", // Load description từ actor
      profileImage: actor.profileImage || "",
      knownForMovies: actor.knownForMovies?.map((movie) => 
        typeof movie === "string" ? movie : movie._id.toString()
      ) || [],
      photos: actor.photos || [],
    });
    setSelectedMovies(
      actor.knownForMovies?.map((movie) => 
        typeof movie === "string" ? movie : movie._id.toString()
      ) || []
    );
    setShowModal(true);
  };

  const handleMovieSelection = (movieId) => {
    setSelectedMovies((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const handleSaveMovies = () => {
    setFormData((prev) => ({ ...prev, knownForMovies: selectedMovies }));
    setShowMovieModal(false);
  };

  const getMovieTitlesByIds = useCallback((movieData) => {
    if (!Array.isArray(movieData) || movieData.length === 0) return "N/A";

    const movieTitles = movieData.map((item) => {
      const movieId = typeof item === "object" ? item._id?.toString() : item.toString();
      const movie = movies.find((m) => m._id.toString() === movieId);
      return movie?.title || "Không xác định";
    });

    return movieTitles.join(", ") || "Không có phim";
  }, [movies]);

  const handleAddPhoto = (photoUrl) => {
    if (photoUrl && !formData.photos.includes(photoUrl)) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, photoUrl],
      }));
    }
  };

  const handleRemovePhoto = (photoUrl) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((url) => url !== photoUrl),
    }));
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
        actorName={formData.actorName}
        setActorName={handleFormChange("actorName")}
        birthDate={formData.birthDate}
        setBirthDate={handleFormChange("birthDate")}
        birthPlace={formData.birthPlace}
        setBirthPlace={handleFormChange("birthPlace")}
        description={formData.description} // Truyền description vào ActorModal
        setDescription={handleFormChange("description")} // Hàm cập nhật description
        profileImage={formData.profileImage}
        setProfileImage={handleFormChange("profileImage")}
        knownForMovies={formData.knownForMovies}
        photos={formData.photos}
        handleAddPhoto={handleAddPhoto}
        handleRemovePhoto={handleRemovePhoto}
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