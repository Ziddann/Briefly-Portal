import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    // Tambahkan logika autentikasi di sini jika diperlukan
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        {/* Judul yang bisa diklik untuk kembali ke Home */}
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

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

        <button type="submit" className="login-button">Sign in</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
