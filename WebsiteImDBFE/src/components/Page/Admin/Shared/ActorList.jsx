import { useEffect, useState } from "react";
import { ACTORS_API_URL, MOVIES_API_URL } from "../constants/apiConstants";
import ActorTable from "../components/Shared/ActorTable";

const ActorList = () => {
    const [actors, setActors] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch(ACTORS_API_URL);
                if (!response.ok) throw new Error("Lỗi khi tải danh sách diễn viên");
                const data = await response.json();
                console.log("Actors data with knownForMovies:", data);
                setActors(data);
            } catch (error) {
                console.error("Lỗi khi tải diễn viên:", error);
            }
        };

        const fetchMovies = async () => {
            try {
                const response = await fetch(MOVIES_API_URL);
                if (!response.ok) throw new Error("Lỗi khi tải danh sách phim");
                const data = await response.json();
                console.log("Movies data:", data.movies);
                setMovies(data.movies || []);
            } catch (error) {
                console.error("Lỗi khi tải phim:", error);
            }
        };

        fetchActors();
        fetchMovies();
    }, []);

    const handleEdit = (actor) => {
        console.log("Edit disabled in this view", actor);
    };

    const handleDelete = (id) => {
        console.log("Delete disabled in this view", id);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách diễn viên</h1>
            <ActorTable
                actors={actors}
                movies={movies}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ActorList;