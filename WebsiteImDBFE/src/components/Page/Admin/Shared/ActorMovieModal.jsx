import React from "react";

const ActorMovieModal = ({
  showActorModal,
  setShowActorModal,
  actors = [], // Giá trị mặc định là mảng rỗng
  selectedActors = [], // Giá trị mặc định là mảng rỗng
  handleActorSelection,
  handleSaveActors,
}) => {
  if (!showActorModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-2">Chọn diễn viên</h3>
        <div className="max-h-64 overflow-y-auto">
          {Array.isArray(actors) && actors.length > 0 ? (
            actors.map((actor) => (
              <div key={actor?._id || Math.random()} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedActors.includes(actor?._id?.toString())}
                  onChange={() => handleActorSelection(actor?._id?.toString())}
                  className="mr-2"
                />
                <label>{actor?.name || "Diễn viên không xác định"}</label>
              </div>
            ))
          ) : (
            <p>Không có diễn viên nào để hiển thị</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowActorModal(false)}
            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
          >
            Hủy
          </button>
          <button onClick={handleSaveActors} className="bg-green-500 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorMovieModal;