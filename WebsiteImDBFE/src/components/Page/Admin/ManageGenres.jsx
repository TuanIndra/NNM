import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GENRES_API_URL = "http://localhost:5000/api/genres";

const ManageGenres = () => {
    const [genres, setGenres] = useState([]);
    const [genreName, setGenreName] = useState("");
    const [editingGenre, setEditingGenre] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchGenres();
    }, []);

    // Lấy danh sách thể loại từ API
    const fetchGenres = async () => {
        try {
            const response = await fetch(GENRES_API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách thể loại");
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error("Lỗi khi tải thể loại:", error);
        }
    };

    // Thêm hoặc cập nhật thể loại
    const handleSaveGenre = async () => {
        if (!genreName.trim()) {
            toast.error("Tên thể loại không được để trống!");
            return;
        }

        try {
            const method = editingGenre ? "PUT" : "POST";
            const url = editingGenre ? `${GENRES_API_URL}/${editingGenre._id}` : GENRES_API_URL;
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: genreName })
            });
            
            if (!response.ok) throw new Error("Lỗi khi lưu thể loại");
            
            toast.success(editingGenre ? "Cập nhật thể loại thành công!" : "Thêm thể loại thành công!");
            setShowModal(false);
            setGenreName("");
            setEditingGenre(null);
            fetchGenres();
        } catch (error) {
            console.error("Lỗi khi lưu thể loại:", error);
            toast.error("Lỗi khi lưu thể loại");
        }
    };

    // Xóa thể loại
    const handleDeleteGenre = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa thể loại này?")) return;
        
        try {
            const response = await fetch(`${GENRES_API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Lỗi khi xóa thể loại");
            toast.success("Xóa thể loại thành công!");
            fetchGenres();
        } catch (error) {
            console.error("Lỗi khi xóa thể loại:", error);
            toast.error("Lỗi khi xóa thể loại");
        }
    };

    return (
        <div className="p-4">
            <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                Thêm Thể Loại
            </button>
            
            <table className="w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-center">Tên Thể Loại</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre._id} className="border-b text-center">
                            <td className="p-3">{genre.name}</td>
                            <td className="p-3 flex justify-center">
                                <button 
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => {
                                        setEditingGenre(genre);
                                        setGenreName(genre.name);
                                        setShowModal(true);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDeleteGenre(genre._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal thêm/sửa thể loại */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">{editingGenre ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}</h3>
                        <input 
                            type="text" 
                            placeholder="Tên thể loại" 
                            value={genreName} 
                            onChange={(e) => setGenreName(e.target.value)} 
                            className="border p-2 w-full rounded"
                        />
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 mr-2 rounded">Hủy</button>
                            <button onClick={handleSaveGenre} className="bg-green-500 text-white px-4 py-2 rounded">Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGenres;
