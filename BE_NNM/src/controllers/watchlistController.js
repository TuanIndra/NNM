const User = require("../models/User");
const Movie = require("../models/Movie");
const Watchlist = require("../models/Watchlist");

// Tạo watchlist
exports.createWatchlist = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId; // Lấy userId từ token

        const newWatchlist = new Watchlist({ 
            name, 
            description, 
            user: userId 
        });

        await newWatchlist.save();

        res.status(201).json({ 
            message: "Watchlist created successfully", 
            watchlist: newWatchlist 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Thêm phim vào Watchlist
exports.addMovieToWatchlist = async (req, res) => {
    try {
        const { watchlistId, movieId } = req.body;
        const userId = req.user.userId;

        const watchlist = await Watchlist.findOne({ _id: watchlistId, user: userId });
        if (!watchlist) return res.status(404).json({ message: "Watchlist not found" });

        if (watchlist.movies.includes(movieId)) {
            return res.status(400).json({ message: "Movie already in Watchlist" });
        }

        watchlist.movies.push(movieId);
        await watchlist.save();

        res.status(200).json({ message: "Movie added to Watchlist", watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa phim khỏi Watchlist
exports.removeMovieFromWatchlist = async (req, res) => {
    try {
        const { watchlistId, movieId } = req.params; // Lấy từ URL
        const userId = req.user.userId;

        const watchlist = await Watchlist.findOne({ _id: watchlistId, user: userId });
        if (!watchlist) return res.status(404).json({ message: "Watchlist not found" });

        // Kiểm tra và lọc mảng movies, đảm bảo id không phải null/undefined
        watchlist.movies = watchlist.movies.filter(id => id && id.toString() !== movieId);
        await watchlist.save();

        res.status(200).json({ message: "Movie removed from Watchlist", watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách Watchlist
exports.getUserWatchlists = async (req, res) => {
    try {
        const userId = req.user.userId; // Lấy userId từ token
        const watchlists = await Watchlist.find({ user: userId }).populate("movies", "title poster genre");

        res.status(200).json({ watchlists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách phim trong watchlist
exports.getMoviesInWatchlist = async (req, res) => {
    try {
        const { watchlistId } = req.params;

        const watchlist = await Watchlist.findById(watchlistId)
            .populate("movies", "title poster genre");

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist không tồn tại" });
        }

        res.status(200).json({ 
            watchlistName: watchlist.name,
            description: watchlist.description,
            movies: watchlist.movies 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa watchlist
exports.deleteWatchlist = async (req, res) => {
    try {
        const { watchlistId } = req.params;
        const userId = req.user.userId; // Lấy userId từ token

        const watchlist = await Watchlist.findOneAndDelete({ _id: watchlistId, user: userId });

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist không tồn tại hoặc bạn không có quyền xóa" });
        }

        res.status(200).json({ message: "Xóa Watchlist thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};