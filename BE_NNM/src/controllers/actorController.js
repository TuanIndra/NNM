const Actor = require("../models/Actor");

// Lấy danh sách tất cả diễn viên
exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách diễn viên", error });
    }
};

// Lấy thông tin chi tiết 1 diễn viên theo ID
exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin diễn viên", error });
    }
};

// Thêm mới một diễn viên
exports.createActor = async (req, res) => {
    try {
        const newActor = new Actor(req.body);
        const savedActor = await newActor.save();
        res.status(201).json(savedActor);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm diễn viên", error });
    }
};

// Cập nhật thông tin diễn viên theo ID
exports.updateActor = async (req, res) => {
    try {
        const updatedActor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật diễn viên", error });
    }
};

// Xóa diễn viên theo ID
exports.deleteActor = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) return res.status(404).json({ message: "Không tìm thấy diễn viên" });
        res.status(200).json({ message: "Xóa diễn viên thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa diễn viên", error });
    }
};
