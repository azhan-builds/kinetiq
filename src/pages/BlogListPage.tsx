import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const BlogListPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateToHome = (sectionId: string) => {
    navigate('/', { state: { targetSection: sectionId } });
  };

  return (
    <div className="site-wrapper">
      <Navbar activeSection="blog" onNavigate={handleNavigateToHome} />

      <main className="page-two-sheet blog-page-sheet" style={{ paddingTop: '110px' }}>
        <section className="section-block blog-section">
          <div className="blog-container">
            {/* Header */}
            <motion.div
              className="blog-header"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="blog-header-badge">
                <span>04</span>
                <span className="blog-header-divider">//</span>
                <span>BUILD LOG & FIELD NOTES</span>
              </div>
              <h1 className="blog-main-title">Field Notes.</h1>
              <p className="blog-subtitle">
                Engineering logs, tactical strategies, and season progress updates directly from KINETIQ.
              </p>
            </motion.div>

            {/* Deliberate "Empty on purpose" Coming Soon State */}
            <motion.div
              className="blog-coming-soon-container"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="blog-coming-soon-statement">
                This page is empty on purpose.
              </h2>
              <p className="blog-coming-soon-subline">
                We’d rather show you nothing than show you noise. Check back once the machine has something to say.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

