import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi password dan konfirmasi password
    if (form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    console.log('Registering:', form);
    // Tambahkan logika pengiriman data ke backend di sini jika perlu
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        {/* Tautan ke halaman home */}
        <Link to="/" className="register-title">BrieflyNews</Link>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          I agree to the Terms and Privacy Policy
        </label>

        <button type="submit" className="register-button" disabled={!form.agree}>
          Create Account
        </button>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
