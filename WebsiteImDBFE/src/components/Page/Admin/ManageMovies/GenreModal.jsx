import React from "react";

const GenreModal = ({ showGenreModal, setShowGenreModal, genres, movieData, handleGenreChange }) => {
  return (
    showGenreModal && (
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
    )
  );
};

export default GenreModal;