import React, { useState } from 'react';
import '../styles/CreateNews.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CreateNews() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    date: '',
    category: '', // Tambahkan category ke state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
          date: form.date,
          category: form.category, // Kirim kategori ke backend
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert('News created successfully!');
        // Reset form jika mau
        setForm({
          title: '',
          description: '',
          imageUrl: '',
          date: '',
          category: '',
        });
      }
    } catch (error) {
      console.error('Error creating news:', error);
      alert('Failed to create news');
    }
  };

  return (
    <>
    <Navbar />
    <div className="create-news-container">
      
      <h2 className="create-news-title">Create News</h2>
      <form className="create-news-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Enter image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="teknologi">Teknologi</option>
          <option value="politik">Politik</option>
          <option value="olahraga">Olahraga</option>
          <option value="hiburan">Hiburan</option>
        </select>

        <button type="submit">Submit News</button>
      </form>
      
    </div>
    <Footer />
    </>
  );
}

export default CreateNews;
