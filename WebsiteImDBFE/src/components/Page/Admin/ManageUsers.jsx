import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = "http://localhost:5000/api/users";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Lỗi khi tải danh sách người dùng");
            const data = await response.json();

            // 🛑 Chỉ hiển thị user, ẩn admin
            const filteredUsers = data.filter(user => user.role !== "admin");
            setUsers(filteredUsers);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditMode(false);
        setUserData({ name: "", email: "", password: "", role: "user" });
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditMode(true);
        setSelectedUser(user);
        setUserData({
            name: user.name || "",
            email: user.email || "",
            password: "", // Không hiển thị mật khẩu cũ
            role: user.role || "user"
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSaveUser = async () => {
        if (!userData.name || !userData.email || (!editMode && !userData.password)) {
            toast.warn("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const requestBody = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: "user" // 🛑 Chỉ cho phép tạo user
        };

        try {
            let response;
            if (editMode) {
                response = await fetch(`${API_URL}/${selectedUser._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                });
            } else {
                response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                });
            }

            if (!response.ok) throw new Error("Lỗi khi lưu người dùng");

            await fetchUsers();
            setShowModal(false);
            toast.success(editMode ? "Cập nhật thành công!" : "Thêm người dùng thành công!");
        } catch (error) {
            console.error("Lỗi khi lưu người dùng:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Lỗi khi xóa người dùng");

            await fetchUsers();
            toast.success("Xóa người dùng thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    };

    // 🔍 Lọc danh sách theo tìm kiếm
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-4">
            <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                Thêm Người Dùng
            </button>

            {/* 🔍 Ô tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
                }}
                className="border p-2 rounded w-full mb-4"
            />

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <>
                    <table className="w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 text-center">Họ Tên</th>
                                <th className="p-3 text-center">Email</th>
                                <th className="p-3 text-center">Vai Trò</th>
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user._id} className="border-b text-center">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3 flex justify-center">
                                        <button onClick={() => openEditModal(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                            Sửa
                                        </button>
                                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            Trang trước
                        </button>
                        <span>
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                        >
                            Trang sau
                        </button>
                    </div>
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-2">{editMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input type="text" name="name" placeholder="Họ Tên" value={userData.name} onChange={handleInputChange} className="border p-2 rounded" />
                            <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleInputChange} className="border p-2 rounded" />
                            {!editMode && (
                                <input type="password" name="password" placeholder="Mật khẩu" value={userData.password} onChange={handleInputChange} className="border p-2 rounded" />
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 mr-2 rounded">Hủy</button>
                            <button onClick={handleSaveUser} className="bg-green-500 text-white px-4 py-2 rounded">Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;