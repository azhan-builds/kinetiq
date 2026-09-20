import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getAllPosts, type BlogPost } from '../data/blogPosts';

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

const CATEGORIES = ['All', 'Build Log', 'Strategy & Ideas', 'Challenges', 'Announcements'];

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

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
                Engineering logs, tactical strategies, and behind-the-scenes build updates.
              </p>
            </motion.div>

            {loading ? (
              <div className="blog-empty-state">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  Loading field notes...
                </p>
              </div>
            ) : posts.length === 0 ? (
              /* Deliberate "Empty on purpose" Coming Soon State when zero posts exist */
              <motion.div
                className="blog-coming-soon-container"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="blog-coming-soon-statement">
                  This page is empty on purpose.
                </h2>
                <p className="blog-coming-soon-subline">
                  We’d rather show you nothing than show you noise. Check back once the machine has something to say.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Category Filter Pills */}
                <motion.div
                  className="blog-filter-bar"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`blog-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>

                {/* Posts Grid */}
                <motion.div
                  className="blog-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={itemVariants}>
                      <Link to={`/blog/${post.slug}`} className="blog-card">
                        {post.coverImage && (
                          <div className="blog-card-image-frame">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="blog-card-img"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="blog-card-content">
                          <div className="blog-card-meta">
                            <span className="blog-card-tag">{post.category}</span>
                            <span className="blog-meta-dot">•</span>
                            <time className="blog-card-date">{formatDate(post.publishedAt)}</time>
                          </div>

                          <h2 className="blog-card-title">{post.title}</h2>
                          <p className="blog-card-excerpt">{post.excerpt}</p>

                          <div className="blog-card-footer">
                            <span className="blog-card-author">AUTHOR: KINETIQ</span>
                            <span className="blog-card-read-link">
                              <span>READ ENTRY</span>
                              <span aria-hidden="true">→</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
