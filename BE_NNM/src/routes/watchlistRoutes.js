const express = require("express");
const watchlistController = require("../controllers/watchlistController");

const router = express.Router();

router.post("/add", watchlistController.addToWatchlist); // Thêm phim vào Watchlist
router.post("/remove", watchlistController.removeFromWatchlist); // Xóa phim khỏi Watchlist
router.get("/:userId", watchlistController.getWatchlist); // Lấy danh sách Watchlist của người dùng

module.exports = router;
