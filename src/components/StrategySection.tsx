import React from 'react';
import { motion } from 'framer-motion';

export const StrategySection: React.FC = () => {
  return (
    <section id="strategy" className="section-block">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-meta">
          <span>04</span>
          <span className="meta-divider">//</span>
          <span>SYSTEMS & TRADE-OFFS</span>
        </div>

        <h2 className="section-title">Strategy & Systems</h2>

        <div className="strategy-box">
          <h3 className="strategy-headline">HYPERDRIVE hasn't been fully scoped by us yet.</h3>
          <p className="strategy-text">
            This section will eventually contain our understanding of the game, what matters, the tradeoffs we make, our strategic approach, and the reasoning behind our engineering decisions.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
