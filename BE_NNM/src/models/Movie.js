const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Movie', MovieSchema);
