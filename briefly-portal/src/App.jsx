import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
console.log("App Rendered");
