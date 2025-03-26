const Genre = require("../models/Genre");

// Lấy danh sách thể loại
exports.getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách thể loại" });
    }
};

// Thêm thể loại mới
exports.createGenre = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Tên thể loại không được để trống" });

        const existingGenre = await Genre.findOne({ name });
        if (existingGenre) return res.status(400).json({ error: "Thể loại đã tồn tại" });

        const newGenre = new Genre({ name });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi thêm thể loại" });
    }
};

// Cập nhật thể loại
exports.updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedGenre = await Genre.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedGenre) return res.status(404).json({ error: "Thể loại không tồn tại" });

        res.json(updatedGenre);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi cập nhật thể loại" });
    }
};

// Xóa thể loại
exports.deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGenre = await Genre.findByIdAndDelete(id);

        if (!deletedGenre) return res.status(404).json({ error: "Thể loại không tồn tại" });

        res.json({ message: "Xóa thể loại thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi xóa thể loại" });
    }
};
