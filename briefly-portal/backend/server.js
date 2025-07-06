const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const pool = require('./db');

const commentsRouter = require('./Route/comments'); // Router komentar
const authRouter = require('./Route/auth'); // Router autentikasi
const newsRouter = require('./Route/news');
const userRouter = require('./Route/profile');
const interactionRoute = require('./Route/interaction');


app.use(express.json());
app.use(cors()); // Mengaktifkan CORS untuk frontend
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// Register Routes
app.use('/api', commentsRouter); // API untuk komentar
app.use('/api', authRouter); // API untuk autentikasi
app.use('/api', newsRouter);
app.use('/api', userRouter);
app.use('/api', interactionRoute);



// Mulai server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

