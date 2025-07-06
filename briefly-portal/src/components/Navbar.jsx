import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';

function Navbar({ onSearch }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState('http://localhost:5000/default-avatar.jpg');
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        const imageUrl = data.profileImage 
          ? `http://localhost:5000${data.profileImage}`
          : `http://localhost:5000/default-avatar.jpg`;

        setProfileImage(imageUrl);
        setUserName(data.name || 'User');
        setRole(data.role || '');
      })
      .catch(err => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setProfileImage('http://localhost:5000/default-avatar.jpg');
    setUserName('');
    setRole('');
    navigate('/');
    alert('Logout berhasil!');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {isLoggedIn && (
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
          )}
          <Link to="/" className="logo-link" onClick={scrollToTop}>
            BrieflyNews
          </Link>
        </div>

        <div className="navbar-right">
          {isLoggedIn && (
            <>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />

              <Link to="/" className="nav-item" onClick={scrollToTop}>
                Home
              </Link>

              {role === 'admin' && (
                <Link to="/admin/dashboard" className="nav-item">Admin Dashboard</Link>
              )}
              {role === 'author' && (
                <Link to="/create-news" className="nav-item">Create News</Link>
              )}
              {role === 'reader' && (
                <Link to="/bookmark" className="nav-item">Bookmark</Link>
              )}

              <div className="dropdown user-dropdown" onClick={toggleUserDropdown}>
                <img src={profileImage} alt="👤" className="avatar-img" />
                {/* <span className="user-name">{userName}</span> */}
                {userDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item">Register</Link>
            </>
          )}
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
