import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <span className="footer-logo">KINETIQ</span>
          <span className="footer-tagline">Intelligence in Motion.</span>
        </div>

        <div className="footer-social-links">
          <a
            href="https://www.youtube.com/@Kinetiqnrl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            YouTube
          </a>
          <span className="footer-link-dot">·</span>
          <a
            href="https://www.instagram.com/kinetiq.nrl?stkn=MXRnbTMwY213YTY5MQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
          <span className="footer-link-dot">·</span>
          <a
            href="mailto:kinetiqnrl@gmail.com"
            className="footer-link"
          >
            Email
          </a>
        </div>

        <div className="footer-league-meta">
          National Robotics League · HYPERDRIVE 2026
        </div>
      </div>
    </footer>
  );
};
