import React from 'react';
import '../../styles/AdminDashboard.css';  // Impor CSS terpusat di AdminDashboard.jsx


function RecentArticles() {
  return (
    <div className="recent-articles">
      <h3>Recent Articles</h3>
      <ul className="articles-list">
        <li>
          <p>Breaking News Update - Published 2 hours ago</p>
        </li>
        <li>
          <p>Tech Innovation Report - Published 4 hours ago</p>
        </li>
        <li>
          <p>Sports Championship - Published 6 hours ago</p>
        </li>
      </ul>
    </div>
  );
}

export default RecentArticles;
