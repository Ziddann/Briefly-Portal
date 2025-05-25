import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsCard.css';

function NewsCard({ id, title, date, imageUrl }) {
  return (
    <Link to={`/news/${id}`} className="news-card-horizontal">
      <img src={imageUrl} alt={title} className="news-thumb" />
      <div className="news-info">
        <h4 className="news-title">{title}</h4>
        <p className="news-date">{date}</p>
      </div>
    </Link>
  );
}

export default NewsCard;
