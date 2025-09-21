const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json()); // Cho phép server đọc JSON từ request body
app.use(cors()); // Cho phép cross-origin requests

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes); // Gắn routes vào path /api/todos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));