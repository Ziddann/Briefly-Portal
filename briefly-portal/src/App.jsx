import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewsDetail from './pages/News/NewsDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Bookmark from './pages/Bookmark';
import Profile from './pages/Auth/Profile';
import CreateNews from './pages/CreateNews';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ContentManagement from './pages/Admin/ContentManagement';





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-news" element={<CreateNews /> } />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<ContentManagement />} />
      </Routes>
    </>
  );
}

export default App;
console.log("App Rendered");
