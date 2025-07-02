import React from 'react';
import '../../styles/AdminDashboard.css';  // Impor CSS terpusat di AdminDashboard.jsx


function ContentManagement() {
  return (
    <div className="content-management">
      <h3>Content Management</h3>
      <table className="content-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Latest Technology Trends</td>
            <td>John Doe</td>
            <td>Technology</td>
            <td>Published</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Global Economic Update</td>
            <td>Jane Smith</td>
            <td>Business</td>
            <td>Draft</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContentManagement;
