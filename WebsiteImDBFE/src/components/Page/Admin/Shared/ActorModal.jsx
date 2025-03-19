import React, { useState } from "react";

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
  photos,
  handleAddPhoto,
  handleRemovePhoto,
  getMovieTitlesByIds,
  movies,
  setShowMovieModal,
  handleSaveActor,
  resetForm,
}) => {
  const [newPhotoUrl, setNewPhotoUrl] = useState(""); // State để lưu URL ảnh mới nhập

  if (!showModal) return null;

  // Hàm xử lý khi thêm ảnh
  const handleSubmitPhoto = () => {
    if (newPhotoUrl.trim()) {
      handleAddPhoto(newPhotoUrl.trim());
      setNewPhotoUrl(""); // Reset input sau khi thêm
    }
  };

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
        
        {/* Phần chọn phim */}
        <div>
          <button
            onClick={() => setShowMovieModal(true)}
            className="border p-2 rounded w-full text-left mb-2"
          >
            {knownForMovies.length > 0
              ? getMovieTitlesByIds(
                  knownForMovies.map((id) => movies.find((m) => m._id.toString() === id) || { _id: id })
                )
              : "Chọn phim"}
          </button>
        </div>

        {/* Phần quản lý photos */}
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Ảnh liên quan</h4>
          <div className="flex mb-2">
            <input
              type="text"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="Nhập URL ảnh"
              className="border p-2 w-full rounded mr-2"
            />
            <button
              onClick={handleSubmitPhoto}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Thêm
            </button>
          </div>
          {photos.length > 0 ? (
            <ul className="max-h-32 overflow-y-auto border p-2 rounded">
              {photos.map((photo, index) => (
                <li key={index} className="flex justify-between items-center mb-1">
                  <span className="truncate">{photo}</span>
                  <button
                    onClick={() => handleRemovePhoto(photo)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Chưa có ảnh nào</p>
          )}
        </div>

        {/* Nút điều khiển */}
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