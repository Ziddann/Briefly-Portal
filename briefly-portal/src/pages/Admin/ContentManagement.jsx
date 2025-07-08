import React, { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';

function ContentManagement() {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(false); // Tampilkan semua (Draft & Published)

  const [editForm, setEditForm] = useState({
    id: null,
    title: '',
    authorName: '',
    description: '',
    imageUrl: '',
    category: '',
    status: 'Draft',
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(err => console.error("Error fetching news:", err));
  };

  const handleEditClick = (news) => {
    setEditForm({
      id: news.id,
      title: news.title || '',
      authorName: news.authorName || '',
      description: news.description || '',
      imageUrl: news.imageUrl || '',
      category: news.category || '',
      status: news.status || 'Draft',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    fetch(`http://localhost:5000/api/news/${editForm.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchNews();
          closeModal();
          alert('Berita berhasil diupdate!');
        }
      })
      .catch(err => console.error("Error updating news:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus berita ini?")) {
      fetch(`http://localhost:5000/api/news/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setNewsList(newsList.filter(news => news.id !== id));
            alert("Berita berhasil dihapus");
          }
        })
        .catch(err => console.error("Error deleting news:", err));
    }
  };

  return (
    <div className="content-management">
      <h3>Content Management</h3>

      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Sembunyikan Draft' : 'Tampilkan Semua'}
        </button>
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.length > 0 ? (
            newsList
              .filter(news => showAll || news.status !== 'Draft')
              .map((news) => (
                <tr key={news.id}>
                  <td>{news.title}</td>
                  <td>{news.authorName || '-'}</td>
                  <td>{news.category || '-'}</td>
                  <td>{news.status || 'Draft'}</td>
                  <td>
                    {news.imageUrl ? (
                      <img src={news.imageUrl} alt="Thumbnail" width="50" />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(news)}>Edit</button>
                    <button onClick={() => handleDelete(news.id)}>Delete</button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">Tidak ada berita ditemukan.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Berita</h3>

            <label>Title:</label>
            <input name="title" value={editForm.title} onChange={handleEditChange} />

            <label>Author:</label>
            <input name="authorName" value={editForm.authorName} onChange={handleEditChange} />

            <label>Description:</label>
            <textarea
              name="description"
              rows="4"
              value={editForm.description}
              onChange={handleEditChange}
            />

            <label>Image URL:</label>
            <input name="imageUrl" value={editForm.imageUrl} onChange={handleEditChange} />

            <label>Category:</label>
            <input name="category" value={editForm.category} onChange={handleEditChange} />

            <label>Status:</label>
            <select name="status" value={editForm.status} onChange={handleEditChange}>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleEditSubmit}>Simpan</button>
              <button onClick={closeModal}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentManagement;
