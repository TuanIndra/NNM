const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require("./routes/searchRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/watchlist", watchlistRoutes);