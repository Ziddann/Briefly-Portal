import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Mengimpor useNavigate
import Sidebar from './Sidebar';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';

function Navbar({ onSearch }) {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown untuk kategori
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // Dropdown untuk user
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(''); // State untuk foto profil
  const [role, setRole] = useState(''); // State untuk menyimpan role pengguna
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Cek status login pengguna dengan melihat token di localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Jika ada token, set isLoggedIn true

    // Ambil foto profil pengguna dari localStorage
    const userProfileImage = localStorage.getItem('profileImage');
    setProfileImage(userProfileImage || '/default-avatar.png'); // Jika tidak ada, gunakan gambar default

    // Ambil role pengguna dari localStorage
    const userRole = localStorage.getItem('role');
    setRole(userRole || ''); // Set role jika ada, atau default ke kosong
  }, []);
  
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

  const handleLogout = () => {
    // Hapus token dari localStorage dan set status login menjadi false
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage'); // Hapus juga foto profil jika perlu
    localStorage.removeItem('role'); // Hapus role saat logout
    setIsLoggedIn(false); // Update status login

    // Tampilkan alert logout berhasil
    alert('Logout berhasil!');
  };

  // Fungsi untuk membuka dropdown kategori
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setUserDropdownOpen(false); // Pastikan dropdown user tertutup saat dropdown kategori dibuka
  };

  // Fungsi untuk membuka dropdown user
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setDropdownOpen(false); // Pastikan dropdown kategori tertutup saat dropdown user dibuka
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
    onSearch(e.target.value); // Kirimkan query ke parent komponen
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {/* Menampilkan tombol hamburger hanya ketika user belum login */}
          {isLoggedIn && (
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
          )}
          {/* Tombol BrieflyNews dengan scroll to top */}
          <Link to="/" className="logo-link" onClick={scrollToTop}>
            BrieflyNews
          </Link>
        </div>

        <div className="navbar-right">
          {/* Tampilkan input search hanya jika user login */}
          {isLoggedIn && (
              <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}

          {/* Tampilkan link Home hanya jika user login */}
          {isLoggedIn && (
            <Link to="/" className="nav-item" onClick={scrollToTop}>
              Home
            </Link>
          )}

          {/* Tampilkan link Bookmark atau Kategori berdasarkan role */}
          {isLoggedIn && role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-item">
              Admin Dashboard
            </Link>
          )}
          {isLoggedIn && role === 'author' && (
            <Link to="/create-news" className="nav-item">
              Create News
            </Link>
          )}
          {isLoggedIn && role === 'reader' && (
            <Link to="/bookmark" className="nav-item">
              Bookmark
            </Link>
          )}

          {/* Kategori dropdown hanya jika user login */}
          {isLoggedIn && role === 'reader' && (
            <div className="dropdown" onClick={toggleDropdown}>
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
          )}

          {/* Tampilkan Login dan Register jika belum login */}
          {!isLoggedIn && (
            <div>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item">Register</Link>
            </div>
          )}

          {/* Logo Pengguna jika sudah login */}
          {isLoggedIn && (
            <div className="dropdown user-dropdown" onClick={toggleUserDropdown}>
              <img src={profileImage} alt="User Avatar" className="avatar-img" />
              {userDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
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
