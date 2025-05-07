import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">BrieflyPortal</div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Berita</a>
        <a href="#">Kategori</a>
        <a href="#">Logout</a>
      </div>
    </nav>
  );
}

export default Navbar;
