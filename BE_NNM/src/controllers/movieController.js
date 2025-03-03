const Movie = require('../models/Movie');

//lấy danh sách trailer phim
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().select("title poster actors genre ratings");
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

//thêm phim mới
exports.addMovie = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        console.error("Error adding movie:", err);
        res.status(400).json({ message: err.message });
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
