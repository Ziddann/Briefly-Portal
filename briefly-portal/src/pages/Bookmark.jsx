import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Bookmark.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Bookmark() {
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const userId = localStorage.getItem('userId'); // Mengambil userId dari localStorage

  useEffect(() => {
    // Jika userId ada, ambil data bookmark dari backend
    if (userId) {
      axios
        .get(`http://localhost:5000/api/bookmarks/${userId}`)
        .then((response) => {
          setBookmarkedNews(response.data); // Set data bookmark yang diterima
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
          alert('Failed to fetch bookmarks');
        });
    } else {
      console.log('User not logged in');
      alert('Please log in to see your bookmarks');
    }
  }, [userId]); // Memastikan request ulang saat userId berubah

  return (
    <div className="bookmark-layout">
      <Navbar />
      <div className="bookmark-main" style={{ display: 'flex' }}>
        <div className="bookmark-content" style={{ flex: 1, padding: '1rem' }}>
          <h2>Bookmarked News</h2>
          <div className="bookmark-list">
            {bookmarkedNews.length > 0 ? (
              bookmarkedNews.map((news) => (
                <div key={news.id} className="bookmark-card">
                  <img src={news.imageUrl} alt={news.title} className="bookmark-image" />
                  <div className="bookmark-info">
                    <p className="bookmark-category">{news.category}</p>
                    <h3>{news.title}</h3>
                    <p className="bookmark-meta">By {news.author} • {news.date}</p>
                    <p className="bookmark-description">{news.description}</p>
                    <Link to={`/news/${news.id}`} className="bookmark-readmore">Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookmarked news yet</p> // Menampilkan pesan jika tidak ada berita yang dibookmark
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
