import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
    subscribe: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert('Anda harus menyetujui Syarat & Ketentuan!');
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: 'reader', 
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert('Pendaftaran berhasil! Silahkan login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Pendaftaran gagal!');
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <div className="register-icon-logo">📰</div>
        <h1 className="register-title">NewsPortal</h1>
        <p className="register-subtitle">Bergabung dengan komunitas berita terdepan</p>

        <h2 className="register-form-title">Daftar Akun</h2>
        <p className="register-form-desc">Dapatkan akses ke berita terkini dan eksklusif</p>

        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={form.name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="nama@email.com"
          value={form.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="+62 812 3456 7890"
          value={form.phone}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Minimal 8 karakter"
          value={form.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Ulangi password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="register-input"
        />

        <div className="register-checkbox-group">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <span>
            Saya setuju dengan <a href="#">Syarat & Ketentuan</a> dan <a href="#">Kebijakan Privasi</a>
          </span>
        </div>

        <div className="register-checkbox-group">
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
          />
          <span>Saya ingin menerima newsletter dan update berita terbaru</span>
        </div>

        <button type="submit" className="register-button">Daftar Sekarang</button>

        <div className="register-divider">atau</div>

        <button type="button" className="register-google-btn">Daftar dengan Google</button>
        <button type="button" className="register-facebook-btn">Daftar dengan Facebook</button>

        <p className="register-login-link">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
