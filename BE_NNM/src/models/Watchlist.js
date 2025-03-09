const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên của Watchlist
    description: { type: String, default: "" }, // Mô tả Watchlist
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người sở hữu
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Danh sách phim
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
