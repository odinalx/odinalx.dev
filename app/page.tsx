'use client';

import Experience from './experience';
import Work from './work';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Typewriter Text Component (hover-triggered only)
function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const originalText = text;
  
  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    let currentIndex = 1; // Start from 1 to keep first letter visible
    
    const interval = setInterval(() => {
      if (currentIndex <= originalText.length) {
        setDisplayText(originalText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        isAnimatingRef.current = false;
      }
    }, 80);
  };
  
  return (
    <h1 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ 
        whiteSpace: 'nowrap',
        position: 'relative',
        display: 'inline-block',
        cursor: 'none',
      }}
    >
      <span style={{ visibility: 'hidden' }}>
        {originalText}
      </span>
      <span style={{ position: 'absolute', left: 0, top: 0 }}>{displayText}</span>
    </h1>
  );
}

// Flip Text Component for TOUCH
function FlipWord({ children, className }: { children: React.ReactNode; className?: string }) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  
  const handleMouseEnter = () => {
    if (wordRef.current && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      
      // Reset rotation to 0 first
      gsap.set(wordRef.current, { rotationX: 0 });
      
      // Animate to 360
      gsap.to(wordRef.current, {
        rotationX: 360,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimatingRef.current = false;
          // Reset to 0 after animation completes
          if (wordRef.current) {
            gsap.set(wordRef.current, { rotationX: 0 });
          }
        }
      });
    }
  };
  
  return (
    <span
      ref={wordRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ 
        display: 'inline-block',
        cursor: 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </span>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const expSectionRef = useRef<HTMLElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero animations - start after sidebars begin
    // Loader: 2.2s
    // Navbar: 2.4s + 0.8s = finishes at 3.2s
    // Side bars: 3.25s + 1s = finishes at 4.25s
    // Start hero at 3.5s (after sidebars start)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 3.8,
      })
      .from('.hero-subtitle', {
        y: 80,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-description', {
        y: 60,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Section title animations
    const sections = [
      aboutSectionRef,
      expSectionRef,
      workSectionRef,
      contactSectionRef,
    ];

    sections.forEach((sectionRef) => {
      if (sectionRef.current) {
        const title = sectionRef.current.querySelector('.section-title');
        const divider = sectionRef.current.querySelector('.section-divider');
        const content = sectionRef.current.querySelector('.section-content');

        if (title) {
          gsap.fromTo(
            title,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Only animate content children for About and Contact sections
        // Work and Experience handle their own animations
        const sectionId = sectionRef.current.id;
        if (content && (sectionId === 'about' || sectionId === 'contact')) {
          gsap.fromTo(
            content.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 90%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="text-primary min-h-screen max-w-5xl px-4 md:px-6 lg:px-0">
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center"
      >
        <TypewriterText 
          text="Odin Alexandre"
          className="hero-title font-bold text-5xl md:text-7xl lg:text-9xl text-title"
        />
        <h2 className="hero-subtitle text-light-faded font-semibold text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-8">
          Full Stack Developer
        </h2>

        <p className="hero-description max-w-xl text-sm md:text-base">
          I <span className="text-highlight font-bold">build</span> accessible
          and engaging ( and sometimes{' '}
          <span className="text-highlight font-bold">designing</span> ){' '}
          <span className="text-highlight font-bold">digital experiences</span>{' '}
          for the <span className="text-highlight font-bold">Web</span>. I am
          currently looking for new oppurtunities.
        </p>
      </section>
      <div className="m-auto max-w-3xl">
        {' '}
        <section id="about" ref={aboutSectionRef} className=" flex flex-col">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>About
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48 text-sm md:text-base">
            <p>
              I&apos;m a developer passionate about crafting accessible,
              pixel-perfect user interfaces that blend thoughtful design with
              robust engineering. My favorite work lies at the intersection of
              design and development, creating experiences that not only look
              great but are meticulously built for performance and usability.
            </p>
            <p>
              Currently, I&apos;m a Senior Front-End Engineer a Klaviyo, specializing
              in accessibility. I contribute to the creation and maintenance of
              UI components that power Klaviyo&apos;s frontend, ensuring our platform
              meets web accessibility standards and best practices to deliver an
              inclusive user experience.
            </p>
            <p>
              In my spare time, I&apos;m usually climbing, playing tennis, hanging
              out with my wife and two cats, or running around Hyrule searching
              for Korok seedsKorokseeds.
            </p>
          </div>
        </section>
        <section id="experience" ref={expSectionRef} className=" flex flex-col ">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Experience
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48">
            <Experience />
            <a
              href="#"
              className="experience-cta flex text-title font-bold hover:text-highlight box-content group w-fit text-sm md:text-base"
            >
              View Full Résumé
              <ArrowUpRight className="ml-1 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0" />
            </a>
          </div>
        </section>
        <section id="work" ref={workSectionRef} className=" flex flex-col ">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Work
            </h3>
            <div className="section-divider ml-2 md:ml-4 lg:ml-8 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-24 md:mb-32 lg:mb-48">
            <Work />
            <a
              href="#"
              className="work-cta flex text-title font-bold hover:text-highlight box-content group w-fit text-sm md:text-base"
            >
              View All Works
              <ArrowRight className="ml-1 transition-transform duration-200 ease-out translate-y-[2px] -translate-x-[4px] group-hover:translate-x-[2px]" />
            </a>
          </div>
        </section>
        <section id="contact" ref={contactSectionRef} className=" flex flex-col ">
          <div className="flex items-center mb-8 md:mb-12">
            <h3 className="section-title text-title text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap">
              <span className="text-highlight">&gt;</span>Contact
            </h3>
            <div className="section-divider ml-2 md:ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="section-content space-y-3 mb-20 md:mb-32 text-center flex flex-col items-center">
            <p className="max-w-xl m-auto mb-6 md:mb-8 text-sm md:text-base px-4">
              Im currently looking for new opportunities. My inbox is always
              open, whether you have a question or just want to say hi !
            </p>
            <ArrowDown className="mb-6 md:mb-8 text-title w-5 h-5 md:w-6 md:h-6" />
            <a href="" className="font-bold text-2xl md:text-4xl lg:text-5xl text-title px-4">
              GET IN <FlipWord className="text-highlight">TOUCH</FlipWord>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
