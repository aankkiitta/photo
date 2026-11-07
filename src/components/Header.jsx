import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// 🔥 logo.js file se logo import kiya
import { logoImg } from '../data/logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation(); 
  const isHomePage = location.pathname === "/";

  // Scroll detect karne ka logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Header ki class decide karna
  const headerClass = `site-header 
    ${isScrolled ? 'scrolled' : ''} 
    ${isHomePage ? 'is-home' : 'force-solid'}
  `;

  return (
    <header className={headerClass}>
      <div className="header-container">
        
        {/* LOGO - Ab logo.js se aa raha hai */}
        <Link to="/" className="logo-container">
          <img src={logoImg} alt="The Wedding Story" className="header-logo-img" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/stories">STORIES</Link></li>
            <li><Link to="/photobooks">PHOTOBOOKS</Link></li>
            <li><Link to="/images">IMAGES</Link></li>
            <li><Link to="/films">FILMS</Link></li>
            <li><Link to="/pre-weddings">PRE-WEDDINGS</Link></li>
            <li><Link to="/commercials">COMMERCIALS</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
          </ul>
        </nav>

        {/* MOBILE HAMBURGER ICON */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/stories" onClick={closeMenu}>STORIES</Link></li>
          <li><Link to="/photobooks" onClick={closeMenu}>PHOTOBOOKS</Link></li>
          <li><Link to="/images" onClick={closeMenu}>IMAGES</Link></li>
          <li><Link to="/films" onClick={closeMenu}>FILMS</Link></li>
          <li><Link to="/pre-weddings" onClick={closeMenu}>PRE-WEDDINGS</Link></li>
          <li><Link to="/commercials" onClick={closeMenu}>COMMERCIALS</Link></li>
          <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>CONTACT</Link></li>
          <li><Link to="/about" onClick={closeMenu}>ABOUT</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;