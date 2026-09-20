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
  const pathRef = React.useRef<SVGPathElement>(null);
  const staticPathRef = React.useRef<SVGPathElement>(null);

  const [isLineDrawn, setIsLineDrawn] = React.useState(false);
  const [debugData, setDebugData] = React.useState<Record<string, any>>({});

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

  // INSTRUMENTATION: Measure DOM styles, bounding rects, and attributes
  React.useEffect(() => {
    const updateDebugMetrics = () => {
      const pathEl = pathRef.current;
      const staticEl = staticPathRef.current;
      const containerEl = wrapperRef.current;

      const pathStyle = pathEl ? window.getComputedStyle(pathEl) : null;
      const pathRect = pathEl ? pathEl.getBoundingClientRect() : null;

      const staticStyle = staticEl ? window.getComputedStyle(staticEl) : null;
      const staticRect = staticEl ? staticEl.getBoundingClientRect() : null;

      const containerRect = containerEl ? containerEl.getBoundingClientRect() : null;

      const metrics = {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        isLineDrawn,
        motionPath: {
          inDOM: !!pathEl,
          d: pathEl ? pathEl.getAttribute('d') : null,
          computedStyle: pathStyle
            ? {
                stroke: pathStyle.stroke,
                strokeWidth: pathStyle.strokeWidth,
                opacity: pathStyle.opacity,
                display: pathStyle.display,
                visibility: pathStyle.visibility,
                strokeDasharray: pathStyle.strokeDasharray,
                strokeDashoffset: pathStyle.strokeDashoffset,
              }
            : null,
          boundingRect: pathRect
            ? {
                x: Math.round(pathRect.x),
                y: Math.round(pathRect.y),
                width: Math.round(pathRect.width),
                height: Math.round(pathRect.height),
              }
            : null,
        },
        staticPath: {
          inDOM: !!staticEl,
          d: staticEl ? staticEl.getAttribute('d') : null,
          computedStyle: staticStyle
            ? {
                stroke: staticStyle.stroke,
                strokeWidth: staticStyle.strokeWidth,
                opacity: staticStyle.opacity,
                display: staticStyle.display,
                visibility: staticStyle.visibility,
              }
            : null,
          boundingRect: staticRect
            ? {
                x: Math.round(staticRect.x),
                y: Math.round(staticRect.y),
                width: Math.round(staticRect.width),
                height: Math.round(staticRect.height),
              }
            : null,
        },
        containerRect: containerRect
          ? {
              x: Math.round(containerRect.x),
              y: Math.round(containerRect.y),
              width: Math.round(containerRect.width),
              height: Math.round(containerRect.height),
            }
          : null,
      };

      setDebugData(metrics);
      console.log('[ROADMAP DEBUG METRICS]', metrics);
    };

    updateDebugMetrics();
    const timer = setInterval(updateDebugMetrics, 500);
    return () => clearInterval(timer);
  }, [isLineDrawn]);

  return (
    <section id="build" className="section-block build-section roadmap-section">
      {/* TEMPORARY ON-PAGE DEBUG OVERLAY */}
      <div
        style={{
          position: 'relative',
          margin: '0 auto 1.5rem',
          maxWidth: '680px',
          background: 'rgba(20, 20, 20, 0.92)',
          color: '#00FF66',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '12px',
          borderRadius: '8px',
          zIndex: 9999,
          textAlign: 'left',
          overflowX: 'auto',
        }}
      >
        <div style={{ fontWeight: 'bold', color: '#FFF', marginBottom: '4px' }}>
          [ROADMAP DEBUG METRICS — STEP 1 & STEP 2]
        </div>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>

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

              {/* STEP 2 DIRECT TEST: Plain static path with NO animation props */}
              <path
                ref={staticPathRef}
                d="M 10 12 L 10 988"
                stroke="#BF603B"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />

              {/* Animated motion path with filter */}
              <motion.path
                ref={pathRef}
                d="M 10 12 L 10 988"
                filter="url(#hand-inked-filter)"
                stroke="#BF603B"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isLineDrawn ? 1 : 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />

              {/* Current phase scroll-triggered draw-in hand-inked path */}
              <motion.path
                d="M 10 12 L 10 60"
                filter="url(#hand-inked-filter)"
                stroke="#BF603B"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isLineDrawn ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: isLineDrawn ? 0.2 : 0 }}
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
