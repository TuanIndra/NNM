const Movie = require('../models/Movie'); // Import model

// API lấy danh sách phim
const getMovies = async (req, res) => {
    try {
        console.log("Lấy danh sách phim...");
        const movies = await Movie.find(); // Lấy tất cả phim từ database
        res.json(movies); 
    } catch (error) {
        console.error("Lỗi khi lấy phim:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// API tạo phim mới
const createMovie = async (req, res) => {
    try {
        console.log("Dữ liệu nhận được:", req.body); // Log dữ liệu gửi lên

        const newMovie = new Movie(req.body); // Tạo phim mới từ dữ liệu nhận được
        await newMovie.save(); // Lưu vào database

        console.log("Phim đã lưu vào DB:", newMovie);
        res.status(201).json({ message: 'Movie created', data: newMovie });
    } catch (error) {
        console.error("Lỗi khi tạo phim:", error);
        res.status(400).json({ message: 'Lỗi khi tạo phim' });
    }
};

module.exports = { getMovies, createMovie };
