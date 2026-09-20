import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { type GalleryPhoto } from '../data/galleryPhotos';

interface GalleryCardProps {
  photo: GalleryPhoto;
  isFeature?: boolean;
  variants?: Variants;
  className?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  photo,
  isFeature = false,
  variants,
  className = '',
}) => {
  return (
    <motion.article
      className={`target-lock-card gallery-preview-card ${isFeature ? 'gallery-feature-card' : ''} ${className}`}
      variants={variants}
      tabIndex={0}
      aria-label={`${photo.alt}${photo.category ? ` - ${photo.category}` : ''}`}
    >
      <div className="gallery-card-frame">
        <img
          src={photo.src}
          alt={photo.alt}
          className="gallery-card-img"
          loading="lazy"
        />
        <div className="gallery-card-hover-scrim" />

        {/* Target Lock Reticle: 4 Corner Brackets */}
        <div className="target-lock-brackets" aria-hidden="true">
          <span className="target-bracket bracket-tl" />
          <span className="target-bracket bracket-tr" />
          <span className="target-bracket bracket-bl" />
          <span className="target-bracket bracket-br" />
        </div>

        {/* Target Lock Scan-Line Sweep */}
        <div className="target-lock-scanline-container" aria-hidden="true">
          <div className="target-lock-scanbeam" />
        </div>
      </div>

      <div className="gallery-card-info">
        <div className="gallery-card-top-meta">
          {photo.category && (
            <span className="gallery-card-category">{photo.category}</span>
          )}
          {photo.date && (
            <div className="gallery-card-date-wrapper">
              <time className="gallery-card-date-str">{photo.date}</time>
              <span className="gallery-card-node-dot" title="Logged" aria-hidden="true" />
            </div>
          )}
        </div>
        <h3 className="gallery-card-heading">{photo.alt}</h3>
        {photo.caption && (
          <p className="gallery-card-subcaption">{photo.caption}</p>
        )}
      </div>
    </motion.article>
  );
};
