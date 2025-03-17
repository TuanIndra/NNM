const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");

exports.getMovies = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const movies = await Movie.find()
            .populate("genre", "name")
            .populate("actors", "name")
            .select("title poster actors genre releaseYear ratings director description createdAt bannerImage")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Movie.countDocuments();
        res.json({
            movies,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate("genre", "name")
            .populate("actors", "name");
        if (!movie) return res.status(404).json({ message: "Không tìm thấy phim" });

        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const { title, description, releaseYear, genre, director, actors, poster, trailer, bannerImage } = req.body;
        if (!title || !description || !releaseYear || !genre || !director) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        const existingGenre = await Genre.findById(genre);
        if (!existingGenre) return res.status(400).json({ message: "Thể loại không hợp lệ!" });

        const validActors = await Actor.find({ _id: { $in: actors } });
        if (validActors.length !== actors.length) {
            return res.status(400).json({ message: "Một hoặc nhiều diễn viên không hợp lệ!" });
        }

        const movie = new Movie({
            title,
            description,
            releaseYear,
            genre,
            director,
            actors,
            poster,
            trailer,
            bannerImage,
        });
        const savedMovie = await movie.save();

        // Cập nhật knownForMovies của các diễn viên
        await Actor.updateMany(
            { _id: { $in: actors } },
            { $addToSet: { knownForMovies: savedMovie._id } } // $addToSet tránh trùng lặp
        );

        res.status(201).json(savedMovie);
    } catch (err) {
        console.error("Error adding movie:", err);
        res.status(400).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { genre, actors } = req.body;

        if (genre) {
            const existingGenre = await Genre.findById(genre);
            if (!existingGenre) return res.status(400).json({ message: "Thể loại không hợp lệ!" });
        }

        const existingMovie = await Movie.findById(req.params.id);
        if (!existingMovie) return res.status(404).json({ message: "Không tìm thấy phim" });

        if (actors) {
            const validActors = await Actor.find({ _id: { $in: actors } });
            if (validActors.length !== actors.length) {
                return res.status(400).json({ message: "Một hoặc nhiều diễn viên không hợp lệ!" });
            }

            // Xác định diễn viên bị xóa và thêm
            const oldActors = existingMovie.actors.map((id) => id.toString());
            const actorsToRemove = oldActors.filter((id) => !actors.includes(id));
            const actorsToAdd = actors.filter((id) => !oldActors.includes(id));

            // Xóa movieId khỏi knownForMovies của các diễn viên bị xóa
            if (actorsToRemove.length > 0) {
                await Actor.updateMany(
                    { _id: { $in: actorsToRemove } },
                    { $pull: { knownForMovies: req.params.id } }
                );
            }

            // Thêm movieId vào knownForMovies của các diễn viên mới
            if (actorsToAdd.length > 0) {
                await Actor.updateMany(
                    { _id: { $in: actorsToAdd } },
                    { $addToSet: { knownForMovies: req.params.id } }
                );
            }
        }

        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("genre", "name")
            .populate("actors", "name");

        res.json(updatedMovie);
    } catch (err) {
        console.error("Error updating movie:", err);
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Không tìm thấy phim để xóa" });
        }

        // Xóa movieId khỏi knownForMovies của tất cả diễn viên liên quan
        await Actor.updateMany(
            { knownForMovies: req.params.id },
            { $pull: { knownForMovies: req.params.id } }
        );

        res.json({ message: "Xóa phim thành công!" });
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.searchMovies = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
        }

        const genres = await Genre.find({ name: { $regex: query, $options: "i" } });
        const genreIds = genres.map((g) => g._id);

        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { director: { $regex: query, $options: "i" } },
                { genre: { $in: genreIds } },
            ],
        })
            .populate("genre", "name")
            .populate("actors", "name")
            .select("title poster actors genre ratings");

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};