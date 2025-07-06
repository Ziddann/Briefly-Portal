import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TrendingSection from '../components/TrendingSection';
import Footer from '../components/Footer';
import '../styles/Home.css';
import '../styles/responsive.css';
import KategoriSection from './News/KategoriSection';
import SearchBar from '../components/SearchBar';

function Home() {
  const [newsList, setNewsList] = useState([]); // Menyimpan data berita dari backend
  const [filteredNews, setFilteredNews] = useState([]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredNews(newsList); // Jika tidak ada query, tampilkan semua berita
    } else {
      const filtered = newsList.filter((news) =>
        news.title.toLowerCase().includes(query.toLowerCase()) || news.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered); // Menyimpan berita yang terfilter
    }
  };

  // Mengambil data dari backend saat komponen di-mount
  useEffect(() => {
    fetch('http://localhost:5000/api/news') // Ubah URL sesuai dengan backend API kamu
      .then((response) => response.json()) // Mengonversi response menjadi JSON
      .then((data) => setNewsList(data)) // Menyimpan data yang diterima ke state
      .catch((error) => console.error('Error fetching data:', error)); // Menangani error
  }, []); // Hanya berjalan sekali ketika komponen pertama kali di-render

  return (
    <>
      <Navbar onSearch={handleSearch} /> 
      <TrendingSection />
      <KategoriSection />
      {/* <div className="home-content"> */}
        <div className="main-news">
          {newsList.length > 0 ? (
            newsList.map((news) => (
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
            ))
          ) : (
            <p>Loading news...</p>
          )}
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Home;
