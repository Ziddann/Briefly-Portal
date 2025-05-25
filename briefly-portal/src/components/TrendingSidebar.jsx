import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TrendingSidebar.css';

function TrendingSidebar() {
  const trendingNews = [
    {
      id: 1,
      title: 'Crashed Lion Air Jet Had Faulty Speed Readings',
      date: 'July 21, 2023',
      imageUrl: 'https://via.placeholder.com/90x60'
    },
    {
      id: 2,
      title: 'Palembang to inaugurate quake-proof bridge next month',
      date: 'July 20, 2023',
      imageUrl: 'https://via.placeholder.com/90x60'
    },
    {
      id: 3,
      title: 'BREAKING: 189 people on downed Lion Air flight',
      date: 'July 19, 2023',
      imageUrl: 'https://via.placeholder.com/90x60'
    }
  ];

  return (
    <aside className="trending-section">
      <h3>Trending</h3>
      {trendingNews.map(news => (
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
      ))}
    </aside>
  );
}

export default TrendingSidebar;
