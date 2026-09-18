import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Duration for identity intro: 1.8s for normal, 0.5s for reduced motion
    const duration = mediaQuery.matches ? 500 : 1800;
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(timer);
    };
  }, [onComplete]);

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
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          <div className="preloader-content">
            {/* Logo & Brand Identity Mark */}
            <motion.div
              className="preloader-logo-wrapper"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.96, filter: 'blur(8px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              }
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/kinetiq-logo.svg"
                alt="KINETIQ Logo"
                className="preloader-logo-img"
              />
              <span className="preloader-brand-name">KINETIQ</span>
            </motion.div>

            {/* Restrained Progress Indicator */}
            <motion.div
              className="preloader-meta-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="preloader-progress-bar">
                <motion.div
                  className="preloader-progress-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: prefersReducedMotion ? 0 : 0.15,
                  }}
                />
              </div>

              <span className="preloader-tagline">
                NRL 2026 // HYPERDRIVE
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
