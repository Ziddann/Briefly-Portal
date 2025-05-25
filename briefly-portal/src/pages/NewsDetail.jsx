import React from 'react';
import { useParams, Link } from 'react-router-dom'; // tambahkan Link
import '../styles/NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();
  const newsData = {
    1: {
      title: 'Breaking News: Major Technology Breakthrough',
      author: 'John Smith',
      date: 'May 7, 2025',
      category: 'Technology',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse...'
      ],
      image: 'https://via.placeholder.com/600x300'
    },
    2: {
      title: 'Economic Growth Hits Record High',
      author: 'Jane Doe',
      date: 'May 8, 2025',
      category: 'Business',
      content: [
        'The economy has shown a significant surge over the last quarter...',
        'Experts believe the trend may continue into the next fiscal year...'
      ],
      image: 'https://via.placeholder.com/600x300'
    }
  };

  const news = newsData[id] || {
    title: 'News Not Found',
    author: 'System',
    date: '',
    category: '',
    content: ['Berita tidak ditemukan.'],
    image: ''
  };

  return (
    <div className="news-detail-page">
      <aside className="news-sidebar">
        <h3>Settings</h3>
        <ul>
          <li>Account</li>
          <li>Preferences</li>
          <li>Security</li>
        </ul>
        <h3>Language</h3>
        <ul>
          <li>English</li>
          <li>Indonesia</li>
        </ul>
      </aside>

      <main className="news-content">
        {/* Tombol Close (×) */}
        <Link to="/" className="close-button" title="Back to Home">×</Link>

        <input className="search-bar" placeholder="Search news..." />

        <div className="news-article">
          {news.image && (
            <img className="news-image" src="/news.png" alt="News Visual" />
          )}
          <h2 className="news-title">{news.title}</h2>
          <p className="news-meta">
            By {news.author} • {news.date} • <span className="news-category">{news.category}</span>
          </p>

          {news.content.map((para, index) => (
            <p className="news-body" key={index}>{para}</p>
          ))}

          <section className="comments-section">
            <h3>Comments</h3>
            <div className="comment-form">
              <img className="avatar" src="/avatar.png" alt="User" />
              <input className="comment-input" placeholder="Add a comment..." />
            </div>
            <button className="comment-button">Post Comment</button>

            <div className="comment">
              <img className="avatar" src="/avatar.png" alt="Jane" />
              <div className="comment-content">
                <p className="comment-author">Jane Doe <span className="comment-time">7 hours ago</span></p>
                <p className="comment-text">Great article! I think it's really informative and well-written.</p>
                <div className="comment-actions">👍 24    💬 Reply</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NewsDetail;
