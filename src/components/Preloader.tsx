import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [hasSeenPreloader] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kinetiq_preloader_seen') === 'true';
    } catch {
      return false;
    }
  });

  const [isVisible, setIsVisible] = useState(!hasSeenPreloader);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (hasSeenPreloader) {
      if (onComplete) onComplete();
      return;
    }

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Total intro duration: 2.1s under normal conditions, 0.5s for reduced motion
    const duration = mediaQuery.matches ? 500 : 2100;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('kinetiq_preloader_seen', 'true');
      } catch {
        // ignore
      }
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(timer);
    };
  }, [hasSeenPreloader, onComplete]);

  // Motion variants for surrounding sketchbook elements
  const strokeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (customDelay: number = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: prefersReducedMotion ? 0.3 : 1.4, ease: EASE_CUBIC, delay: customDelay },
        opacity: { duration: 0.4, delay: customDelay },
      },
    }),
  };

  const markVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (customDelay: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: EASE_CUBIC, delay: customDelay },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: prefersReducedMotion ? 0.2 : 0.6,
              ease: EASE_CUBIC,
            },
          }}
        >
          {/* Hand-Drawn Editorial Engineering Sketchbook SVG Overlay */}
          <svg
            className="preloader-sketchbook-svg"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Top-Left Peripheral Trajectory & Technical Ticks */}
            <g className="sketch-group sketch-top-left">
              {/* Main curved trajectory */}
              <motion.path
                d="M -30 180 C 180 110, 290 350, 490 270"
                stroke="#716D67"
                strokeWidth="1.2"
                strokeOpacity="0.26"
                strokeDasharray="6 5"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.1}
              />
              {/* Parallel Terracotta accent stroke */}
              <motion.path
                d="M -15 205 C 170 135, 275 365, 470 290"
                stroke="#BF603B"
                strokeWidth="1.5"
                strokeOpacity="0.45"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.25}
              />
              {/* Drafting Crosshair Mark */}
              <motion.g variants={markVariants} initial="hidden" animate="visible" custom={0.35}>
                <line x1="280" y1="208" x2="280" y2="232" stroke="#716D67" strokeWidth="1" strokeOpacity="0.35" />
                <line x1="268" y1="220" x2="292" y2="220" stroke="#716D67" strokeWidth="1" strokeOpacity="0.35" />
                <circle cx="280" cy="220" r="3.5" fill="none" stroke="#BF603B" strokeWidth="1" strokeOpacity="0.5" />
              </motion.g>
              {/* Angle arc & tiny terracotta fragment */}
              <motion.path
                d="M 130 125 A 35 35 0 0 1 160 155"
                stroke="#716D67"
                strokeWidth="1"
                strokeOpacity="0.25"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.3}
              />
              <motion.circle
                cx="168"
                cy="160"
                r="2"
                fill="#BF603B"
                fillOpacity="0.65"
                variants={markVariants}
                initial="hidden"
                animate="visible"
                custom={0.4}
              />
            </g>

            {/* Top-Right Peripheral Trajectory & Marks */}
            <g className="sketch-group sketch-top-right">
              <motion.path
                d="M 1470 130 C 1240 230, 1150 70, 950 190"
                stroke="#716D67"
                strokeWidth="1.2"
                strokeOpacity="0.22"
                strokeDasharray="8 4 2 4"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.15}
              />
              <motion.path
                d="M 1350 215 C 1230 265, 1170 185, 1070 225"
                stroke="#BF603B"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeDasharray="16 6 4 5"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.3}
              />
              <motion.g variants={markVariants} initial="hidden" animate="visible" custom={0.45}>
                <line x1="1150" y1="128" x2="1150" y2="152" stroke="#716D67" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="1138" y1="140" x2="1162" y2="140" stroke="#716D67" strokeWidth="1" strokeOpacity="0.3" />
              </motion.g>
            </g>

            {/* Bottom-Right Sketch Mark */}
            <g className="sketch-group sketch-bottom-right">
              <motion.path
                d="M 1450 730 C 1270 810, 1090 670, 880 780"
                stroke="#716D67"
                strokeWidth="1.2"
                strokeOpacity="0.2"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.2}
              />
              {/* Terracotta Hatch Ticks */}
              <motion.g variants={markVariants} initial="hidden" animate="visible" custom={0.5}>
                <line x1="1020" y1="720" x2="1028" y2="735" stroke="#BF603B" strokeWidth="1.2" strokeOpacity="0.5" />
                <line x1="1032" y1="718" x2="1040" y2="733" stroke="#BF603B" strokeWidth="1.2" strokeOpacity="0.5" />
                <line x1="1044" y1="716" x2="1052" y2="731" stroke="#BF603B" strokeWidth="1.2" strokeOpacity="0.5" />
              </motion.g>
            </g>

            {/* Bottom-Left Sketch Mark */}
            <g className="sketch-group sketch-bottom-left">
              <motion.path
                d="M 60 780 C 200 750, 340 820, 460 760"
                stroke="#716D67"
                strokeWidth="1"
                strokeOpacity="0.18"
                strokeDasharray="4 6"
                variants={strokeVariants}
                initial="hidden"
                animate="visible"
                custom={0.25}
              />
              <motion.g variants={markVariants} initial="hidden" animate="visible" custom={0.4}>
                <line x1="180" y1="750" x2="180" y2="770" stroke="#716D67" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="170" y1="760" x2="190" y2="760" stroke="#716D67" strokeWidth="1" strokeOpacity="0.3" />
              </motion.g>
            </g>
          </svg>

          {/* Clean Editorial Center Content */}
          <div className="preloader-content">
            {/* Logo & Brand Identity */}
            <motion.div
              className="preloader-logo-wrapper"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, filter: 'blur(6px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.75,
                ease: EASE_CUBIC,
                delay: prefersReducedMotion ? 0 : 0.1,
              }}
            >
              <img
                src="/kinetiq-logo.svg"
                alt="KINETIQ Logo"
                className="preloader-logo-img"
              />
              <span className="preloader-brand-name">KINETIQ</span>
            </motion.div>

            {/* Organic Imperfect Terracotta Line Progress System */}
            <motion.div
              className="preloader-line-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <svg
                className="preloader-organic-line-svg"
                viewBox="0 0 220 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pencil Guide Line underneath */}
                <line
                  x1="12"
                  y1="12"
                  x2="208"
                  y2="12"
                  stroke="#716D67"
                  strokeWidth="1"
                  strokeOpacity="0.22"
                  strokeDasharray="3 5"
                />
                <line x1="12" y1="7" x2="12" y2="17" stroke="#716D67" strokeWidth="1" strokeOpacity="0.25" />
                <line x1="208" y1="7" x2="208" y2="17" stroke="#716D67" strokeWidth="1" strokeOpacity="0.25" />

                {/* Main Organic Hand-Drawn Terracotta Line Path */}
                <motion.path
                  d="M 14 12 C 46 10.4, 78 13.4, 110 11.2 C 142 12.6, 174 11.1, 206 12.4"
                  stroke="#BF603B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 1.35,
                    ease: EASE_CUBIC,
                    delay: prefersReducedMotion ? 0 : 0.3,
                  }}
                />

                {/* Secondary Organic Accent Stroke for hand-drawn ink texture */}
                <motion.path
                  d="M 16 12.8 C 50 11.9, 95 13.1, 150 11.8 C 178 12.3, 194 11.7, 203 12.5"
                  stroke="#BF603B"
                  strokeWidth="1.2"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 0.94, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 1.25,
                    ease: EASE_CUBIC,
                    delay: prefersReducedMotion ? 0 : 0.38,
                  }}
                />
              </svg>

              {/* Subtitle / Tagline */}
              <motion.span
                className="preloader-tagline"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_CUBIC,
                  delay: prefersReducedMotion ? 0.1 : 0.55,
                }}
              >
                NRL 2026 // HYPERDRIVE
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
