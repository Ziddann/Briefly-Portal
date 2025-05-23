import { Link } from 'react-router-dom';

import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css'; 

function Home() {
  const newsList = [
    {
      id: 1,
      title: 'Breaking News: Tech Innovation',
      description: 'A breakthrough in AI technology changes the game.',
      imageUrl: 'https://via.placeholder.com/600x300'
    },
    {
      id: 2,
      title: 'Economic Growth Soars',
      description: 'The economy grew faster than expected this quarter.',
      imageUrl: 'https://via.placeholder.com/600x300'
    },
    {
      id: 3,
      title: 'Sports Highlight: Final Score',
      description: 'An incredible comeback in the last 5 minutes!',
      imageUrl: 'https://via.placeholder.com/600x300'
    }
  ];

  return (
      <div className="home-layout">
        <Navbar />
      <div className="main-content" style={{ display: 'flex', padding: '1rem' }}>
        <Sidebar />
        <div className="news-section" style={{ flex: 1, paddingLeft: '1rem' }}>
          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              description={news.description}
              imageUrl={news.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
