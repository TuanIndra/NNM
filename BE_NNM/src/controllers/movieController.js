const Movie = require('../models/Movie');
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().select("title poster actors genre releaseYear ratings");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//lấy tên phim theo id
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // Kiểm tra dữ liệu đầu vào
        const { title, description, releaseYear, genre, director, actors, poster } = req.body;
        if (!title || !description || !releaseYear || !genre || !director) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        // Tạo và lưu phim mới
        const movie = new Movie({ title, description, releaseYear, genre, director, actors, poster });
        const savedMovie = await movie.save();

        res.status(201).json(savedMovie);
    } catch (err) {
        console.error("Error adding movie:", err);
        res.status(400).json({ message: err.message });
    }
};
exports.updateMovie = async (req, res) => {
    try {
        console.log("Updating movie:", req.params.id);
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: "Không tìm thấy phim để cập nhật" });
        }

        res.json(updatedMovie);
    } catch (err) {
        console.error("Error updating movie:", err);
        res.status(400).json({ message: err.message });
    }
};
exports.deleteMovie = async (req, res) => {
    try {
        console.log("Deleting movie:", req.params.id);
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ message: "Không tìm thấy phim để xóa" });
        }

        res.json({ message: "Xóa phim thành công!" });
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(500).json({ message: err.message });
    }
};


// Tìm kiếm phim: Cho phép người dùng tìm kiếm phim theo tiêu đề, thể loại, diễn viên
exports.searchMovies = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
        }

        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
                { actors: { $regex: query, $options: "i" } }
            ]
        }).select("title poster actors genre ratings");

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
