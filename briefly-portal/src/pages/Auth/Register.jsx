import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'reader', // Default role is 'reader'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jika password dan confirm password cocok
    if (form.password !== form.confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role, // Send the selected role to backend
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert('Registration successful! Please login.');
        // Redirect atau reset form jika diperlukan
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please check again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
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

        {/* Role selection dropdown (reader or author) */}
        <label>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="reader">Reader</option>
          <option value="author">Author</option>
        </select>

        <button type="submit" className="register-button">
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
