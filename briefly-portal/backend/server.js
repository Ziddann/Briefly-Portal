const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const pool = require('./db');

const commentsRouter = require('./Route/comments'); // Router komentar
const authRouter = require('./Route/auth'); // Router autentikasi
const newsRouter = require('./Route/news');

app.use(express.json());
app.use(cors()); // Mengaktifkan CORS untuk frontend
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use('/api', commentsRouter); // API untuk komentar
app.use('/api', authRouter); // API untuk autentikasi
app.use('/api', newsRouter);

// Mulai server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

