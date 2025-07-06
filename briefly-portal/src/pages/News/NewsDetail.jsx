import EmojiPicker from 'emoji-picker-react';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import '../../styles/NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [replyToggles, setReplyToggles] = useState({});
  const [likeCount, setLikeCount] = useState(0);



  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && userId) setIsLoggedIn(true);

    setProfileImage(localStorage.getItem("profileImage") || "/default-avatar.png");
    setUserName(localStorage.getItem("userName") || "User");

    fetch(`http://localhost:5000/api/news/${id}`)
    .then(res => res.json())
    .then((data) => {
      setNews(data);
      setLikeCount(data.likes || 0);
    })
    .catch(err => console.error(err));
  

    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));

    fetch(`http://localhost:5000/api/news/${id}/liked/${userId}`)
      .then((res) => res.json())
      .then((data) => setIsLiked(data.liked))
      .catch((err) => console.error("Error checking like status:", err));

    fetch(`http://localhost:5000/api/news/${id}/bookmarked/${userId}`)
      .then((res) => res.json())
      .then((data) => setIsBookmarked(data.bookmarked))
      .catch((err) => console.error("Error checking bookmark status:", err));

  }, [id, userId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Please login to comment.");
    if (!newComment) return alert("Please enter a comment.");

    const newCommentData = {
      userId,
      newsId: id,
      commentText: newComment,
    };

    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });

      const data = await res.json();
      if (data.message) {
        fetch(`http://localhost:5000/api/comments/${id}`)
          .then((res) => res.json())
          .then((data) => setComments(data))
          .catch((err) => console.error("Error fetching comments:", err));

        setNewComment("");
        setProfileImage(localStorage.getItem("profileImage") || "/default-avatar.png");
        setUserName(localStorage.getItem("userName") || "User");
      } else {
        alert("Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn) return alert("Please login to like the news.");
  
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        setIsLiked(data.liked);
        setLikeCount(data.likes);  // totalLikes yang dikirim dari backend
      }
    } catch (err) {
      console.error("Error liking news:", err);
    }
  };
  
  

  const handleBookmark = async () => {
    if (!isLoggedIn) return alert("Please login to bookmark the news.");

    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.success) setIsBookmarked(data.bookmarked);
    } catch (err) {
      console.error("Error bookmarking news:", err);
    }
  };

  const handleReactComment = async (commentId, action) => {
    if (!isLoggedIn) return alert("Silakan login.");
  
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${commentId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        const updated = comments.map(c => {
          if (c.id === commentId) {
            return {
              ...c,
              likes: action === "like" ? (data.liked ? c.likes + 1 : c.likes - 1) : data.liked ? c.likes + 1 : c.likes - 1,
              dislikes: action === "dislike" ? (data.disliked ? c.dislikes + 1 : c.dislikes - 1) : data.disliked ? c.dislikes + 1 : c.dislikes - 1,
              userReact: data.liked ? "like" : data.disliked ? "dislike" : null,
            };
          }
          return c;
        });
  
        setComments(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
  
  const toggleReply = (commentId) => {
    setReplyToggles((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReply = async (parentId, replyText) => {
    if (!isLoggedIn) return alert("Silakan login untuk membalas.");
    if (!replyText) return alert("Isi balasan tidak boleh kosong.");
  
    try {
      const res = await fetch("http://localhost:5000/api/comments/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newsId: id,
          commentText: replyText,
          parentId
        })
      });
  
      const data = await res.json();
      if (data.success) {
        fetch(`http://localhost:5000/api/comments/${id}`)
          .then(res => res.json())
          .then(data => setComments(data));
      } else {
        alert("Gagal mengirim balasan");
      }
    } catch (err) {
      console.error("Error mengirim balasan:", err);
      alert("Terjadi kesalahan saat mengirim balasan");
    }
  };
  
  
  

  return (
    <>
      <Navbar />

      <div className="breadcrumb">
        <a href="/">Beranda</a> &gt; <a href="#">Politik</a> &gt; <span>{news?.title}</span>
      </div>

      <div className="container">

        <div className="meta-top">
          <span className="category-badge">POLITIK</span>
          <span className="dot">•</span>
          <span>{news?.time ? new Date(news.time).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</span>
          <span className="dot">•</span>
          <span>8 menit baca</span>
        </div>

        <h1 className="news-title">{news?.title}</h1>

        <div className="author-section">
          <img src={profileImage || "/default-avatar.png"} alt="Avatar" className="author-avatar" />
          <div>
            <p className="author-name">{userName}</p>
            <p className="author-role">Senior Political Reporter</p>
          </div>
        </div>

        <div className="action-buttons">
  <button onClick={handleLike}>
    {isLiked ? `💖 ${likeCount}` : `👍 ${likeCount} Like`}
  </button>
  <button onClick={handleBookmark}>
    {isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
  </button>
  <button>🔗 Share</button>
</div>


        <div className="news-image">
          {news?.imageUrl ? (
            <img src={news.imageUrl} alt="News" />
          ) : (
            <p>Gambar Utama - Presiden dalam Konferensi Pers</p>
          )}
        </div>

        <div className="news-content">
          <p className="intro">{news?.description || "Konten belum tersedia."}</p>
        </div>

        <hr className="divider" />

        <div className="comment-section">
  <div className="comment-header">
    <h3>Komentar ({comments.length})</h3>
    <select className="sort-select">
      <option>Terbaru</option>
      <option>Terlama</option>
    </select>
  </div>

  {isLoggedIn && (
    <div className="comment-input-wrapper">
      <img src={profileImage || "/default-avatar.png"} alt="Avatar" className="avatar" />
      <input
        className="comment-box"
        placeholder="Tulis komentar Anda..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="comment-tools">
        <button onClick={() => setNewComment(newComment + "😊")}>😊</button>
        <button onClick={() => alert("Fitur gambar belum tersedia")}>🖼️</button>
        <button className="submit-btn" onClick={handleCommentSubmit}>Kirim</button>
      </div>
    </div>
  )}

  <div className="comment-list">
    {comments.length > 0 ? (
      comments.slice(0, visibleCount).map((c) => (
        <div key={c.id} className="comment-item">
          <img src={c.profileImage || "/default-avatar.png"} alt="Avatar" className="avatar" />
          <div className="comment-content">
            
            {/* Meta Info */}
            <div className="comment-meta">
              <span className="comment-username">{c.username}</span>
              <span className="comment-time">{new Date(c.createdAt).toLocaleString("id-ID")}</span>
            </div>

            {/* Teks Komentar */}
            <p className="comment-text">{c.commentText}</p>

            {/* Tombol Aksi */}
            <div className="comment-actions">
  <button onClick={() => handleReactComment(c.id, "like")}>
    {c.userReact === "like" ? "💖" : "👍"} {c.likes}
  </button>
  <button onClick={() => handleReactComment(c.id, "dislike")}>
    {c.userReact === "dislike" ? "👎" : "👎"}
  </button>
</div>


            {/* Input Balasan */}
            {replyToggles[c.id] && (
              <div className="reply-input">
                <input
                  placeholder="Tulis balasan..."
                  value={c.replyText || ""}
                  onChange={(e) => {
                    const updated = comments.map((item) =>
                      item.id === c.id ? { ...item, replyText: e.target.value } : item
                    );
                    setComments(updated);
                  }}
                />
                <button onClick={() => handleReply(c.id, c.replyText)}>Kirim</button>
              </div>
            )}

            {/* Daftar Balasan */}
            {c.replies && c.replies.length > 0 && (
              <div className="reply-list">
                {c.replies.map((r) => (
                  <div key={r.id} className="reply-item">
                    <img src={r.profileImage || "/default-avatar.png"} alt="Avatar" className="avatar small" />
                    <div>
                      <span className="comment-username">{r.username}</span>
                      <span className="comment-time">{new Date(r.createdAt).toLocaleString("id-ID")}</span>
                      <p className="comment-text">{r.commentText}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      ))
    ) : (
      <p>Belum ada komentar.</p>
    )}
  </div>

  {visibleCount < comments.length && (
    <button className="load-more" onClick={() => setVisibleCount(visibleCount + 5)}>
      Muat Komentar Lainnya
    </button>
  )}
</div>



        <div className="related-articles">
          <h3>Artikel Terkait</h3>
          <div className="related-grid">

            <div className="related-item">
              <div className="related-image">Gambar Berita Ekonomi</div>
              <div className="related-info">
                <span className="related-category">EKONOMI</span>
                <h4 className="related-title">Dampak Kebijakan Fiskal Terhadap UMKM</h4>
                <p className="related-description">
                  Analisis mendalam tentang bagaimana kebijakan pemerintah mempengaruhi sektor usaha mikro...
                </p>
                <div className="related-meta">
                  <span>1 hari lalu</span>
                  <span>•</span>
                  <span>5 min baca</span>
                </div>
              </div>
            </div>

            <div className="related-item">
              <div className="related-image">Gambar Berita Teknologi</div>
              <div className="related-info">
                <span className="related-category">TEKNOLOGI</span>
                <h4 className="related-title">Digitalisasi Layanan Publik di Indonesia</h4>
                <p className="related-description">
                  Transformasi digital yang mengubah cara pemerintah melayani masyarakat...
                </p>
                <div className="related-meta">
                  <span>2 hari lalu</span>
                  <span>•</span>
                  <span>7 min baca</span>
                </div>
              </div>
            </div>

            <div className="related-item">
              <div className="related-image">Gambar Berita Sosial</div>
              <div className="related-info">
                <span className="related-category">SOSIAL</span>
                <h4 className="related-title">Program Bantuan Sosial: Evaluasi dan Proyeksi</h4>
                <p className="related-description">
                  Tinjauan komprehensif terhadap efektivitas program bantuan sos...
                </p>
                <div className="related-meta">
                  <span>3 hari lalu</span>
                  <span>•</span>
                  <span>6 min baca</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NewsDetail;
