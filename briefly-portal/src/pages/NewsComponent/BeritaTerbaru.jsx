import React, { useEffect, useState } from 'react';
import './Styles/BeritaTerbaru.css';

const BeritaTerbaru = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((response) => response.json())
      .then((data) => {
        // Urutkan berdasarkan id terbaru (paling besar) ke awal
        const sortedData = data.sort((a, b) => b.id - a.id);
        setNewsList(sortedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="berita-container">
      <div className="berita-header">
        <h2>Berita Terbaru</h2>
        <a href="#" className="lihat-semua">Lihat Semua</a>
      </div>
      <div className="berita-grid">
        {newsList.slice(0, 3).map((news) => (
          <div className="berita-card" key={news.id}>
            <img src={news.imageUrl} alt={news.title} className="berita-img" />
            <div className="berita-content">
              <div className="berita-meta">
                <span className="berita-tag">Berita</span>
                <span className="berita-time">{new Date(news.date).toLocaleDateString()}</span>
              </div>
              <h3 className="berita-title">{news.title}</h3>
              <p className="berita-desc">{news.description}</p>
              <div className="berita-author">Admin</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeritaTerbaru;
