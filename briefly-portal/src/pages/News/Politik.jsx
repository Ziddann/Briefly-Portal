import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Kategori.css';

function Politik() {
  const berita = [
    { id: 201, title: 'Pemilu 2025: Debat Capres Memanas', description: 'Isu pendidikan dan ekonomi menjadi sorotan utama.', imageUrl: 'https://via.placeholder.com/600x300', date: '17 Juni 2025' },
    { id: 202, title: 'RUU Perlindungan Data Disahkan', description: 'RUU ini memberi perlindungan lebih bagi data pribadi warga.', imageUrl: 'https://via.placeholder.com/600x300', date: '14 Juni 2025' },
    { id: 203, title: 'Diplomasi Indonesia ke ASEAN Meningkat', description: 'Indonesia menginisiasi kerja sama regional baru.', imageUrl: 'https://via.placeholder.com/600x300', date: '11 Juni 2025' }
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
export default Politik;