import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsCard.css';


function NewsCard({ id, title, description, imageUrl }) {
  return (
    <Link to={`/news/${id}`} className="news-link">
      <div className="newscard">
        <img src={imageUrl} alt={title} />
        <div className="newscard-content">
          <h3 className="newscard-title">{title}</h3>
          <p className="newscard-desc">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
