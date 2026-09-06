import React from 'react';
import { motion } from 'framer-motion';
import { BUILD_ENTRIES } from '../data/buildEntries';

export const BuildSection: React.FC = () => {
  return (
    <section id="build" className="section-block">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-meta">
          <span>02</span>
          <span className="meta-divider">//</span>
          <span>CHRONOLOGICAL LOG</span>
        </div>

        <h2 className="section-title">The Build</h2>

        <p className="build-intro">
          The Build is a reverse-chronological record of our engineering process. Every entry is dated, specific, and honest about what worked and what didn't.
        </p>

        <div className="build-entries-list">
          {BUILD_ENTRIES.map((entry) => (
            <article key={entry.id} className="log-entry-card">
              <div className="entry-header">
                <div className="entry-meta">
                  <span className="entry-num">ENTRY {entry.entryNumber}</span>
                  <h3 className="entry-title">{entry.title}</h3>
                </div>
                <span className="entry-date">{entry.date}</span>
              </div>
              <div className="entry-body">
                <p>{entry.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="entry-note">
          <strong>Architecture Note:</strong> Future entries will follow a strict structure: date, short title, what was attempted, what was learned, and what's next.
        </div>
      </motion.div>
    </section>
  );
};
