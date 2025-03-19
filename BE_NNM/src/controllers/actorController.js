const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find().populate("knownForMovies", "title releaseYear");
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách diễn viên", error });
    }
};

// Lấy thông tin chi tiết 1 diễn viên theo ID (bao gồm phim)
exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id)
            .populate("knownForMovies", "title releaseYear genre poster ratings trailer");
        if (!actor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin diễn viên", error });
    }
};

exports.createActor = async (req, res) => {
    try {
        const { name, birthDate, birthPlace, description, knownForMovies = [], profileImage, photos = [] } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Tên diễn viên là bắt buộc!" });
        }

        // Kiểm tra và lọc các Movie ID hợp lệ
        const validMovies = await Movie.find({ _id: { $in: knownForMovies } });
        const movieIds = validMovies.map((movie) => movie._id.toString());

        const newActor = new Actor({
            name,
            birthDate,
            birthPlace,
            description, // Thêm description vào dữ liệu khởi tạo
            knownForMovies: movieIds,
            profileImage,
            photos
        });

        const savedActor = await newActor.save();
        res.status(201).json(savedActor);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm diễn viên", error });
    }
};

// Cập nhật thông tin diễn viên theo ID
exports.updateActor = async (req, res) => {
    try {
        const { name, birthDate, birthPlace, description, knownForMovies, profileImage, photos } = req.body;

        // Lấy diễn viên hiện tại để giữ nguyên các trường nếu không có giá trị mới
        const existingActor = await Actor.findById(req.params.id);
        if (!existingActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });

        if (!name) {
            return res.status(400).json({ message: "Tên diễn viên là bắt buộc!" });
        }

        let movieIds = existingActor.knownForMovies.map((id) => id.toString());
        if (knownForMovies) {
            const validMovies = await Movie.find({ _id: { $in: knownForMovies } });
            movieIds = validMovies.map((movie) => movie._id.toString());

            // Xác định phim bị xóa và thêm
            const oldMovies = existingActor.knownForMovies.map((id) => id.toString());
            const moviesToRemove = oldMovies.filter((id) => !movieIds.includes(id));
            const moviesToAdd = movieIds.filter((id) => !oldMovies.includes(id));

            // Xóa actorId khỏi actors của các phim bị xóa
            if (moviesToRemove.length > 0) {
                await Movie.updateMany(
                    { _id: { $in: moviesToRemove } },
                    { $pull: { actors: req.params.id } }
                );
            }

            // Thêm actorId vào actors của các phim mới
            if (moviesToAdd.length > 0) {
                await Movie.updateMany(
                    { _id: { $in: moviesToAdd } },
                    { $addToSet: { actors: req.params.id } }
                );
            }
        }

        const updatedActor = await Actor.findByIdAndUpdate(
            req.params.id,
            {
                name,
                birthDate,
                birthPlace,
                description: description !== undefined ? description : existingActor.description, // Giữ nguyên nếu không có giá trị mới
                profileImage: profileImage || existingActor.profileImage,
                knownForMovies: movieIds,
                photos: photos || existingActor.photos
            },
            { new: true }
        ).populate("knownForMovies", "title releaseYear");

        res.status(200).json(updatedActor);
    } catch (error) {
        console.error("Error updating actor:", error);
        res.status(400).json({ message: "Lỗi khi cập nhật diễn viên", error });
    }
};

exports.deleteActor = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });

        // Xóa actorId khỏi actors của tất cả phim liên quan
        await Movie.updateMany(
            { actors: req.params.id },
            { $pull: { actors: req.params.id } }
        );

        res.status(200).json({ message: "Xóa diễn viên thành công" });
    } catch (error) {
        console.error("Error deleting actor:", error);
        res.status(500).json({ message: "Lỗi khi xóa diễn viên", error });
    }
};