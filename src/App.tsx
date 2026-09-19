import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { StudioPage } from './pages/StudioPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/studio/*" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
