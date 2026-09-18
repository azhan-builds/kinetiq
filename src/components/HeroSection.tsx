import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const HeroMoveUnderline: React.FC = () => {
  const [isDrawn, setIsDrawn] = useState(false);

  // Full-width organic path coordinates (M 1.5 ... 98.5)
  const dBase = "M 1.5 6.0 C 26 4.7, 50 6.9, 74 5.2 C 84 5.8, 92 5.3, 98.5 6.0";
  const dMorph1 = "M 1.5 6.3 C 28 5.3, 48 6.3, 73 5.7 C 85 5.0, 91 6.2, 98.5 5.6";
  const dMorph2 = "M 1.5 5.7 C 24 5.8, 52 4.9, 75 6.2 C 83 5.4, 93 5.1, 98.5 6.2";

  return (
    <svg
      className="hero-move-underline-svg"
      viewBox="0 0 100 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d={isDrawn ? undefined : dBase}
        stroke="#BF603B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isDrawn
            ? {
                d: [dBase, dMorph1, dMorph2, dBase],
                y: [0, 0.5, -0.4, 0],
                pathLength: 1,
                opacity: 1,
              }
            : {
                pathLength: 1,
                opacity: 1,
              }
        }
        transition={
          isDrawn
            ? {
                d: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
                pathLength: { duration: 0 },
                opacity: { duration: 0 },
              }
            : {
                pathLength: { duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2, delay: 0.45 },
              }
        }
        onAnimationComplete={() => {
          if (!isDrawn) {
            setIsDrawn(true);
          }
        }}
      />
    </svg>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [videoHidden, setVideoHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setHasError(true);
        setShowImage(true);
        setVideoHidden(true);
      });
    }

    const handleScroll = () => {
      const vh = window.innerHeight;
      if (vh > 0) {
        const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Hold completed robot state briefly (~200ms), then crossfade to static image
    setTimeout(() => {
      setShowImage(true);
      // Once image fade-in completes (~500ms), remove video element
      setTimeout(() => {
        setVideoHidden(true);
      }, 500);
    }, 200);
  };

  const handleVideoError = () => {
    setHasError(true);
    setShowImage(true);
    setVideoHidden(true);
  };

  // Subtle natural upward movement and slight depth fade as user scrolls past hero
  const heroStyle: React.CSSProperties = {
    transform: `translateY(${-scrollProgress * 14}vh)`,
    opacity: 1 - scrollProgress * 0.35,
    willChange: 'transform, opacity',
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container" style={heroStyle}>
        {/* LEFT ZONE: Typography & Mission Statement */}
        <div className="hero-content-left">
          {/* Main Headline */}
          <h1 className="hero-headline hero-reveal delay-1">
            <span className="headline-line-1">We build machines</span>
            <span className="headline-line-2">
              that{' '}
              <span className="hero-move-wrapper">
                move
                <HeroMoveUnderline />
              </span>{' '}
              with intent.
            </span>
          </h1>

          {/* Secondary Statement */}
          <p className="hero-secondary-statement hero-reveal delay-2">
            We are building for HYPERDRIVE.
          </p>

          {/* Supporting Metadata */}
          <div className="hero-metadata-line hero-reveal delay-3">
            <span>National Robotics League</span>
            <span className="hero-meta-dot" aria-hidden="true">•</span>
            <span>2026</span>
          </div>

          {/* CTA */}
          <div className="hero-reveal delay-4">
            <button
              onClick={() => onNavigate('team')}
              className="hero-cta"
            >
              <span>Meet the team</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT ZONE: Hero Video / Image Seamless Handoff Stage */}
        <div className="hero-visual-stage hero-reveal delay-2">
          <div className="hero-video-viewport">
            {!hasError && !videoHidden && (
              <video
                ref={videoRef}
                className={`hero-video-element ${videoEnded ? 'video-ended' : ''}`}
                src="/hero/kinetiq-formation.mp4"
                poster="/hero/kinetiq-machine-final.png"
                autoPlay
                muted
                playsInline
                controls={false}
                loop={false}
                onEnded={handleVideoEnded}
                onError={handleVideoError}
              />
            )}
            {(showImage || hasError) && (
              <img
                src="/hero/kinetiq-machine-final.png"
                alt="KINETIQ Machine"
                className={`hero-fallback-image hero-breathing ${showImage ? 'image-fade-in' : ''}`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

