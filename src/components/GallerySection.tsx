import React from 'react';
import { motion } from 'framer-motion';

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="section-block gallery-section">
      <div className="gallery-placeholder-container">
        <motion.div
          className="gallery-placeholder-content"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Small Editorial Label */}
          <div className="gallery-header-badge">
            <span>02</span>
            <span className="gallery-header-divider">//</span>
            <span>FIELD NOTES</span>
          </div>

          {/* Main Heading */}
          <h2 className="gallery-placeholder-title">Updates coming soon.</h2>

          {/* Supporting Text */}
          <p className="gallery-placeholder-text">
            We’re still building. When there’s something worth showing, you’ll find it here.
          </p>

          {/* Handcrafted Terracotta Line Accent */}
          <div className="gallery-placeholder-line-wrapper">
            <svg
              className="gallery-placeholder-line-svg"
              viewBox="0 0 160 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="8"
                y1="8"
                x2="152"
                y2="8"
                stroke="#716D67"
                strokeWidth="1"
                strokeOpacity="0.22"
                strokeDasharray="3 5"
              />
              <motion.path
                d="M 10 8 C 40 6.8, 80 9.2, 120 7.4 C 135 8.1, 145 7.6, 150 8.1"
                stroke="#BF603B"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  d: [
                    "M 10 8 C 40 6.8, 80 9.2, 120 7.4 C 135 8.1, 145 7.6, 150 8.1",
                    "M 10 8.3 C 42 7.5, 78 8.4, 118 7.9 C 136 7.2, 144 8.3, 150 7.7",
                    "M 10 7.7 C 38 8.1, 82 7.1, 122 8.3 C 134 7.6, 146 7.5, 150 8.0",
                    "M 10 8 C 40 6.8, 80 9.2, 120 7.4 C 135 8.1, 145 7.6, 150 8.1",
                  ],
                  y: [0, 0.4, -0.3, 0],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </div>

          {/* Secondary Monospace Status */}
          <span className="gallery-placeholder-status">
            BUILD IN PROGRESS · NRL 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
};
