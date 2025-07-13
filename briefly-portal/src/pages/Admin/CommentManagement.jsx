import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useNotification } from "../../components/Notification";
import "./Styles/CommentManagement.css";

function CommentManagement() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/comments/all");
      setComments(res.data);
    } catch (err) {
      showNotification("Gagal mengambil komentar", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    const confirm = window.confirm("Yakin ingin menghapus komentar ini?");
    if (!confirm) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/admin/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      showNotification("Komentar berhasil dihapus", "success");
    } catch (err) {
      showNotification("Gagal menghapus komentar", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-comments">
      <LoadingOverlay isLoading={loading} />

      <h2>Manajemen Komentar</h2>

      {comments.length === 0 ? (
        <p>Tidak ada komentar ditemukan.</p>
      ) : (
        <table className="comments-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Komentar</th>
              <th>Berita</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id}>
                <td>
                  <img src={c.profileImage} alt="avatar" className="avatar" />
                  <span>{c.username}</span>
                </td>
                <td>{c.commentText}</td>
                <td>{c.newsTitle || "-"}</td>
                <td>{new Date(c.createdAt).toLocaleString("id-ID")}</td>
                <td>
                  <button onClick={() => handleDelete(c.id)} className="delete-btn">
                    🗑 Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CommentManagement;
