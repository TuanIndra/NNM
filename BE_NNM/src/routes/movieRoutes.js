const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", movieController.getMovies);  
router.get("/count", movieController.getMoviesCount); // Thêm endpoint đếm số phim
router.get("/:id", movieController.getMovieById); 
router.post("/", movieController.addMovie); 
router.put("/:id", movieController.updateMovie); 
router.delete("/:id", movieController.deleteMovie); 
router.get("/search", movieController.searchMovies); 
router.put("/:id/rate", authMiddleware, movieController.rateMovie);

router.get("/", authMiddleware, async (req, res) => {
    const movies = await Movie.find();
    res.json({ movies });
});
module.exports = router;