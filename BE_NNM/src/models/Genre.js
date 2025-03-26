const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
    tmdbId: { type: Number, unique: true },
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Genre", GenreSchema);