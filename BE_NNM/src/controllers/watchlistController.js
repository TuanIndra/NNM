const User = require("../models/User");
const Movie = require("../models/Movie");

// Thêm phim vào Watchlist
exports.addToWatchlist = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Phim không tồn tại" });

        if (user.watchlist.includes(movieId)) {
            return res.status(400).json({ message: "Phim đã có trong Watchlist" });
        }

        user.watchlist.push(movieId);
        await user.save();

        res.status(200).json({ message: "Thêm vào Watchlist thành công", watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa phim khỏi Watchlist
exports.removeFromWatchlist = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

        user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).json({ message: "Xóa khỏi Watchlist thành công", watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách Watchlist
exports.getWatchlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("watchlist", "title poster genre");
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

        res.status(200).json({ watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
