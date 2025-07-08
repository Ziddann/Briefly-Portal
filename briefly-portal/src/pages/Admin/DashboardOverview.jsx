import React, { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';

function DashboardOverview() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalUsers: 0,
    totalPageViews: 0,
    totalComments: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-stats">
        <div className="stat-item">
          <h3>{stats.totalArticles}</h3>
          <p>Total Articles</p>
        </div>
        <div className="stat-item">
          <h3>{stats.totalUsers}</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>{stats.totalPageViews}</h3>
          <p>Page Views</p>
        </div>
        <div className="stat-item">
          <h3>{stats.totalComments}</h3>
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
