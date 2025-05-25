import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ onClose }) {
  console.log("Sidebar rendered. onClose =", onClose);

  return (
    <aside className="sidebar">
      <button
        className="sidebar-close"
        onClick={() => {
          if (typeof onClose === 'function') {
            console.log("✕ clicked, calling onClose");
            onClose();
          } else {
            console.error("onClose is not a function!", onClose);
          }
        }}
      >
        ✕
      </button>

      <h3>Pengaturan</h3>
      <ul>
        <li><a href="#">Akun</a></li>
        <li><a href="#">Preferensi</a></li>
        <li><a href="#">Keamanan</a></li>
      </ul>

      <h3>Bahasa</h3>
      <ul>
        <li><a href="#">Indonesia</a></li>
        <li><a href="#">English</a></li>
      </ul>

      <ul>
        <li>
          <Link to="/login" className="sidebar-link">Login</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
