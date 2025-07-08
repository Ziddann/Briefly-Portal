import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import NewsSection from "./NewsSection";
import ActionButton from "./ActionButton";
import CommentSection from "./CommentSection";

import "./styles/NewsDetail.css"; // global styling (kalau ada)

const NewsDetail = () => {
    const { id } = useParams(); // Ambil newsId dari URL param
    const newsId = id;
    const userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
  
    const [comments, setComments] = useState([]);

  return (
    <div className="page-container">
      <Navbar />

      <div className="news-detail-wrapper">
        {/* Informasi berita */}
        <NewsSection newsId={newsId} />

        {/* Tombol aksi: like, bookmark, emoji, reply */}
        <ActionButton
          newsId={newsId}
          userId={userId}
          comments={comments}
          setComments={setComments}
        />

        {/* Komentar & reply */}
        <CommentSection newsId={newsId} userId={userId} />
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;
