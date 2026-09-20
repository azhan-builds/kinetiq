import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { getLatestPhotos, type GalleryPhoto } from '../data/galleryPhotos';
import { GalleryCard } from './GalleryCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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
      <div className="gallery-preview-container">
        {/* Editorial Section Header */}
        <motion.div
          className="gallery-preview-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gallery-header-badge">
            <span>02</span>
            <span className="gallery-header-divider">//</span>
            <span>GALLERY</span>
          </div>

          <h2 className="gallery-preview-title">Inside the build.</h2>

          <p className="gallery-preview-subtitle">
            A record of the machines, people, experiments, and moments behind KINETIQ.
          </p>
        </motion.div>

        {/* 6-Photo Editorial Grid Composition (1 Feature + 5 Supporting) */}
        <motion.div
          className="gallery-preview-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {photos.map((photo, index) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              isFeature={index === 0}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Understated Show More CTA */}
        <motion.div
          className="gallery-cta-wrapper"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/gallery" className="gallery-full-cta">
            <span>VIEW FULL GALLERY</span>
            <span className="cta-arrow-icon" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

