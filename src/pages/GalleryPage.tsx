import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getAllPhotos, type GalleryPhoto } from '../data/galleryPhotos';
import { GalleryCard } from '../components/GalleryCard';

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

export const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    getAllPhotos().then((data) => {
      if (isMounted) setPhotos(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    navigate('/', { state: { targetSection: sectionId } });
  };

  return (
    <div className="site-wrapper">
      <Navbar activeSection="gallery" onNavigate={handleNavigate} />

      <main className="page-two-sheet gallery-page-sheet" style={{ paddingTop: '110px' }}>
        <section className="section-block gallery-section full-gallery-section" style={{ borderTop: 'none' }}>
          <div className="gallery-container">
            {/* Top Back Navigation Link */}
            <motion.div
              className="gallery-back-nav"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" state={{ targetSection: 'gallery' }} className="gallery-back-link">
                <span className="back-arrow" aria-hidden="true">←</span>
                <span>BACK TO KINETIQ</span>
              </Link>
            </motion.div>

            {/* Gallery Page Header */}
            <motion.div
              className="gallery-header"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="gallery-header-badge">
                <span>03</span>
                <span className="gallery-header-divider">//</span>
                <span>GALLERY</span>
              </div>
              <h1 className="gallery-main-title">Gallery</h1>
              <p className="gallery-subtitle">
                A visual record of KINETIQ in motion.
              </p>
            </motion.div>

            {/* Full Responsive Photo Grid */}
            <motion.div
              className="gallery-grid full-gallery-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {photos.map((photo) => (
                <GalleryCard
                  key={photo.id}
                  photo={photo}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

