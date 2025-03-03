const express = require("express");
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get("/", movieController.searchMovies); // Tìm kiếm phim

module.exports = router;
