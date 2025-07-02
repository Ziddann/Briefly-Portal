import React from 'react';
import AdminSidebar from './AdminSidebar';
import DashboardOverview from './DashboardOverview';
import RecentArticles from './RecentArticles';
import ContentManagement from './ContentManagement';
import '../../styles/AdminDashboard.css';  // Impor CSS terpusat di AdminDashboard.jsx


function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-dashboard-content">
        <DashboardOverview />
        <RecentArticles />
        <ContentManagement />
      </div>
    </div>
  );
}

export default AdminDashboard;
