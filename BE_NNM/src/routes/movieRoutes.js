const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.addMovie);


module.exports = router;