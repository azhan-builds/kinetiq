import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';

interface TeamMember {
  num: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    num: '01',
    name: 'Mohammed Azhan',
    role: 'Mechanical & Electrical Lead',
    image: '/team/mohammed-azhan.svg',
    description: 'Leads the mechanical and electrical side of KINETIQ, turning concepts into physical systems and making sure every component works together.',
  },
  {
    num: '02',
    name: 'Shaaz Umer',
    role: 'Software & Controls Lead',
    image: '/team/shaaz-umer.svg',
    description: 'Works at the intersection of software and the machine, developing the control systems that make KINETIQ precise, responsive, and reliable.',
  },
  {
    num: '03',
    name: 'Usman Gani',
    role: 'Media & Comms',
    image: '/team/usman-gani.svg',
    description: 'Documents the journey and shapes how KINETIQ communicates its work, from the build process to the story behind it.',
  },
  {
    num: '04',
    name: 'Syed Saarim',
    role: 'Media & Comms',
    image: '/team/syed-saarim.svg',
    description: 'Helps bring KINETIQ’s work beyond the workshop, capturing the people, progress, and moments that make up the journey.',
  },
  {
    num: '05',
    name: 'Mohammed Rawaaha',
    role: 'Design Lead',
    image: '/team/mohammed-rawaaha.svg',
    description: 'Shapes the visual identity of the machine and the team, translating ideas into clear, purposeful visual systems.',
  },
  {
    num: '06',
    name: 'Mohammed Baseem',
    role: 'Documentation & Strategy',
    image: '/team/mohammed-baseem.svg',
    description: 'Keeps track of the bigger picture, connecting documentation, operations, and strategic thinking throughout the competition.',
  },
  {
    num: '07',
    name: 'Syed Vasaf',
    role: 'Content & Editorial',
    image: '/team/Syed_vasaf.svg',
    description: 'Focuses on content production and editorial work, shaping how KINETIQ’s engineering and build process is presented and documented.',
  },
  {
    num: '08',
    name: 'Ikrima',
    role: 'Content & Editorial',
    image: '/team/Ikrima.svg',
    description: 'Drives editorial refining and content creation, ensuring the depth and precision of KINETIQ’s story is clearly articulated.',
  },
];

// Motion Variants
const cardParentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const portraitVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(8px)',
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const textItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Continuous SVG Editorial Stroke Component
interface EditorialStrokeProps {
  progress: any;
}

const EditorialStroke: React.FC<EditorialStrokeProps> = ({ progress }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [sparkPos, setSparkPos] = useState({ x: 500, y: 80 });

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
      const startPt = pathRef.current.getPointAtLength(0);
      setSparkPos({ x: startPt.x, y: startPt.y });
    }
  }, []);

  useMotionValueEvent(progress, 'change', (latest: number) => {
    if (pathRef.current && pathLength > 0) {
      const currentDist = Math.min(Math.max(latest, 0), 1) * pathLength;
      const pt = pathRef.current.getPointAtLength(currentDist);
      setSparkPos({ x: pt.x, y: pt.y });
    }
  });

  const strokeDashoffset = useTransform(progress, [0, 1], [pathLength, 0]);

  // Organic S-curve path weaving between 8 alternating cards inside centered column
  const pathData = `
    M 500,80
    C 500,220 300,220 300,420
    C 300,700 700,700 700,1100
    C 700,1450 300,1450 300,1800
    C 300,2150 700,2150 700,2500
    C 700,2850 300,2850 300,3200
    C 300,3550 700,3550 700,3900
    C 700,4250 300,4250 300,4600
    C 300,4950 700,4950 700,5300
    C 700,5500 500,5500 500,5650
  `;

  return (
    <svg
      className="team-editorial-stroke-svg"
      viewBox="0 0 1000 5750"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="#D97B5B"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset,
        }}
      />
      {pathLength > 0 && (
        <g transform={`translate(${sparkPos.x}, ${sparkPos.y})`}>
          <circle
            r="3.5"
            fill="#D97B5B"
            className="stroke-tip-spark"
          />
        </g>
      )}
    </svg>
  );
};

// Single Editorial Card Component
interface TeamEditorialCardProps {
  member: TeamMember;
  index: number;
  activeCardIndex: number | null;
  setActiveCardIndex: (idx: number | null) => void;
}

const TeamEditorialCard: React.FC<TeamEditorialCardProps> = ({
  member,
  index,
  activeCardIndex,
  setActiveCardIndex,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle Parallax on Portrait
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // Active Focus Observer
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCardIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, setActiveCardIndex]);

  // Cursor-responsive portrait movement (Desktop max 3-5px)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    setMousePos({ x: offsetX * 4, y: offsetY * 4 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const isReverse = index % 2 === 1;
  const isMuted = activeCardIndex !== null && activeCardIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      className={`team-editorial-card ${isReverse ? 'layout-reverse' : 'layout-standard'} ${
        isMuted ? 'card-muted' : 'card-active'
      }`}
      variants={cardParentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* PORTRAIT CONTAINER */}
      <motion.div
        className="team-portrait-wrapper"
        variants={portraitVariants}
        style={{ y: portraitParallaxY }}
      >
        <div
          className="team-portrait-frame"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={member.image}
            alt={member.name}
            className="team-portrait-img"
            loading="lazy"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${
                mousePos.x !== 0 ? 1.025 : 1
              })`,
              transition:
                mousePos.x === 0
                  ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 0.15s ease-out',
            }}
          />
        </div>
      </motion.div>

      {/* INFORMATION BLOCK */}
      <div className="team-info-wrapper">
        <motion.span className="team-member-num" variants={textItemVariants}>
          {member.num}
        </motion.span>

        <motion.h3 className="team-member-name" variants={textItemVariants}>
          {member.name}
        </motion.h3>

        <motion.p className="team-member-role" variants={textItemVariants}>
          {member.role}
        </motion.p>

        <motion.p className="team-member-desc" variants={textItemVariants}>
          {member.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.90'],
  });

  return (
    <section id="team" ref={sectionRef} className="section-block team-section">
      {/* BACKGROUND CONTINUOUS ORGANIC STROKE */}
      <EditorialStroke progress={scrollYProgress} />

      {/* HEADER */}
      <div className="team-header">
        <h2 className="team-main-title">The Team</h2>
        <p className="team-subtitle">Eight people. One machine.</p>
      </div>

      {/* ALTERNATING CARDS STACK */}
      <div className="team-cards-stack">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamEditorialCard
            key={member.num}
            member={member}
            index={index}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
          />
        ))}
      </div>
    </section>
  );
};


