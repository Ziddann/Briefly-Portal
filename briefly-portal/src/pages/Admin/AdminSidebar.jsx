import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';  // Impor CSS terpusat di AdminDashboard.jsx


function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <ul className="sidebar-menu">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/articles">Articles</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/comments">Comments</Link></li>
        <li><Link to="/admin/analytics">Analytics</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
