import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/NewsSection.css"
import { estimateReadTime } from "./hook/utils"; // Pastikan path benar

const NewsSection = ({ newsId }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${newsId}`);
        setNews(res.data);
      } catch (err) {
        console.error("Gagal mengambil detail berita:", err);
      }
    };

    fetchNews();
  }, [newsId]);

  if (!news) return <p>Memuat detail berita...</p>;

  const readTime = estimateReadTime(news.description || "");

  return (
    <div className="news-detail-section">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Beranda</a> &gt;{" "}
        <a href={`/kategori/${news.category}`}>{news.category?.toUpperCase() || "UMUM"}</a> &gt;{" "}
        <span>{news.title}</span>
      </div>

      {/* Meta Info */}
      <div className="meta-top">
        <span className="category-badge">{news.category?.toUpperCase() || "UMUM"}</span>
        <span className="dot">•</span>
        <span>
          {news.time
            ? new Date(news.time).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "-"}
        </span>
        <span className="dot">•</span>
        <span>{readTime} menit baca</span>
        <span className="dot">•</span>
        <span>{news.likes} suka</span>
      </div>

      {/* Judul */}
      <h1 className="news-title">{news.title}</h1>

      {/* Penulis */}
      <div className="author-section">
        <div>
          <p className="author-name">{news.author || "Redaksi Politik"}</p>
          <p className="author-role">Senior Political Reporter</p>
        </div>
      </div>

      {/* Gambar utama */}
      <div className="news-image">
        {news.imageUrl ? (
          <img src={news.imageUrl} alt="News" />
        ) : (
          <p>Gambar Utama - Presiden dalam Konferensi Pers</p>
        )}
      </div>

      {/* Isi berita */}
      <div className="news-content">
        <p className="intro">{news.description || "Konten belum tersedia."}</p>
      </div>

      <hr className="divider" />
    </div>
  );
};

export default NewsSection;
