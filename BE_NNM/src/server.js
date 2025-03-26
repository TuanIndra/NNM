const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép CORS từ frontend
app.use(express.json()); // Parse JSON body

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require("./routes/searchRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const actorRoutes = require("./routes/actorRoutes");
const genreRoutes = require("./routes/genreRoutes");

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/genres", genreRoutes);

// Xử lý lỗi 404 cho các route không tồn tại
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Khởi động server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));