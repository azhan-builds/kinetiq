import React, { useRef, useState, useEffect } from 'react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setHasError(true);
        setAnimationComplete(true);
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
    // Transition to the static image with breathing animation
    setAnimationComplete(true);
  };

  const handleVideoError = () => {
    setHasError(true);
    setAnimationComplete(true);
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
            <span className="headline-line-2">that move with intent.</span>
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

        {/* RIGHT ZONE: KINETIQ Formation Hero Video Artwork */}
        <div className="hero-visual-stage hero-reveal delay-2">
          <div className="hero-video-viewport">
            {/* Show video during animation, then crossfade to breathing image */}
            {!hasError && !animationComplete && (
              <video
                ref={videoRef}
                className="hero-video-element"
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
            {/* Static image with subtle breathing once animation completes */}
            {(animationComplete || hasError) && (
              <img
                src="/hero/kinetiq-machine-final.png"
                alt="KINETIQ Machine"
                className="hero-fallback-image hero-breathing"
              />
            )}
          </div>
        </div>
      </div>

      {/* Hero Bottom Scroll Indicator */}
      <div className="hero-footer-bar hero-reveal delay-5" style={heroStyle}>
        <button
          onClick={() => onNavigate('mission')}
          className="scroll-indicator"
          aria-label="Scroll to mission section"
        >
          <span>Scroll</span>
          <span className="scroll-arrow" aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
};

