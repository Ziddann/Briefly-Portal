import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      // Menyimpan token dan data pengguna
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        localStorage.setItem('profileImage', data.profileImage);
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('profileImage', data.profileImage);
      }

      alert('Login Successful');
      navigate('/');
    } else {
      alert('Login Failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Kolom kiri */}
        <div className="left-column">
          <h1>BrieflyNews</h1>
          <p>Tetap Terdepan dengan Berita Terkini</p>
          <p>Platform berita terpercaya yang menghadirkan informasi akurat dan terkini dari seluruh dunia</p>
          <div className="features">
            <div className="feature">Real-time Updates</div>
            <div className="feature">Global Coverage</div>
          </div>
        </div>

        {/* Formulir login */}
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Selamat Datang Kembali</h2>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Remember me checkbox */}
          <div className="checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Ingat saya</label>
          </div>

          <button type="submit" className="login-button">Masuk</button>

          <p className="forgot-password">
            <Link to="/forgot-password">Lupa password?</Link>
          </p>

          <div className="register-link">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </div>

          {/* Tombol login sosial */}
          <div className="social-login">
            <button type="button" className="social-button google">G</button>
            <button type="button" className="social-button facebook">F</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
