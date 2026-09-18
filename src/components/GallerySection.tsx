import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { getLatestPhotos, type GalleryPhoto } from '../data/galleryPhotos';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    let isMounted = true;
    getLatestPhotos(6).then((data) => {
      if (isMounted) setPhotos(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="gallery" className="section-block gallery-section">
      <div className="gallery-container">
        {/* Header */}
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gallery-header-badge">
            <span>03</span>
            <span className="gallery-header-divider">//</span>
            <span>VISUAL LOG</span>
          </div>
          <h2 className="gallery-main-title">The Gallery</h2>
          <p className="gallery-subtitle">
            Visual documentation of our engineering progress, iterations, and workshop milestones.
          </p>
        </motion.div>

        {/* 6-Photo Grid */}
        {photos.length > 0 && (
          <motion.div
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {photos.map((photo) => (
              <motion.article
                key={photo.id}
                className="gallery-card"
                variants={itemVariants}
              >
                {/* Photo Frame with Soft-Edge Vignette Mask */}
                <div className="gallery-photo-frame">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="gallery-photo-img"
                    loading="lazy"
                  />
                  <div className="gallery-photo-soft-overlay" />
                </div>

                {/* Card Information */}
                <div className="gallery-card-meta">
                  <div className="gallery-card-top-row">
                    <time className="gallery-card-date">{photo.date}</time>
                  </div>
                  <h3 className="gallery-card-title">{photo.alt}</h3>
                  {photo.caption && (
                    <p className="gallery-card-caption">{photo.caption}</p>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Action Button: View Full Gallery */}
        <motion.div
          className="gallery-cta-wrapper"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/gallery" className="hero-cta gallery-cta-pill">
            <span>View full gallery</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
