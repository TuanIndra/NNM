const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const mongoose = require("mongoose");

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("genre", "name") // Lấy tên thể loại thay vì ObjectId
            .select("title poster actors genre releaseYear ratings director description createdAt bannerImage");
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
      const { title, description, releaseYear, genre, director, actors, poster, trailer, bannerImage } = req.body;
      if (!title || !description || !releaseYear || !genre || !director) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
      }
  
      // Kiểm tra genre là mảng và mỗi phần tử là ObjectId hợp lệ
      if (!Array.isArray(genre) || genre.length === 0 || !genre.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ message: "Genre phải là mảng các ObjectId hợp lệ!" });
      }
  
      // Kiểm tra tất cả thể loại có tồn tại không
      const existingGenres = await Genre.find({ _id: { $in: genre } });
      if (existingGenres.length !== genre.length) {
        return res.status(400).json({ message: "Một hoặc nhiều thể loại không tồn tại!" });
      }
  
      const movie = new Movie({ title, description, releaseYear, genre, director, actors, poster, trailer, bannerImage });
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
  
      if (genre) {
        if (!Array.isArray(genre) || !genre.every(id => mongoose.Types.ObjectId.isValid(id))) {
          return res.status(400).json({ message: "Genre phải là mảng các ObjectId hợp lệ!" });
        }
        const existingGenres = await Genre.find({ _id: { $in: genre } });
        if (existingGenres.length !== genre.length) {
          return res.status(400).json({ message: "Một hoặc nhiều thể loại không tồn tại!" });
        }
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

// Thêm hàm xử lý rating
exports.rateMovie = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.userId; // Lấy userId từ token qua authMiddleware

    try {
        console.log("Rating request:", { id, userId, rating });
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: 'Phim không tồn tại' });

        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            return res.status(400).json({ message: 'Đánh giá phải là số nguyên từ 1 đến 10' });
        }

        const existingRatingIndex = movie.ratings.findIndex(r => r.userId === userId);
        if (existingRatingIndex !== -1) {
            movie.ratings[existingRatingIndex].rating = rating;
        } else {
            movie.ratings.push({ userId, rating });
        }

        const updatedMovie = await movie.save();
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error("Error rating movie:", error.stack);
        res.status(500).json({ message: 'Lỗi server', error });
    }
};