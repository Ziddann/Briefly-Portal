import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/NewsDetail.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaThumbsUp, FaRegCommentDots, FaBookmark } from 'react-icons/fa';

function NewsDetail() {
  const { id } = useParams();  // Mengambil ID berita dari URL
  const [news, setNews] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userName, setUserName] = useState(''); // Menyimpan nama pengguna
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const userProfileImage = localStorage.getItem('profileImage');
    setProfileImage(userProfileImage || '/default-avatar.png');

    const userNameFromStorage = localStorage.getItem('userName'); // Ambil nama pengguna
    setUserName(userNameFromStorage || 'User');

    // Ambil data berita
    fetch(`http://localhost:5000/api/news/${id}`)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error('Error fetching news:', error));

    // Ambil komentar berdasarkan ID berita
    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));

    // Cek apakah artikel sudah dibookmark oleh pengguna
    fetch(`http://localhost:5000/api/bookmarks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const bookmarkedNews = data.find((item) => item.newsId === parseInt(id));
        if (bookmarkedNews) {
          setIsBookmarked(true);
        }
      })
      .catch((error) => console.error(error));
  }, [id, userId]);

  // Mengirimkan komentar ke backend
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please login to comment.');
      return;
    }

    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }

    const newComment = {
      userId: userId,
      newsId: id,
      commentText: commentText,
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      const data = await response.json();
      if (data.message) {
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentText('');  // Reset input komentar setelah dikirim
      } else {
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="news-detail-page">
        <main className="news-content">
          <Link to="/" className="close-button" title="Back to Home">×</Link>

          <input className="search-bar" placeholder="Search news..." />

          <div className="news-article">
            {news.imageUrl && (
              <img className="news-image" src={news.imageUrl} alt="News Visual" />
            )}
            <h2 className="news-title">{news.title}</h2>
            <p className="news-meta">
              By {news.author} • {news.date} • <span className="news-category">{news.category}</span>
            </p>

            {news.content && news.content.length > 0 ? (
              news.content.map((para, index) => (
                <p className="news-body" key={index}>{para}</p>
              ))
            ) : (
              <p>No content available.</p>
            )}

            {/* Like, Comment, and Bookmark */}
            <div className="news-actions">
              <button onClick={() => alert('Like functionality coming soon!')}><FaThumbsUp /> Like {news.likes}</button>
              <button onClick={handleCommentSubmit}><FaRegCommentDots /> Comment</button>
              <button onClick={() => alert('Bookmark functionality coming soon!')}><FaBookmark /> Bookmark</button>
            </div>

            {/* Comment Section */}
            <section className="comments-section">
              <h3>Comments</h3>
              <div className="comment-form">
                <img className="avatar" src={profileImage} alt="User" />
                <textarea
                  className="comment-input"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="comment-button" onClick={handleCommentSubmit}>Post Comment</button>
              </div>

              {/* Display Comments */}
              <div className="comment-list">
                {Array.isArray(comments) && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div className="comment" key={index}>
                      <div className="comment-header">
                        <img className="avatar" src={profileImage} alt="User" />
                        <p><strong>{userName}</strong></p>
                        <p className="comment-time">{new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                      <p className="comment-text">{comment.commentText}</p>
                      <div className="comment-actions">
                        <button onClick={() => alert('Like functionality coming soon!')}>👍 Like</button>
                        <button onClick={() => alert('Reply functionality coming soon!')}>💬 Reply</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default NewsDetail;
