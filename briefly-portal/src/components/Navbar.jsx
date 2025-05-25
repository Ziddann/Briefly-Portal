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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <Link to="/" className="logo-link">BrieflyNews</Link>
        </div>

        <div className="navbar-right">
          <input type="text" className="search-input" placeholder="Search..." />
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/bookmark" className="nav-item">Bookmark</Link> 
          <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="nav-item dropdown-toggle">Kategori ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Teknologi</a>
                <a href="#" className="dropdown-item">Politik</a>
                <a href="#" className="dropdown-item">Olahraga</a>
                <a href="#" className="dropdown-item">Hiburan</a>
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
