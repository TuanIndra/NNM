const Movie = require("../models/Movie");
const Genre = require("../models/Genre");

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("genre", "name") // Lấy tên thể loại thay vì ObjectId
            .select("title poster actors genre releaseYear ratings director description");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate("genre", "name");
        if (!movie) return res.status(404).json({ message: "Không tìm thấy phim" });

        console.log("Movie data:", movie);
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { title, description, releaseYear, genre, director, actors, poster, trailer } = req.body;
        if (!title || !description || !releaseYear || !genre || !director) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        // Kiểm tra thể loại có tồn tại không
        const existingGenre = await Genre.findById(genre);
        if (!existingGenre) return res.status(400).json({ message: "Thể loại không hợp lệ!" });

        const movie = new Movie({ title, description, releaseYear, genre, director, actors, poster, trailer });
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
        const { genre } = req.body;

        // Kiểm tra thể loại có tồn tại không
        if (genre) {
            const existingGenre = await Genre.findById(genre);
            if (!existingGenre) return res.status(400).json({ message: "Thể loại không hợp lệ!" });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate("genre", "name");

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

// Tìm kiếm phim: Tìm theo tiêu đề, thể loại, diễn viên
exports.searchMovies = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
        }

        // Lấy danh sách thể loại có tên chứa từ khóa
        const genres = await Genre.find({ name: { $regex: query, $options: "i" } });
        const genreIds = genres.map(g => g._id); // Lấy danh sách ObjectId của thể loại

        // Tìm kiếm phim theo tiêu đề, diễn viên hoặc thể loại
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { actors: { $regex: query, $options: "i" } },
                { genre: { $in: genreIds } } // Tìm theo danh sách ObjectId của thể loại
            ]
        }).populate("genre", "name").select("title poster actors genre ratings");

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};