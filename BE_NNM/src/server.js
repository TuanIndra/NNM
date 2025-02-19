const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Routes
app.use('/api/movies', require('./routes/movieRoutes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
