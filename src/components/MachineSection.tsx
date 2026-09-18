import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

interface PartConfig {
  id: string;
  name: string;
  label: string;
  image: string;
  bounds: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  zIndex: number;
  explodedDesktop: { x: number; y: number; scale?: number };
  explodedMobile: { x: number; y: number; scale?: number };
  leader: {
    // Relative % coordinates within part wrapper
    anchorX: number;
    anchorY: number;
    labelX: number;
    labelY: number;
    align: 'left' | 'right' | 'center';
  };
}

const PARTS: PartConfig[] = [
  {
    id: 'chassis',
    name: 'chassis',
    label: 'CHASSIS // CORE ASSEMBLY',
    image: '/hero/parts/chassis.png',
    bounds: { left: '27.0%', top: '41.0%', width: '48.1%', height: '34.5%' },
    zIndex: 3,
    explodedDesktop: { x: 0, y: 0 },
    explodedMobile: { x: 0, y: 0 },
    leader: { anchorX: 85, anchorY: 35, labelX: 115, labelY: 35, align: 'left' },
  },
  {
    id: 'wheel_rear_left',
    name: 'wheel_rear_left',
    label: 'WHEEL // REAR L',
    image: '/hero/parts/wheel_rear_left.png',
    bounds: { left: '16.4%', top: '43.8%', width: '15.0%', height: '25.6%' },
    zIndex: 1,
    explodedDesktop: { x: -90, y: -40 },
    explodedMobile: { x: -45, y: -20 },
    leader: { anchorX: 15, anchorY: 30, labelX: -90, labelY: -10, align: 'right' },
  },
  {
    id: 'wheel_rear_right',
    name: 'wheel_rear_right',
    label: 'WHEEL // REAR R',
    image: '/hero/parts/wheel_rear_right.png',
    bounds: { left: '57.3%', top: '42.9%', width: '24.6%', height: '36.3%' },
    zIndex: 2,
    explodedDesktop: { x: 90, y: -40 },
    explodedMobile: { x: 45, y: -20 },
    leader: { anchorX: 85, anchorY: 30, labelX: 130, labelY: -10, align: 'left' },
  },
  {
    id: 'neck',
    name: 'neck',
    label: 'MAST // ARTICULATION',
    image: '/hero/parts/neck.png',
    bounds: { left: '33.4%', top: '29.8%', width: '18.4%', height: '21.0%' },
    zIndex: 4,
    explodedDesktop: { x: 0, y: -70 },
    explodedMobile: { x: 0, y: -35 },
    leader: { anchorX: 10, anchorY: 45, labelX: -90, labelY: 30, align: 'right' },
  },
  {
    id: 'wheel_front_left',
    name: 'wheel_front_left',
    label: 'WHEEL // FRONT L',
    image: '/hero/parts/wheel_front_left.png',
    bounds: { left: '29.4%', top: '52.2%', width: '28.7%', height: '31.7%' },
    zIndex: 5,
    explodedDesktop: { x: -110, y: 70 },
    explodedMobile: { x: -55, y: 35 },
    leader: { anchorX: 15, anchorY: 70, labelX: -80, labelY: 90, align: 'right' },
  },
  {
    id: 'head',
    name: 'head',
    label: 'SENSOR HEAD',
    image: '/hero/parts/head.png',
    bounds: { left: '36.9%', top: '19.1%', width: '23.5%', height: '18.6%' },
    zIndex: 6,
    explodedDesktop: { x: 0, y: -160, scale: 1.04 },
    explodedMobile: { x: 0, y: -80, scale: 1.04 },
    leader: { anchorX: 65, anchorY: 20, labelX: 125, labelY: -40, align: 'left' },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const MachineSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="machine" className="section-block machine-section">
      <div className="machine-container">
        {/* Header */}
        <motion.div
          className="machine-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="machine-header-badge">
            <span>01</span>
            <span className="machine-header-divider">//</span>
            <span>SYSTEM ANATOMY</span>
          </div>
          <h2 className="machine-main-title">Anatomy of the Machine</h2>
          <p className="machine-subtitle">
            Deconstructed into core functional subsystems built for precision and reliability.
          </p>
        </motion.div>

        {/* Machine Assembly Stage */}
        <motion.div
          className="machine-stage-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PARTS.map((part) => {
            const offset = isMobile ? part.explodedMobile : part.explodedDesktop;
            
            return (
              <motion.div
                key={part.id}
                className="machine-part-wrapper"
                style={{
                  left: part.bounds.left,
                  top: part.bounds.top,
                  width: part.bounds.width,
                  height: part.bounds.height,
                  zIndex: part.zIndex,
                }}
                variants={{
                  hidden: {
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  },
                  visible: {
                    x: offset.x,
                    y: offset.y,
                    scale: offset.scale || 1,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                {/* Part Crop Image */}
                <img
                  src={part.image}
                  alt={part.label}
                  className="machine-part-img"
                  loading="lazy"
                />

                {/* Subsystem Label & Leader Line */}
                <motion.div
                  className="machine-part-annotation"
                  variants={labelVariants}
                >
                  <svg
                    className="machine-leader-svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line
                      x1={`${part.leader.anchorX}%`}
                      y1={`${part.leader.anchorY}%`}
                      x2={`${part.leader.labelX}%`}
                      y2={`${part.leader.labelY}%`}
                      stroke="var(--color-accent)"
                      strokeWidth="1.2"
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx={`${part.leader.anchorX}%`}
                      cy={`${part.leader.anchorY}%`}
                      r="2.5"
                      fill="var(--color-accent)"
                    />
                  </svg>

                  <div
                    className={`machine-part-tag-wrapper align-${part.leader.align}`}
                    style={{
                      left: `${part.leader.labelX}%`,
                      top: `${part.leader.labelY}%`,
                    }}
                  >
                    <span className="machine-part-tag">{part.label}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
