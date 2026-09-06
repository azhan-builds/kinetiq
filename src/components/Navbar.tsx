import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero', onNavigate }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 20) {
        // At the very top — always visible
        setHidden(false);
      } else if (delta > 4) {
        // Scrolling down — hide
        setHidden(true);
      } else if (delta < -4) {
        // Scrolling up — show
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'mission', label: 'Mission' },
    { id: 'team', label: 'Team' },
    { id: 'connect', label: 'Connect' },
  ];

  return (
    <header className={`site-header${hidden ? ' nav-hidden' : ''}`}>
      <div className="header-inner">
        {/* Upper-Left Canonical KINETIQ Logo Anchor */}
        <button
          onClick={() => onNavigate('hero')}
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

        {/* Minimal Editorial Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
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
      </div>
    </header>
  );
};
