import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ROADMAP_PHASES } from '../data/roadmapPhases';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const getIconShiverProps = (phaseId: string) => {
  switch (phaseId) {
    case 'kickoff':
      return {
        animate: {
          rotate: [-3, -1.8, -3.5, -2.2, -3],
          x: [0, 1.5, -1, 2, 0],
          y: [0, -1, 1.5, -0.5, 0],
        },
        transition: {
          duration: 5.4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0,
        },
      };
    case 'prototype':
      return {
        animate: {
          rotate: [2.5, 3.8, 1.7, 3.2, 2.5],
          x: [0, -1.5, 2, -1, 0],
          y: [0, 1.5, -1, 2, 0],
        },
        transition: {
          duration: 6.6,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 1.2,
        },
      };
    case 'build':
      return {
        animate: {
          rotate: [-2, -0.8, -2.8, -1.2, -2],
          x: [0, 2, -1.5, 1, 0],
          y: [0, -1.5, 1, -2, 0],
        },
        transition: {
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.6,
        },
      };
    case 'test':
      return {
        animate: {
          rotate: [3.5, 1.8, 4.2, 2.8, 3.5],
          x: [0, -2, 1, -1.8, 0],
          y: [0, 1, -2, 1.2, 0],
        },
        transition: {
          duration: 5.9,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 1.8,
        },
      };
    default:
      return {};
  }
};

export const BuildSection: React.FC = () => {
  return (
    <section id="build" className="section-block build-section roadmap-section">
      {/* SVG Turbulence & Displacement Filter for Hand-Inked Line Effect */}
      <svg width="0" height="0" className="roadmap-filter-svg" aria-hidden="true">
        <defs>
          <filter id="hand-inked-filter" x="-20%" y="-10%" width="140%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="build-container roadmap-container">
        {/* Section Header */}
        <motion.div
          className="build-header roadmap-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="build-header-badge">
            <span>02</span>
            <span className="build-header-divider">//</span>
            <span>SEASON ROADMAP</span>
          </div>
          <h2 className="build-main-title">The Roadmap</h2>
          <p className="build-subtitle">
            Six phases. One machine. Here’s where we are.
          </p>
        </motion.div>

        {/* Vertical Timeline Wrapper (All Breakpoints) */}
        <div className="roadmap-timeline-wrapper vertical-timeline">
          {/* Top-to-Bottom Hand-Inked Connector Line */}
          <div className="roadmap-vertical-connector" aria-hidden="true">
            <svg viewBox="0 0 20 1000" preserveAspectRatio="none" className="roadmap-vertical-connector-svg">
              <motion.path
                d="M 10 10 L 10 990"
                filter="url(#hand-inked-filter)"
                stroke="#BF603B"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* 6 Roadmap Phase Items (Vertical Stack Across All Breakpoints) */}
          <motion.div
            className="roadmap-vertical-stack"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {ROADMAP_PHASES.map((phase) => {
              const shiverProps = getIconShiverProps(phase.id);
              return (
                <motion.div
                  key={phase.id}
                  className={`roadmap-phase-item-vertical ${phase.status === 'current' ? 'phase-current' : 'phase-upcoming'}`}
                  variants={itemVariants}
                >
                  {/* Timeline Node Column */}
                  <div className="roadmap-node-col">
                    <div className={`roadmap-node ${phase.status === 'current' ? 'node-filled' : 'node-hollow'}`}>
                      {phase.status === 'current' && <div className="node-inner-dot" />}
                    </div>
                  </div>

                  {/* Right-Aligned Info Column */}
                  <div className="roadmap-info-col">
                    <span className="roadmap-phase-step">{phase.stepNumber}</span>
                    <h3 className="roadmap-phase-title">{phase.title}</h3>
                    {phase.subtext && (
                      <span className="roadmap-phase-subtext">({phase.subtext})</span>
                    )}
                    <p className="roadmap-phase-description">{phase.description}</p>
                  </div>

                  {/* Scattered Margin Sketch Icon (Loosely offset with subtle shiver idle animation) */}
                  {phase.icon && (
                    <motion.div
                      className={`roadmap-scattered-sketch sketch-${phase.id}`}
                      {...shiverProps}
                    >
                      <img
                        src={phase.icon}
                        alt=""
                        className="roadmap-sketch-img"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Current-phase note under timeline */}
        <motion.p
          className="roadmap-note"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Log entries return once there’s real build progress to document.
        </motion.p>
      </div>
    </section>
  );
};
