// ==========================
// File: Sidebar.jsx (Simplified - Remove Bahasa & Align Login)
// ==========================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountSettings from '../pages/Settings/AccountSettings';
import PreferencesSettings from '../pages/Settings/PreferencesSettings';
import SecuritySettings from '../pages/Settings/SecuritySettings';
import '../styles/Sidebar.css';
import '../styles/Settings.css';

function Sidebar({ onClose }) {
  const [popup, setPopup] = useState(null);
  const closePopup = () => setPopup(null);

  return (
    <>
      <aside className="sidebar">
        <button className="sidebar-close" onClick={onClose}>✕</button>

        <h3>Pengaturan</h3>
        <ul>
          <li><span className="sidebar-link" style={{ cursor: 'pointer' }} onClick={() => setPopup('akun')}>Akun</span></li>
          <li><span className="sidebar-link" style={{ cursor: 'pointer' }} onClick={() => setPopup('preferensi')}>Preferensi</span></li>
          <li><span className="sidebar-link" style={{ cursor: 'pointer' }} onClick={() => setPopup('keamanan')}>Keamanan</span></li>
          <li><Link to="/login" className="sidebar-link" style={{ cursor: 'pointer' }}>Login</Link></li>
        </ul>
      </aside>

      {popup === 'akun' && <AccountSettings onClose={closePopup} />}
      {popup === 'preferensi' && <PreferencesSettings onClose={closePopup} />}
      {popup === 'keamanan' && <SecuritySettings onClose={closePopup} />}
    </>
  );
}

export default Sidebar;
