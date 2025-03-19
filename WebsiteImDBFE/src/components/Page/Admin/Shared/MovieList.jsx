import React from "react";

const MovieList = ({
  movies,
  loading,
  currentPage,
  totalPages,
  setCurrentPage,
  openEditModal,
  handleDeleteMovie,
  getActorNamesByIds,
  getGenreNamesByIds,
}) => {
  const itemsPerPage = 6;
  const currentMovies = movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
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
              {currentMovies.map((movie) => (
                <tr key={movie._id} className="border-b text-center">
                  <td className="p-3">{movie.title}</td>
                  <td className="p-3">{movie.releaseYear}</td>
                  <td className="p-3">{getGenreNamesByIds(movie.genre)}</td>
                  <td className="p-3">{getActorNamesByIds(movie.actors)}</td>
                  <td className="p-3">{movie.director || "Không rõ"}</td>
                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => openEditModal(movie)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Trang trước
            </button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MovieList;