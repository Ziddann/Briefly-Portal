const express = require('express');
const router = express.Router();
const pool = require('../db'); // Pastikan koneksi ke MySQL sudah benar

// Menambahkan komentar baru
router.post('/comments', async (req, res) => {
  const { userId, newsId, commentText, parentId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO comments (userId, newsId, commentText, parentId) VALUES (?, ?, ?, ?)',
      [userId, newsId, commentText, parentId || null]  // Menggunakan parentId jika ada, jika tidak maka null
    );
    res.status(200).json({ message: 'Comment added successfully', commentId: result.insertId });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Mengambil komentar berdasarkan ID berita (newsId)
router.get('/comments/:newsId', async (req, res) => {
  const newsId = req.params.newsId;

  try {
    const comments = await pool.query('SELECT * FROM comments WHERE newsId = ? ORDER BY createdAt DESC', [newsId]);
    res.status(200).json(comments); // Mengembalikan komentar dalam format JSON
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

module.exports = router;
