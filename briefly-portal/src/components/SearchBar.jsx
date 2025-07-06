import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menangani perubahan input search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fungsi untuk memfilter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="search-results">
        {filteredData.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className="search-item">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBar;
