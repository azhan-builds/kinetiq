import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface FocusWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isLast: boolean;
}

const FocusWord: React.FC<FocusWordProps> = ({ word, progress, range, isLast }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [16, 0]);
  const blurVal = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v.toFixed(2)}px)`);

  return (
    <React.Fragment>
      <motion.span
        style={{
          display: 'inline-block',
          opacity,
          y,
          filter,
          willChange: 'transform, filter, opacity',
        }}
      >
        {word}
      </motion.span>
      {!isLast && ' '}
    </React.Fragment>
  );
};

interface FocusWordsProps {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  as?: 'p' | 'div';
}

const FocusWords: React.FC<FocusWordsProps> = ({
  text,
  progress,
  range,
  className,
  as = 'p',
}) => {
  const words = text.split(' ');
  const [startRange, endRange] = range;
  const totalRange = endRange - startRange;
  const n = words.length;

  const span = totalRange * 0.75;
  const wordDuration = totalRange * 0.25;

  const Component = as === 'div' ? motion.div : motion.p;

  return (
    <Component className={className}>
      {words.map((word, i) => {
        const wordStart = n > 1 ? startRange + (i / (n - 1)) * span : startRange;
        const wordEnd = n > 1 ? wordStart + wordDuration : endRange;
        return (
          <FocusWord
            key={i}
            word={word}
            progress={progress}
            range={[wordStart, wordEnd]}
            isLast={i === words.length - 1}
          />
        );
      })}
    </Component>
  );
};

interface FocusDividerProps {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

const FocusDivider: React.FC<FocusDividerProps> = ({ progress, range, className }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [16, 0]);
  const blurVal = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v.toFixed(2)}px)`);

  return (
    <motion.div
      className={className}
      style={{
        opacity,
        y,
        filter,
        willChange: 'transform, filter, opacity',
      }}
    />
  );
};

export const MissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.58'],
  });

  return (
    <section id="mission" ref={sectionRef} className="section-block mission-section">
      <div className="mission-container">
        {/* GROUP 1 — BEGINNING */}
        <div className="mission-manifesto-block">
          <FocusWords
            progress={scrollYProgress}
            range={[0.00, 0.12]}
            className="mission-lead-text"
            text="We’re eight people competing in NRL 2026."
          />

          <FocusWords
            progress={scrollYProgress}
            range={[0.09, 0.28]}
            className="mission-body-headline"
            text="We’re at the beginning. The machine hasn’t been built, the decisions haven’t been made, and the standard hasn’t been lowered."
          />

          <FocusWords
            progress={scrollYProgress}
            range={[0.26, 0.34]}
            className="mission-punch-line"
            text="That’s the point."
          />
        </div>

        {/* DIVIDER & INTENTIONAL PAUSE (0.34 -> 0.44) */}
        <FocusDivider
          progress={scrollYProgress}
          range={[0.34, 0.42]}
          className="mission-divider-line"
        />

        {/* GROUP 2 — THE WORK (Begins sooner, compressed tight range) */}
        <div className="mission-supporting-block">
          <FocusWords
            progress={scrollYProgress}
            range={[0.44, 0.60]}
            className="mission-supporting-text"
            text="KINETIQ is where we document the work — the designs, decisions, tests, failures, revisions, and everything that changes between an idea and a machine that works."
          />

          <FocusWords
            progress={scrollYProgress}
            range={[0.58, 0.72]}
            className="mission-supporting-text"
            text="We’re obsessive about the details. We question decisions that seem obvious, test what can be tested, and keep refining what isn’t good enough."
          />

          {/* GROUP 3 — FINAL STATEMENT (Resolves early by 0.84, completely sharp in view) */}
          <FocusWords
            progress={scrollYProgress}
            range={[0.72, 0.84]}
            className="mission-closing-statement"
            text="The goal isn’t simply to compete. It’s to build something that deserves to win."
          />
        </div>
      </div>
    </section>
  );
};



