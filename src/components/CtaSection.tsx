import React from 'react';
import { motion, type Variants } from 'framer-motion';

const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const CtaSection: React.FC = () => {
  return (
    <section id="connect" className="section-block cta-section">
      {/* Soft Low-Opacity Terracotta Radial Ambient Glow */}
      <div className="cta-ambient-glow" aria-hidden="true" />

      <motion.div
        className="cta-container"
        variants={ctaContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* HEADING WITH ACCENT-COLORED ITALIC WORD */}
        <div className="cta-header">
          <motion.h2 className="cta-main-title" variants={itemVariants}>
            Stay in <span className="cta-accent-italic">motion.</span>
          </motion.h2>
          <motion.p className="cta-supporting-text" variants={itemVariants}>
            Follow the work. Watch the build. Get the updates.
          </motion.p>
        </div>

        {/* 3 CIRCULAR CHANNEL ICON BUTTONS */}
        <div className="cta-channel-grid">
          {/* INSTAGRAM */}
          <motion.a
            href="https://www.instagram.com/kinetiq.nrl?stkn=MXRnbTMwY213YTY5MQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span className="cta-channel-label">Instagram</span>
            <span className="cta-channel-caption">Follow the build</span>
          </motion.a>

          {/* YOUTUBE */}
          <motion.a
            href="https://www.youtube.com/@Kinetiqnrl"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </div>
            <span className="cta-channel-label">YouTube</span>
            <span className="cta-channel-caption">Watch the build</span>
          </motion.a>

          {/* EMAIL */}
          <motion.a
            href="mailto:kinetiqnrl@gmail.com"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <span className="cta-channel-label">Email</span>
            <span className="cta-channel-caption">Get the updates</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};





