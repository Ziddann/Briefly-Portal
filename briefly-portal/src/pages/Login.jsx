import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    
  };

  return (
    <div className="login-page">
  <div className="login-box">
    <h2 className="login-title">Login to Briefly Portal</h2>
    <form onSubmit={handleLogin} className="login-form">
      <div>
        <label className="login-label" htmlFor="email">Email</label>
        <input
          className="login-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="login-label" htmlFor="password">Password</label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
  </div>
</div>

  );
}

export default Login;
