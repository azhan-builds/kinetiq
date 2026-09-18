import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      {/* Abstract Background Line Geometry Flourish */}
      <svg className="footer-kinetiq-geometry" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M -50,65 C 200,15 450,105 700,35 C 900,95 1050,15 1250,75"
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.2"
          opacity="0.04"
        />
        <path
          d="M 100,105 C 350,25 600,85 850,15 C 1000,65 1150,25 1300,85"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          opacity="0.05"
        />
        <path
          d="M 0,25 C 250,95 550,15 850,75 C 1050,25 1200,65 1350,15"
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.03"
        />
      </svg>

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
