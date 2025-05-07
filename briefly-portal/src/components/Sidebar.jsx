import React from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Kategori</h3>
      <ul>
        <li><a href="#">Teknologi</a></li>
        <li><a href="#">Politik</a></li>
        <li><a href="#">Olahraga</a></li>
        <li><a href="#">Hiburan</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
