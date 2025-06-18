import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookmark from './pages/Bookmark';
import Teknologi from './pages/Teknologi';
import Politik from './pages/Politik';
import Olahraga from './pages/Olahraga';
import Hiburan from './pages/Hiburan';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/kategori/teknologi" element={<Teknologi />} />
        <Route path="/kategori/politik" element={<Politik />} />
        <Route path="/kategori/olahraga" element={<Olahraga />} />
        <Route path="/kategori/hiburan" element={<Hiburan />} />
      </Routes>
    </>
  );
}

export default App;
console.log("App Rendered");
