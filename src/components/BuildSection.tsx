import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { BUILD_ENTRIES } from '../data/buildEntries';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
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

export const BuildSection: React.FC = () => {
  return (
    <section id="build" className="section-block build-section">
      {/* Subtle Background Watermark */}
      <div className="build-watermark" aria-hidden="true">
        <img src="/kinetiq_robot_lineart.png" alt="" />
      </div>

      <div className="build-container">
        {/* Section Header */}
        <motion.div
          className="build-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="build-header-badge">
            <span>02</span>
            <span className="build-header-divider">//</span>
            <span>CHRONOLOGICAL LOG</span>
          </div>
          <h2 className="build-main-title">The Build</h2>
          <p className="build-subtitle">
            A dated, honest record of what worked and what didn't.
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="build-timeline-wrapper">
          <motion.div
            className="build-entries-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {BUILD_ENTRIES.map((entry) => (
              <motion.article
                key={entry.id}
                className="build-entry-item"
                variants={itemVariants}
              >
                {/* Timeline node & connector rail */}
                <div className="build-timeline-node-wrapper">
                  <div className="build-timeline-node" />
                  <div className="build-timeline-line" />
                </div>

                {/* Main Entry Card */}
                <div className="build-entry-card">
                  <div className="build-card-meta">
                    <div className="build-card-left-meta">
                      <span className="build-entry-number">LOG //{entry.entryNumber}</span>
                      <span className={`build-status-badge status-${entry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {entry.status}
                      </span>
                    </div>
                    <time className="build-entry-date">{entry.date}</time>
                  </div>

                  <h3 className="build-entry-title">{entry.title}</h3>
                  <p className="build-entry-summary">{entry.summary}</p>

                  {/* Optional Detailed Fields */}
                  {(entry.attempted || entry.learned || entry.next) && (
                    <div className="build-entry-details">
                      {entry.attempted && (
                        <div className="build-detail-block">
                          <span className="build-detail-label">Attempted</span>
                          <p className="build-detail-text">{entry.attempted}</p>
                        </div>
                      )}
                      {entry.learned && (
                        <div className="build-detail-block">
                          <span className="build-detail-label">Learned</span>
                          <p className="build-detail-text">{entry.learned}</p>
                        </div>
                      )}
                      {entry.next && (
                        <div className="build-detail-block">
                          <span className="build-detail-label">Next Steps</span>
                          <p className="build-detail-text">{entry.next}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}

            {/* Faded Ghost Entry visually signaling ongoing live log */}
            <motion.div className="build-entry-item build-ghost-item" variants={itemVariants}>
              <div className="build-timeline-node-wrapper">
                <div className="build-timeline-node ghost-node" />
                <div className="build-timeline-line dashed-line" />
              </div>
              <div className="build-ghost-card">
                <div className="build-card-meta">
                  <span className="build-ghost-tag">// LIVE REPOSITORY</span>
                  <span className="build-ghost-status">INCOMING</span>
                </div>
                <p className="build-ghost-text">
                  Future entries will log CAD iterations, telemetry tests, and competition prep in real time as the season unfolds.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

