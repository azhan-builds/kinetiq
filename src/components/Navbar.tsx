import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero', onNavigate }) => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 20) {
        // At the very top — always visible
        setHidden(false);
      } else if (delta > 4 && !mobileMenuOpen) {
        // Scrolling down — hide (unless mobile menu is open)
        setHidden(true);
      } else if (delta < -4) {
        // Scrolling up — show
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'mission', label: 'Mission' },
    { id: 'team', label: 'Team' },
    { id: 'connect', label: 'Connect' },
  ];

  const handleMobileNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`site-header${hidden ? ' nav-hidden' : ''}${mobileMenuOpen ? ' mobile-menu-active' : ''}`}>
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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span className="mobile-nav-text">{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

