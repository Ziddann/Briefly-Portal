import React from 'react';
import '../styles/Bookmark.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const bookmarkedNews = [
  {
    id: 1,
    title: 'AI Powers Quantum Leap in Computing Speed',
    author: 'Eliza Turing',
    date: 'April 20, 2025',
    category: 'Technology',
    description: 'Breakthrough quantum algorithms and specialized hardware...',
    imageUrl: 'https://via.placeholder.com/100x100'
  },
  {
    id: 2,
    title: 'Election 2025: Candidates Face Off In Televised Debate',
    author: 'Michael Keane',
    date: 'April 18, 2025',
    category: 'Politics',
    description: 'The debate tackled key national policies...',
    imageUrl: 'https://via.placeholder.com/100x100'
  },
  {
    id: 3,
    title: 'Championship Glory: City FC Wins The Cup',
    author: 'Laura Field',
    date: 'April 15, 2025',
    category: 'Sports',
    description: 'City FC celebrates a long-awaited championship...',
    imageUrl: 'https://via.placeholder.com/100x100'
  },
  {
    id: 4,
    title: 'Renewable Energy Investments Reach Record High',
    author: 'Sophie Lin',
    date: 'April 10, 2025',
    category: 'Business',
    description: 'A shift to renewables leads to an investment surge...',
    imageUrl: 'https://via.placeholder.com/100x100'
  }
];

function Bookmark() {
  return (
    <div className="bookmark-layout">
      <Navbar />
      <div className="bookmark-main" style={{ display: 'flex' }}>
        <div className="bookmark-content" style={{ flex: 1, padding: '1rem' }}>
          <h2>Bookmarked News</h2>
          <div className="bookmark-list">
            {bookmarkedNews.map((news) => (
              <div key={news.id} className="bookmark-card">
                <img src={news.imageUrl} alt={news.title} className="bookmark-image" />
                <div className="bookmark-info">
                  <p className="bookmark-category">{news.category}</p>
                  <h3>{news.title}</h3>
                  <p className="bookmark-meta">By {news.author} • {news.date}</p>
                  <p className="bookmark-description">{news.description}</p>
                  <a href={`/news/${news.id}`} className="bookmark-readmore">Read More</a>
                </div>
                <div className="bookmark-action">🔖</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
