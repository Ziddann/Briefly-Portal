import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TrendingSidebar from '../components/TrendingSidebar';
import '../styles/Home.css';

function Home() {
  const newsList = [
    {
      id: 1,
      title: 'Breaking News: Tech Innovation',
      description: 'A breakthrough in AI technology changes the game.',
      imageUrl: 'https://via.placeholder.com/600x300',
      date: 'July 21, 2023'
    },
    {
      id: 2,
      title: 'Economic Growth Soars',
      description: 'The economy grew faster than expected this quarter.',
      imageUrl: 'https://via.placeholder.com/600x300',
      date: 'July 20, 2023'
    },
    {
      id: 3,
      title: 'Sports Highlight: Final Score',
      description: 'An incredible comeback in the last 5 minutes!',
      imageUrl: 'https://via.placeholder.com/600x300',
      date: 'July 19, 2023'
    }
  ];

  return (
    <div className="home-layout">
      <Navbar />
      <div className="home-content">
        <div className="main-news">
          {newsList.map((news) => (
            <Link
              to={`/news/${news.id}`}
              key={news.id}
              className="main-news-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={news.imageUrl} alt={news.title} className="main-news-img" />
              <h2>{news.title}</h2>
              <p>{news.description}</p>
              <p className="news-date">{news.date}</p>
            </Link>
          ))}
        </div>
        <TrendingSidebar />
      </div>
    </div>
  );
}

export default Home;
