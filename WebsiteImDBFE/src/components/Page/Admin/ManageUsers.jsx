import { useState } from "react";

const ManageUsers = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "Inception", year: 2010 },
        { id: 2, title: "Interstellar", year: 2014 }
    ]);

    const handleDelete = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    return (
        <div>
            <table className="w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3">ID</th>
                        <th className="p-3">Tên Phim</th>
                        <th className="p-3">Năm</th>
                        <th className="p-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id} className="border-b">
                            <td className="p-3">{movie.id}</td>
                            <td className="p-3">{movie.title}</td>
                            <td className="p-3">{movie.year}</td>
                            <td className="p-3">
                                <button onClick={() => handleDelete(movie.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
