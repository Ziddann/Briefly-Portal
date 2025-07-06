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

  try {
    // Ambil detail berita
    const [results] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    const newsDetail = results[0];

    // Ambil total likes
    const [likeRows] = await pool.query('SELECT COUNT(*) AS likes FROM news_likes WHERE newsId = ?', [id]);

    newsDetail.likes = likeRows[0].likes || 0;

    res.json(newsDetail);

  } catch (err) {
    console.error('Error fetching news by ID:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
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
router.get('/trending', async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT 
        n.id, 
        n.title, 
        n.imageUrl, 
        n.description, 
        DATE_FORMAT(n.date, '%d %M %Y') AS date,
        (SELECT COUNT(*) FROM news_likes WHERE newsId = n.id) AS totalLikes,
        (SELECT COUNT(*) FROM comments WHERE newsId = n.id) AS totalComments
      FROM news n
      ORDER BY totalLikes DESC, totalComments DESC
      LIMIT 5
    `);

    res.json(results);
  } catch (err) {
    console.error('Error fetching trending news:', err);
    res.status(500).json({ message: 'Gagal mengambil berita trending' });
  }
});

// GET berita berdasarkan kategori
router.get('/news/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    let query;
    let params = [];

    if (category === 'all') {
      // Ambil semua berita yang category-nya TIDAK NULL atau kosong
      query = "SELECT * FROM news WHERE category IS NOT NULL AND category != '' ORDER BY id DESC";
    } else {
      // Filter berdasarkan kategori tertentu
      query = 'SELECT * FROM news WHERE category = ? ORDER BY id DESC';
      params.push(category);
    }

    const [results] = await pool.query(query, params);
    res.json(results);
    
  } catch (err) {
    console.error('Error fetching news by category:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});




module.exports = router;
