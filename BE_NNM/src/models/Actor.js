const mongoose = require('mongoose');
if (mongoose.models.Actor) {
    delete mongoose.models.Actor;
}
const ActorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date },
    birthPlace: { type: String, default: "" },
    knownForMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], 
    profileImage: { type: String }
});

module.exports = mongoose.model("Actor", ActorSchema);
