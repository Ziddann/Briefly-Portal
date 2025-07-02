import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Kategori.css';

function Hiburan() {
  const berita = [
    { id: 401, title: 'Film Lokal Tembus Box Office Asia', description: 'Film drama keluarga sukses besar di Asia.', imageUrl: 'https://via.placeholder.com/600x300', date: '12 Juni 2025' },
    { id: 402, title: 'Konser BTS di Jakarta Pecahkan Rekor', description: 'Konser BTS mencetak rekor penonton terbanyak.', imageUrl: 'https://via.placeholder.com/600x300', date: '10 Juni 2025' },
    { id: 403, title: 'Festival Musik Bali Sukses Digelar', description: 'Ribuan penonton nikmati pertunjukan lintas genre.', imageUrl: 'https://via.placeholder.com/600x300', date: '8 Juni 2025' }
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
export default Hiburan;
