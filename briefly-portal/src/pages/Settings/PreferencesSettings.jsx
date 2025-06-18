import React from 'react';
import '../../styles/Settings.css';

function PreferencesSettings({ onClose }) {
  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <h2>Preferensi</h2>
        <form className="settings-form">
          <label>Tema</label>
          <select>
            <option value="light">Terang</option>
            <option value="dark">Gelap</option>
          </select>

          <label>Bahasa</label>
          <select>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>

          <div className="settings-buttons">
            <button type="submit">Simpan</button>
            <button className="close-icon" onClick={onClose} aria-label="Close" title="Tutup">✕</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreferencesSettings;
