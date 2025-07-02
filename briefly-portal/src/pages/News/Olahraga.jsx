import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Kategori.css';

function Olahraga() {
  const berita = [
    { id: 301, title: 'Indonesia Juara SEA Games 2025', description: 'Timnas meraih medali emas mengalahkan Vietnam.', imageUrl: 'https://via.placeholder.com/600x300', date: '16 Juni 2025' },
    { id: 302, title: 'Piala Dunia: Brasil Tumbang di Semifinal', description: 'Kekalahan lewat adu penalti lawan Prancis.', imageUrl: 'https://via.placeholder.com/600x300', date: '13 Juni 2025' },
    { id: 303, title: 'Pebulu Tangkis Muda Raih Gelar Dunia', description: 'Pemain 18 tahun Indonesia menjuarai All England.', imageUrl: 'https://via.placeholder.com/600x300', date: '9 Juni 2025' }
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
export default Olahraga;
