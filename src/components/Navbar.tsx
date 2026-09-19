import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'mission', label: 'Mission', isRoute: false },
    { id: 'build', label: 'Build', isRoute: false },
    { id: 'team', label: 'Team', isRoute: false },
    { id: 'blog', label: 'Blog', isRoute: true, path: '/blog' },
    { id: 'connect', label: 'Connect', isRoute: false },
  ];

  const handleMobileNavClick = (item: (typeof navItems)[0]) => {
    setMobileMenuOpen(false);
    if (item.isRoute && item.path) {
      return;
    }
    onNavigate(item.id);
  };

  return (
    <>
      <header className={`site-header${mobileMenuOpen ? ' mobile-menu-active' : ''}`}>
        <div className="header-inner">
          {/* Upper-Left Canonical KINETIQ Logo Anchor */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('hero');
            }}
            className="header-brand"
            aria-label="KINETIQ Homepage"
          >
            <img
              src="/kinetiq-logo.svg"
              alt="KINETIQ Logo"
              className="header-logo-icon"
            />
            <span className="header-brand-name">KINETIQ</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="header-nav desktop-only-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              if (item.isRoute && item.path) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="nav-active-indicator"
                        transition={{
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="nav-active-indicator"
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle Button (3 horizontal lines) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`mobile-hamburger-btn ${mobileMenuOpen ? 'is-open' : ''}`}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line top-line" />
            <span className="hamburger-line mid-line" />
            <span className="hamburger-line bot-line" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <nav className="mobile-nav-list" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                if (item.isRoute && item.path) {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="mobile-nav-text">{item.label}</span>
                      <span className="mobile-nav-arrow" aria-hidden="true">→</span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNavClick(item)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="mobile-nav-text">{item.label}</span>
                    <span className="mobile-nav-arrow" aria-hidden="true">→</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

