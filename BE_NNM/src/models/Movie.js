const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    releaseYear: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }],
    director: { type: String, required: true, trim: true },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
    poster: { type: String, required: true, trim: true },
    trailer: { type: String, trim: true },
    ratings: [{ userId: String, rating: { type: Number, min: 1, max: 10 } }],
    comments: [{ userId: String, comment: String, date: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now },
    bannerImage: { type: String, trim: true },
});

module.exports = mongoose.model("Movie", MovieSchema);