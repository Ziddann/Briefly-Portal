const express = require('express');
const router = express.Router();
const pool = require('../db');  // Pastikan koneksi ke MySQL sudah benar

// Mengambil semua berita
router.get('/news', async (req, res) => {
  const query = 'SELECT * FROM news';  // Query untuk mengambil semua berita

  try {
    const [results] = await pool.query(query);  // Menggunakan async/await
    res.status(200).json(results);  // Mengembalikan hasil berita dalam format JSON
  } catch (err) {
    console.error('Error fetching news:', err);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Mengambil berita berdasarkan ID
router.get('/news/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM news WHERE id = ?';

  try {
    const [results] = await pool.query(query, [id]);  // Menggunakan async/await
    if (results.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(results[0]);  // Mengirimkan berita dengan ID yang sesuai
  } catch (err) {
    console.error('Error fetching news by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Menambahkan berita baru
router.post('/news', async (req, res) => {
  const { title, description, imageUrl, date } = req.body;

  const query = 'INSERT INTO news (title, description, imageUrl, date) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await pool.query(query, [title, description, imageUrl, date]);
    res.status(201).json({ message: 'News added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error inserting news:', err);
    return res.status(500).json({ error: 'Failed to insert news' });
  }
});

// Mengambil berita trending (berita dengan jumlah komentar dan like terbanyak)
// router.get('/trending', async (req, res) => {
//   const query = `
//     SELECT news.id, news.title, news.description, news.imageUrl, news.date, 
//            COUNT(comments.id) AS commentCount, 
//            IFNULL(SUM(news.likes), 0) AS likeCount
//     FROM news
//     LEFT JOIN comments ON comments.newsId = news.id
//     LEFT JOIN news_likes ON news_likes.newsId = news.id
//     GROUP BY news.id
//     ORDER BY commentCount DESC, likeCount DESC
//     LIMIT 3
//   `;

//   try {
//     const [results] = await pool.query(query);  // Menggunakan async/await
//     res.status(200).json(results);  // Mengembalikan hasil berita trending dalam format JSON
//   } catch (err) {
//     console.error('Error fetching trending news:', err);
//     return res.status(500).json({ error: 'Failed to fetch trending news' });
//   }
// });

module.exports = router;
