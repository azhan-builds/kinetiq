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

        {/* 6 CIRCULAR CHANNEL ICON BUTTONS */}
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

          {/* LINKEDIN */}
          <motion.a
            href="https://www.linkedin.com/in/kinetiq-nrl"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <span className="cta-channel-label">LinkedIn</span>
            <span className="cta-channel-caption">Connect with the team</span>
          </motion.a>

          {/* X (TWITTER) */}
          <motion.a
            href="https://x.com/kinetiq_nrl"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon cta-btn-icon-solid" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="cta-channel-label">X (Twitter)</span>
            <span className="cta-channel-caption">Follow the feed</span>
          </motion.a>

          {/* FACEBOOK */}
          <motion.a
            href="https://www.facebook.com/profile.php?id=61594009149860"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-channel-link"
            variants={itemVariants}
          >
            <div className="cta-circle-btn">
              <svg className="cta-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            <span className="cta-channel-label">Facebook</span>
            <span className="cta-channel-caption">Join the page</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};





