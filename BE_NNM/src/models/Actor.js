const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên đầy đủ của diễn viên
    birthDate: { type: Date }, // Ngày sinh
    deathDate: { type: Date, default: null }, // Ngày mất (nếu có)
    birthPlace: { type: String, default: "" }, // Nơi sinh
    profession: { type: [String], default: [] }, // Nghề nghiệp (Actor, Director, etc.)
    knownForMovies: [{
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }, // Liên kết đến bảng Movie
        title: { type: String, required: true }, // Tên phim
        releaseYear: { type: Number, required: true }, // Năm phát hành
        genre: { type: String, required: true }, // Thể loại
        poster: { type: String, required: true } // Ảnh bìa phim
    }], // Danh sách phim nổi bật
    awards: [{ type: String, default: [] }], // Giải thưởng nhận được
    biography: { type: String, default: "" }, // Tiểu sử
    profileImage: { type: String, default: "" }, // Ảnh đại diện
    socialMediaLinks: { type: Map, of: String, default: {} }, // Liên kết mạng xã hội (Instagram, Twitter, etc.)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Actor", ActorSchema);
