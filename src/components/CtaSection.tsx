import React from 'react';
import { motion, type Variants } from 'framer-motion';

const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const CtaSection: React.FC = () => {
  return (
    <section id="connect" className="section-block cta-section">
      {/* ATMOSPHERIC BACKGROUND LIGHT & ABSTRACT KINETIQ GEOMETRY */}
      <div className="cta-ambient-background" aria-hidden="true">
        {/* Soft Oversized Warm Light Orbs */}
        <div className="ambient-orb orb-terracotta-topleft" />
        <div className="ambient-orb orb-terracotta-bottomright" />
        <div className="ambient-orb orb-warm-beige" />
        <div className="ambient-orb orb-deep-cream" />

        {/* Abstract Geometry Inspired by KINETIQ Logo Mark */}
        <svg className="cta-kinetiq-geometry" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <path
            d="M -100,220 C 150,60 400,390 650,160 C 800,30 950,190 1100,110"
            fill="none"
            stroke="#302C28"
            strokeWidth="1.2"
            opacity="0.04"
          />
          <path
            d="M 180,540 C 430,290 680,510 930,340"
            fill="none"
            stroke="#D97B5B"
            strokeWidth="1"
            opacity="0.05"
          />
          <path
            d="M -40,440 C 210,590 510,410 860,570"
            fill="none"
            stroke="#302C28"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.03"
          />
        </svg>

        {/* Soft Center Vignette Mask */}
        <div className="ambient-center-clearing" />
      </div>

      <motion.div
        className="cta-container"
        variants={ctaContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* HEADLINE & SUPPORTING TEXT */}
        <div className="cta-header">
          <motion.h2 className="cta-main-title" variants={itemVariants}>
            Stay in motion.
          </motion.h2>
          <motion.p className="cta-supporting-text" variants={itemVariants}>
            Follow the work. Watch the build. Get the updates.
          </motion.p>
        </div>

        {/* THREE MINIMAL ICON-BASED EDITORIAL CTA LINKS */}
        <div className="cta-nav-grid">
          {/* INSTAGRAM */}
          <motion.a
            href="https://www.instagram.com/kinetiq.nrl?stkn=MXRnbTMwY213YTY5MQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="cta-nav-item cta-nav-active"
            variants={itemVariants}
          >
            <div className="cta-icon-wrapper">
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="cta-text-wrapper">
              <span className="cta-nav-title">Instagram</span>
              <span className="cta-nav-subtitle">Follow the build</span>
            </div>
          </motion.a>

          {/* YOUTUBE (COMING SOON) */}
          <motion.div
            className="cta-nav-item cta-nav-disabled"
            variants={itemVariants}
            aria-disabled="true"
          >
            <div className="cta-icon-wrapper">
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </div>
            <div className="cta-text-wrapper">
              <div className="cta-title-row">
                <span className="cta-nav-title">YouTube</span>
                <span className="cta-badge">COMING SOON</span>
              </div>
              <span className="cta-nav-subtitle">Watch the build</span>
            </div>
          </motion.div>

          {/* EMAIL */}
          <motion.a
            href="mailto:kinetiqnrl@gmail.com"
            className="cta-nav-item cta-nav-active"
            variants={itemVariants}
          >
            <div className="cta-icon-wrapper">
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="cta-text-wrapper">
              <span className="cta-nav-title">Email</span>
              <span className="cta-nav-subtitle">Get the updates</span>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};




