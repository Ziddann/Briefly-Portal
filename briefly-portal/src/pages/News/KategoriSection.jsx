import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../../styles/KategoriSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function KategoriSection() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/category/${category}`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error('Error:', err));
  }, [category]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="kategori-section">
      <div className="kategori-header">
        <h3>Kategori</h3>
        <div className="kategori-tabs">
          {['all', 'teknologi', 'politik', 'olahraga', 'hiburan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? 'active' : ''}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Slider {...settings}>
        {news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className="kategori-card">
              <img src={item.imageUrl} alt={item.title} />
              <div>
                <span>{item.category}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>{item.date}</p>
                <Link to={`/news/${item.id}`}>Baca Selengkapnya</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Belum ada berita</p>
        )}
      </Slider>
    </div>
  );
}

export default KategoriSection;
