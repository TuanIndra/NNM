const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    actors: [{ type: String }],
    poster: { type: String, required: true },
    trailer: { type: String },
    ratings: [{ userId: String, rating: Number }],
    comments: [{ userId: String, comment: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Movie', MovieSchema);
