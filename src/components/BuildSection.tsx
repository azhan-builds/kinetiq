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
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isLineDrawn, setIsLineDrawn] = React.useState(false);

  React.useEffect(() => {
    const el = wrapperRef.current;
    
    // 1. Primary IntersectionObserver on parent HTML wrapper element
    let observer: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsLineDrawn(true);
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
    } else {
      setIsLineDrawn(true);
    }

    // 2. HARD FALLBACK TIMER: Force fully-drawn state after 1.2s if observer doesn't fire
    const fallbackTimer = setTimeout(() => {
      setIsLineDrawn(true);
    }, 1200);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="build" className="section-block build-section roadmap-section">
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
        <div ref={wrapperRef} className="roadmap-timeline-wrapper vertical-timeline">
          {/* Top-to-Bottom Progress Connector Line */}
          <div className="roadmap-vertical-connector" aria-hidden="true">
            <svg viewBox="0 0 20 1000" preserveAspectRatio="none" className="roadmap-vertical-connector-svg">
              <defs>
                <filter id="hand-inked-filter" x="-20%" y="-5%" width="140%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              {/* Dashed connector track line */}
              <path
                d="M 10 12 L 10 988"
                filter="url(#hand-inked-filter)"
                stroke="#BF603B"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: isLineDrawn ? 1 : 0,
                  transition: 'opacity 0.8s ease-out',
                }}
              />

              {/* Active current phase accent line */}
              <path
                d="M 10 12 L 10 60"
                filter="url(#hand-inked-filter)"
                stroke="#BF603B"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: isLineDrawn ? 1 : 0,
                  transition: 'opacity 0.8s ease-out 0.2s',
                }}
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
