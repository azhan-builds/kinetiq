import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getPostBySlug, type BlogPost } from '../data/blogPosts';
import { urlFor } from '../sanity/client';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    getPostBySlug(slug).then((data) => {
      if (isMounted) {
        setPost(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleNavigateToHome = (sectionId: string) => {
    navigate('/', { state: { targetSection: sectionId } });
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  // Custom PortableText components for rendering PortableText block content
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        const imageUrl = urlFor(value)?.url();
        return (
          <figure className="portable-image-figure">
            <img src={imageUrl} alt={value.alt || ''} className="portable-image-img" loading="lazy" />
            {value.caption && <figcaption className="portable-image-caption">{value.caption}</figcaption>}
          </figure>
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        const target = !value.href.startsWith('/') ? '_blank' : undefined;
        return (
          <a href={value.href} target={target} rel={rel} className="portable-link">
            {children}
          </a>
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="portable-h1">{children}</h1>,
      h2: ({ children }: any) => <h2 className="portable-h2">{children}</h2>,
      h3: ({ children }: any) => <h3 className="portable-h3">{children}</h3>,
      blockquote: ({ children }: any) => <blockquote className="portable-blockquote">{children}</blockquote>,
      normal: ({ children }: any) => <p className="portable-paragraph">{children}</p>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="portable-bullet-list">{children}</ul>,
      number: ({ children }: any) => <ol className="portable-number-list">{children}</ol>,
    },
  };

  return (
    <div className="site-wrapper">
      <Navbar activeSection="blog" onNavigate={handleNavigateToHome} />

      <main className="page-two-sheet blog-post-sheet" style={{ paddingTop: '110px' }}>
        <article className="section-block blog-post-article">
          <div className="blog-post-container">
            {/* Top Back Navigation Link */}
            <motion.div
              className="blog-back-nav"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/blog" className="blog-back-link">
                <span className="back-arrow" aria-hidden="true">←</span>
                <span>BACK TO ALL FIELD NOTES</span>
              </Link>
            </motion.div>

            {loading ? (
              <div className="blog-empty-state">
                <p>Loading field note entry...</p>
              </div>
            ) : !post ? (
              <div className="blog-empty-state">
                <h2>Post Not Found</h2>
                <p>The requested log entry does not exist or has been removed.</p>
                <Link to="/blog" className="blog-full-cta" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                  <span>RETURN TO FIELD NOTES</span>
                  <span className="cta-arrow-icon" aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header Meta & Title */}
                <header className="blog-post-header">
                  <div className="blog-post-meta">
                    <span className="blog-post-category-tag">{post.category}</span>
                    <span className="blog-meta-divider">•</span>
                    <time className="blog-post-date">{formatDate(post.publishedAt)}</time>
                  </div>

                  <h1 className="blog-post-main-title">{post.title}</h1>

                  <div className="blog-post-author-bar">
                    <span className="author-label">AUTHOR</span>
                    <span className="author-name">KINETIQ</span>
                  </div>
                </header>

                {/* Hero Cover Image */}
                {post.coverImage && (
                  <div className="blog-post-hero-frame">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="blog-post-hero-img"
                    />
                  </div>
                )}

                {/* Body Content */}
                <div className="blog-post-body-content">
                  {typeof post.body === 'string' ? (
                    <div className="markdown-rendered-body">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
                    </div>
                  ) : post.body && Array.isArray(post.body) && post.body.length > 0 ? (
                    <PortableText value={post.body} components={portableTextComponents} />
                  ) : (
                    <p className="portable-paragraph">{post.excerpt}</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
