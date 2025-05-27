import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookmark from './pages/Bookmark';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </>
  );
}

export default App;
console.log("App Rendered");
