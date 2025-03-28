const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getGenres);
router.post("/", genreController.createGenre);
router.put("/:id", genreController.updateGenre);
router.delete("/:id", genreController.deleteGenre);

module.exports = router;
