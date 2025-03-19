import React from "react";

const MovieSelectionModal = ({
  showMovieModal,
  setShowMovieModal,
  movies,
  selectedMovies,
  handleMovieSelection,
  handleSaveMovies,
}) => {
  if (!showMovieModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">Chọn phim</h3>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {movies.length === 0 ? (
            <p className="text-gray-500">Không có phim nào để hiển thị</p>
          ) : (
            movies.map((movie) => (
              <div key={movie._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMovies.includes(movie._id.toString())}
                  onChange={() => handleMovieSelection(movie._id.toString())}
                  className="mr-2 h-4 w-4"
                />
                <label>{movie.title}</label>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => setShowMovieModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={handleSaveMovies}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSelectionModal;