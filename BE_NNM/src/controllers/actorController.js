const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

// 🟢 Lấy danh sách tất cả diễn viên (kèm danh sách phim)
exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find().populate("knownForMovies", "title releaseYear");
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách diễn viên", error });
    }
};

// 🟢 Lấy thông tin chi tiết 1 diễn viên theo ID (bao gồm phim)
exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id).populate("knownForMovies", "title releaseYear genre");
        if (!actor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin diễn viên", error });
    }
};

// 🟢 Thêm mới một diễn viên (có thể kèm danh sách phim)
exports.createActor = async (req, res) => {
    try {
        const { name, birthDate, birthPlace, knownForMovies = [] } = req.body;

        // Kiểm tra xem các Movie ID có hợp lệ không
        const validMovies = await Movie.find({ _id: { $in: knownForMovies } });
        const movieIds = validMovies.map(movie => movie._id);

        // Tạo Actor mới
        const newActor = new Actor({
            name,
            birthDate,
            birthPlace,
            knownForMovies: movieIds
        });

        const savedActor = await newActor.save();
        res.status(201).json(savedActor);
    } catch (error) {
        res.status400().json({ message: "Lỗi khi thêm diễn viên", error });
    }
};

// 🟢 Cập nhật thông tin diễn viên theo ID
exports.updateActor = async (req, res) => {
    try {
        const { name, birthDate, birthPlace, knownForMovies } = req.body;

        // Nếu có cập nhật danh sách phim, kiểm tra Movie ID hợp lệ
        let movieIds = [];
        if (knownForMovies) {
            const validMovies = await Movie.find({ _id: { $in: knownForMovies } });
            movieIds = validMovies.map(movie => movie._id);
        }

        const updatedActor = await Actor.findByIdAndUpdate(
            req.params.id,
            { name, birthDate, birthPlace, knownForMovies: movieIds.length ? movieIds : undefined },
            { new: true }
        );

        if (!updatedActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật diễn viên", error });
    }
};

// 🟢 Xóa diễn viên theo ID
exports.deleteActor = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json({ message: "Xóa diễn viên thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa diễn viên", error });
    }
};
