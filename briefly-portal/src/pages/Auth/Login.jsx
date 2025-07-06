import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi ke halaman lain

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data login ke backend
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      // Simpan token, userId, role, dan profileImage ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);  // Menyimpan userId
      localStorage.setItem('role', data.role);  // Menyimpan role (admin, author, reader)
      localStorage.setItem('profileImage', data.profileImage);  // Menyimpan profileImage

      alert('Login Successful');
      
      // Arahkan langsung ke Home setelah login berhasil
      navigate('/');
    } else {
      alert('Login Failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <Link to="/" className="login-title">BrieflyNews</Link>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Sign in</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
