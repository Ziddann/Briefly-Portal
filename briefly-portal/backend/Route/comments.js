const express = require('express');
const router = express.Router();
const pool = require('../db'); // Koneksi database

// Tambah Komentar
router.post('/comments', async (req, res) => {
  const { userId, newsId, commentText } = req.body;

  if (!userId || !newsId || !commentText) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO comments (userId, newsId, commentText, createdAt) VALUES (?, ?, ?, NOW())',
      [userId, newsId, commentText]
    );

    res.json({ message: 'Comment added successfully', commentId: result.insertId });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Ambil Komentar Berdasarkan Berita
router.get('/comments/:newsId', async (req, res) => {
  const newsId = req.params.newsId;

  try {
    // Komentar utama
    const [parentComments] = await pool.query(`
      SELECT c.id, c.commentText, c.createdAt, c.likes, c.dislikes, u.name AS username, u.profileImage
      FROM comments c
      JOIN users u ON c.userId = u.id
      WHERE c.newsId = ? AND c.parentId IS NULL
      ORDER BY c.createdAt ASC
    `, [newsId]);

    const formattedParents = parentComments.map(c => ({
      ...c,
      profileImage: c.profileImage ? `http://localhost:5000/uploads/${c.profileImage}` : '/default-avatar.png',
      replies: []
    }));

    // Balasan komentar
    const [allReplies] = await pool.query(`
      SELECT c.id, c.commentText, c.createdAt, c.parentId, c.likes, c.dislikes, u.name AS username, u.profileImage
      FROM comments c
      JOIN users u ON c.userId = u.id
      WHERE c.newsId = ? AND c.parentId IS NOT NULL
      ORDER BY c.createdAt ASC
    `, [newsId]);

    allReplies.forEach(reply => {
      const parent = formattedParents.find(p => p.id === reply.parentId);
      if (parent) {
        parent.replies.push({
          id: reply.id,
          commentText: reply.commentText,
          createdAt: reply.createdAt,
          username: reply.username,
          profileImage: reply.profileImage ? `http://localhost:5000/uploads/${reply.profileImage}` : '/default-avatar.png'
        });
      }
    });

    res.status(200).json(formattedParents);

  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// Balas Komentar
router.post("/comments/reply", async (req, res) => {
  const { userId, newsId, parentId, commentText } = req.body;
  if (!userId || !newsId || !parentId || !commentText)
    return res.status(400).json({ message: "Data tidak lengkap" });

  try {
    await pool.query(
      "INSERT INTO comments (newsId, userId, parentId, commentText, createdAt) VALUES (?, ?, ?, ?, NOW())",
      [newsId, userId, parentId, commentText]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error saat balas komentar:", err);
    res.status(500).json({ error: "Gagal membalas komentar" });
  }
});

// Like/Dislike Komentar
router.post("/comments/:commentId/react", async (req, res) => {
  const { commentId } = req.params;
  const { userId, action } = req.body;

  if (!['like', 'dislike'].includes(action)) {
    return res.status(400).json({ error: "Aksi tidak valid" });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM comment_likes WHERE commentId = ? AND userId = ?",
      [commentId, userId]
    );

    if (existing.length > 0) {
      const currentStatus = existing[0].status;

      if (currentStatus === action) {
        await pool.query("DELETE FROM comment_likes WHERE commentId = ? AND userId = ?", [commentId, userId]);
        const field = action === 'like' ? 'likes' : 'dislikes';
        await pool.query(`UPDATE comments SET ${field} = ${field} - 1 WHERE id = ?`, [commentId]);

        return res.json({ success: true, liked: false, disliked: false });
      } else {
        await pool.query(
          "UPDATE comment_likes SET status = ? WHERE commentId = ? AND userId = ?",
          [action, commentId, userId]
        );

        if (action === 'like') {
          await pool.query("UPDATE comments SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = ?", [commentId]);
        } else {
          await pool.query("UPDATE comments SET dislikes = dislikes + 1, likes = likes - 1 WHERE id = ?", [commentId]);
        }

        return res.json({ success: true, liked: action === 'like', disliked: action === 'dislike' });
      }
    } else {
      await pool.query(
        "INSERT INTO comment_likes (commentId, userId, status) VALUES (?, ?, ?)",
        [commentId, userId, action]
      );

      const field = action === 'like' ? 'likes' : 'dislikes';
      await pool.query(`UPDATE comments SET ${field} = ${field} + 1 WHERE id = ?`, [commentId]);

      return res.json({ success: true, liked: action === 'like', disliked: action === 'dislike' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
