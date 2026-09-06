import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <span className="footer-logo">KINETIQ</span>
          <span className="footer-tagline">Intelligence in Motion.</span>
        </div>
        <div className="footer-league-meta">
          National Robotics League · HYPERDRIVE 2026
        </div>
      </div>
    </footer>
  );
};
