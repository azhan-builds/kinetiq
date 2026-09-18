import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../components/Preloader';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { MissionSection } from '../components/MissionSection';
import { BuildSection } from '../components/BuildSection';
import { GallerySection } from '../components/GallerySection';
import { TeamSection } from '../components/TeamSection';
import { CtaSection } from '../components/CtaSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const location = useLocation();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (location.state && (location.state as any).targetSection) {
      const target = (location.state as any).targetSection;
      setTimeout(() => {
        handleNavigate(target);
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'mission', 'build', 'team', 'gallery', 'connect'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-wrapper">
      <Preloader />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      {/* PAGE 01: HERO */}
      <HeroSection onNavigate={handleNavigate} />

      {/* PAGE 02: THE KINETIQ MISSION LOG (Continuous Sheet) */}
      <div className="page-two-sheet" id="page-two">
        <main>
          <MissionSection />
          <BuildSection />
          <TeamSection />
          <GallerySection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};
