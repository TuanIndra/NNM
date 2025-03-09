const express = require("express");
const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, watchlistController.createWatchlist);
router.post("/add", authMiddleware, watchlistController.addMovieToWatchlist);
router.delete("/:watchlistId/movies/:movieId", authMiddleware, watchlistController.removeMovieFromWatchlist);
router.get("/", authMiddleware, watchlistController.getUserWatchlists);
router.get("/:watchlistId/movies", authMiddleware, watchlistController.getMoviesInWatchlist);
router.delete("/:watchlistId", authMiddleware, watchlistController.deleteWatchlist);

module.exports = router;
