import React from 'react';
import '../../styles/AdminDashboard.css';  // Impor CSS terpusat di AdminDashboard.jsx


function DashboardOverview() {
  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-stats">
        <div className="stat-item">
          <h3>1,234</h3>
          <p>Total Articles</p>
        </div>
        <div className="stat-item">
          <h3>5,678</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>89,012</h3>
          <p>Page Views</p>
        </div>
        <div className="stat-item">
          <h3>345</h3>
          <p>Comments</p>
        </div>
      </div>
      <div className="quick-actions">
        <button className="quick-action-btn">New Article</button>
        <button className="quick-action-btn">Add User</button>
        <button className="quick-action-btn">New Category</button>
        <button className="quick-action-btn">View Reports</button>
      </div>
    </div>
  );
}

export default DashboardOverview;
