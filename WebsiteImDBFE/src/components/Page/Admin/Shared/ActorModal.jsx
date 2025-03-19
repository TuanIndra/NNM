import React from "react";

const ActorModal = ({
  showModal,
  setShowModal,
  editingActor,
  actorName,
  setActorName,
  birthDate,
  setBirthDate,
  birthPlace,
  setBirthPlace,
  profileImage,
  setProfileImage,
  knownForMovies,
  getMovieTitlesByIds,
  movies,
  setShowMovieModal,
  handleSaveActor,
  resetForm,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-2">{editingActor ? "Chỉnh sửa diễn viên" : "Thêm diễn viên mới"}</h3>
        <input
          type="text"
          name="actorName"
          placeholder="Tên diễn viên"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Ngày sinh"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="text"
          name="birthPlace"
          placeholder="Nơi sinh"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="text"
          name="profileImage"
          placeholder="URL ảnh đại diện"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <div>
          <button
            onClick={() => setShowMovieModal(true)}
            className="border p-2 rounded w-full text-left"
          >
            {knownForMovies.length > 0
              ? getMovieTitlesByIds(
                  knownForMovies.map((id) => movies.find((m) => m._id.toString() === id) || { _id: id })
                )
              : "Chọn phim"}
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 mr-2 rounded">
            Hủy
          </button>
          <button onClick={handleSaveActor} className="bg-green-500 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorModal;