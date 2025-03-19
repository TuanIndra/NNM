const mongoose = require("mongoose");

if (mongoose.models.Actor) {
    delete mongoose.models.Actor;
}

const ActorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date },
    birthPlace: { type: String, default: "" },
    description: { type: String, default: "" },
    knownForMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],  // ✅ Lưu danh sách phim
    profileImage: { type: String },
    photos: [{ type: String, default: null }]  // ✅ Lưu danh sách ảnh liên quan (có thể để null)
});

module.exports = mongoose.model("Actor", ActorSchema);
