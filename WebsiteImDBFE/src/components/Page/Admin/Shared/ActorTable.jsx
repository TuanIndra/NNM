import React from "react";

const ActorTable = ({ actors, getMovieTitlesByIds, onEdit, onDelete, loading }) => {
  if (loading) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded">
      {actors.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Không có diễn viên nào</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-center">Tên</th>
              <th className="p-3 text-center">Ngày Sinh</th>
              <th className="p-3 text-center">Nơi Sinh</th>
              <th className="p-3 text-center">Phim Tham Gia</th>
              <th className="p-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor) => (
              <tr key={actor._id} className="border-b text-center">
                <td className="p-3">{actor.name || "N/A"}</td>
                <td className="p-3">
                  {actor.birthDate ? new Date(actor.birthDate).toLocaleDateString() : "N/A"}
                </td>
                <td className="p-3">{actor.birthPlace || "N/A"}</td>
                <td className="p-3">{getMovieTitlesByIds(actor.knownForMovies)}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => onEdit(actor)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => onDelete(actor._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActorTable;