import React from 'react';
import '../styles/NewsCard.css';

function NewsCard({ title, description, imageUrl }) {
  return (
    <div className="newscard">
      <img src={imageUrl} alt={title} />
      <div className="newscard-content">
        <h3 className="newscard-title">{title}</h3>
        <p className="newscard-desc">{description}</p>
      </div>
    </div>
  );
}

export default NewsCard;
