import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Kategori.css';

function Teknologi() {
  const berita = [
    { id: 101, title: 'AI Revolutionizes Healthcare', description: 'AI membantu dokter mendiagnosa penyakit lebih cepat dan akurat.', imageUrl: 'https://via.placeholder.com/600x300', date: '18 Juni 2025' },
    { id: 102, title: 'Startup Indonesia Ciptakan Mobil Terbang', description: 'Prototipe mobil terbang pertama akan diuji coba di Jakarta.', imageUrl: 'https://via.placeholder.com/600x300', date: '15 Juni 2025' },
    { id: 103, title: 'Teknologi 6G Mulai Diuji di Korea', description: 'Korea Selatan menjadi negara pertama yang uji coba jaringan 6G.', imageUrl: 'https://via.placeholder.com/600x300', date: '10 Juni 2025' }
  ];
  return (
    <>
      <Navbar />
      <div className="home-content">
        <div className="main-news">
          {berita.map(news => (
            <Link to={`/news/${news.id}`} className="main-news-card" key={news.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={news.imageUrl} alt={news.title} className="main-news-img" />
              <h2>{news.title}</h2>
              <p>{news.description}</p>
              <p className="news-date">{news.date}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Teknologi;