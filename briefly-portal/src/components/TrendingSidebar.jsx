import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TrendingSidebar.css';
import '../styles/responsive.css';

function TrendingSidebar() {
  const [trendingNews, setTrendingNews] = useState([]);  // State untuk menyimpan berita tren

  useEffect(() => {
    // Fetch data trending news dari backend
    fetch('http://localhost:5000/api/trending')
      .then((response) => response.json())
      .then((data) => {
        setTrendingNews(data);  // Set data berita tren
      })
      .catch((error) => {
        console.error('Error fetching trending news:', error);
      });
  }, []);  // Menjalankan fetch saat komponen pertama kali dimuat

  return (
    <aside className="trending-section">
      <h3>Trending</h3>
      {trendingNews.length > 0 ? (
        trendingNews.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="news-card-horizontal"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={news.imageUrl} alt={news.title} className="news-thumb" />
            <div className="news-info">
              <h4 className="news-title">{news.title}</h4>
              <p className="news-date">{news.date}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No trending news available</p>
      )}
    </aside>
  );
}

export default TrendingSidebar;
