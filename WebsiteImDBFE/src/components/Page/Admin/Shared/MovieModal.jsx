import React from "react";

const MovieModal = ({
  showModal,
  setShowModal,
  editMode,
  movieData,
  handleInputChange,
  handleSaveMovie,
  isSaving,
  setShowActorModal,
  setShowGenreModal,
  getActorNamesByIds,
  getGenreNamesByIds,
}) => {
  return (
    showModal && (
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
                className="border p-2 rounded w-full text-left truncate"
              >
                {getActorNamesByIds(movieData.actors) || "Chọn diễn viên"}
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
              type="date"
              name="theatricalReleaseDate"
              placeholder="Ngày chiếu rạp"
              value={movieData.theatricalReleaseDate ? new Date(movieData.theatricalReleaseDate).toISOString().split("T")[0] : ""}
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
    )
  );
};

export default MovieModal;