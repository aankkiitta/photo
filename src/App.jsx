import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import AutoPopupModal from './components/AutoPopupModal'; // 🔥 Import kiya

// Pages
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail'; 
import Photobooks from './pages/Photobooks';
import PhotobookDetail from './pages/PhotobookDetail';
import Images from './pages/Images';
import Films from './pages/Films';
import PreWedding from './pages/PreWedding';
import PreWeddingDetail from './pages/PreWeddingDetail'; 
import Commercials from './pages/Commercials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';

import './index.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:slug" element={<StoryDetail />} />
            <Route path="/photobooks" element={<Photobooks />} />
            <Route path="/photobooks/:slug" element={<PhotobookDetail />} />
            <Route path="/images" element={<Images />} /> 
            <Route path="/films" element={<Films />} /> 
            <Route path="/pre-weddings" element={<PreWedding />} />
            <Route path="/pre-wedding/:slug" element={<PreWeddingDetail />} /> 
            <Route path="/commercials" element={<Commercials />} /> 
            <Route path="/faq" element={<FAQ />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/about" element={<About />} /> 
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        
        {/* 🔥 Popup yahan add kiya (har page par 5 sec baad aayega) */}
        <AutoPopupModal /> 
      </div>
    </Router>
  );
};

export default App;