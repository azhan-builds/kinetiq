import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getAllPosts, type BlogPost } from '../data/blogPosts';

const CATEGORIES = [
  'All',
  'Build Log',
  'Strategy & Ideas',
  'Challenges',
  'Announcements',
];

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

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    getAllPosts().then((data) => {
      if (isMounted) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigateToHome = (sectionId: string) => {
    navigate('/', { state: { targetSection: sectionId } });
  };

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).toUpperCase();
    } catch {
      return isoString;
    }
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

            {/* Category Filter Pills */}
            <motion.div
              className="blog-filter-bar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`blog-filter-pill ${isActive ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>

            {/* Posts Grid or Loading / Empty State */}
            {loading ? (
              <div className="blog-empty-state">
                <p>Loading field notes...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="blog-empty-state">
                <h3>No entries found</h3>
                <p>No log entries categorized under "{selectedCategory}" yet. Check back soon for new updates.</p>
              </div>
            ) : (
              <motion.div
                className="blog-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedCategory}
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    className="blog-card"
                    variants={itemVariants}
                  >
                    <Link to={`/blog/${post.slug}`} className="blog-card-link-wrapper">
                      <div className="blog-card-cover-frame">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="blog-card-cover-img"
                          loading="lazy"
                        />
                        <div className="blog-card-hover-scrim" />
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span className="blog-card-category-tag">{post.category}</span>
                          <time className="blog-card-date">{formatDate(post.publishedAt)}</time>
                        </div>
                        <h2 className="blog-card-title">{post.title}</h2>
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                        <div className="blog-card-footer">
                          <span className="blog-card-byline">BY KINETIQ</span>
                          <span className="blog-card-read-cta">
                            <span>READ ENTRY</span>
                            <span className="cta-arrow" aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
