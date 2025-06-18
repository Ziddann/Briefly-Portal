import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    console.log("Sidebar closed");
    setSidebarOpen(false);
  };

  // Fungsi untuk scroll ke atas dengan animasi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Animasi scroll ke atas
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          {/* Tombol BrieflyNews dengan scroll to top */}
          <Link to="/" className="logo-link" onClick={scrollToTop}>
            BrieflyNews
          </Link>
        </div>

        <div className="navbar-right">
          <input type="text" className="search-input" placeholder="Search..." />
          {/* Tombol Home dengan scroll to top */}
          <Link to="/" className="nav-item" onClick={scrollToTop}>Home</Link>
          <Link to="/bookmark" className="nav-item">Bookmark</Link>
          <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="nav-item dropdown-toggle">Kategori ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/kategori/teknologi" className="dropdown-item">Teknologi</Link>
                <Link to="/kategori/politik" className="dropdown-item">Politik</Link>
                <Link to="/kategori/olahraga" className="dropdown-item">Olahraga</Link>
                <Link to="/kategori/hiburan" className="dropdown-item">Hiburan</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={handleSidebarClose}></div>
          <Sidebar onClose={handleSidebarClose} />
        </>
      )}
    </>
  );
}

export default Navbar;
