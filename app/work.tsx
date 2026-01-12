'use client';

import Image from 'next/image';
import { Github, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  githubUrl?: string;
  techs: { name: string; iconSrc: string }[];
};

const projects: Project[] = [
  {
    slug: 'project-1',
    title: 'Portfolio V1',
    description:
      'First iteration of my portfolio, created as part of an academic project.',
    imageSrc: '/test.png',
    imageAlt: 'Preview Portfolio V1',
    href: '',
    githubUrl: 'https://github.com/odinalx/PortfolioV1',
    techs: [
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
  {
    slug: 'project-2',
    title: 'SLV App',
    description:
      'Final-year project: development of a management website for an association overseeing around fifteen sports and leisure sections.',
    imageSrc: '/test.png',
    imageAlt: 'Preview SLV App',
    href: '',
    githubUrl: 'https://github.com/odinalx/Projet-tutore',
    techs: [
      { name: 'Vue.JS', iconSrc: '/vuedotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
      { name: 'PHP', iconSrc: '/php.svg' },
    ],
  },
  {
    slug: 'project-3',
    title: 'SecretSanta',
    description:
      'A modern web application for organizing Secret Santa gift exchanges with friends, family, or colleagues.',
    imageSrc: '/Secret-Santa.png',
    imageAlt: 'Preview Secret-Santa',
    href: 'https://secretsanta.lorisalex.com/',
    githubUrl: 'https://github.com/odinalx/SecretSanta',
    techs: [
      { name: 'Docker', iconSrc: '/docker.svg' },
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
];

export default function Work() {
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    projectsRef.current.forEach((project, index) => {
      if (project) {
        const trigger = gsap.fromTo(
          project,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 90%',
              end: 'top 70%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
        if (trigger.scrollTrigger) {
          triggers.push(trigger.scrollTrigger);
        }
      }
    });

    // Animate the "View All Works" button
    const ctaButton = document.querySelector('.work-cta');
    if (ctaButton && containerRef.current) {
      const trigger = gsap.fromTo(
        ctaButton,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaButton,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
      if (trigger.scrollTrigger) {
        triggers.push(trigger.scrollTrigger);
      }
    }

    // Cleanup function
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 mb-16 group/list">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          ref={(el) => {
            projectsRef.current[index] = el;
          }}
          className={`group relative flex flex-col md:flex-row pb-1 transition-all lg:group-hover/list:opacity-50 lg:hover:!opacity-100 ${
            project.href ? 'cursor-pointer' : 'cursor-none'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg pointer-events-none"
            aria-hidden="true"
            role="presentation"
          ></div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              aria-label={`${project.title} website`}
              className="absolute -inset-x-4 -inset-y-4 lg:-inset-x-6 z-20 cursor-pointer"
            />
          ) : null}
          <div className="flex flex-row md:flex-col z-30 justify-between md:justify-start flex-none pointer-events-none mb-4 md:mb-0 md:mr-8 lg:mr-16">
            <Image
              alt={project.imageAlt}
              src={project.imageSrc}
              width={250}
              height={0}
              className="h-auto w-32 md:w-48 lg:w-[250px] border-2 border-faded rounded-xl mb-0 md:mb-4 transition-colors duration-200 ease-out group-hover:border-light-faded"
            />
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-fit md:w-auto transition-colors relative z-40 pointer-events-auto hover:text-highlight ml-4 md:ml-0"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={20} className="md:w-6 md:h-6" aria-hidden="true" />
              </a>
            ) : null}
          </div>
          <div className="flex flex-col justify-between z-10 flex-1 min-w-0 pointer-events-none">
            <div>
              <div className="flex text-title text-xl md:text-2xl">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    className="flex items-start text-title transition-colors duration-200 group w-fit pointer-events-none"
                  >
                    <h4 className="group-hover:text-highlight">
                      {project.title}
                    </h4>
                    <ArrowUpRight className="ml-1 w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0 group-hover:text-highlight" aria-hidden="true" />
                  </a>
                ) : (
                  <h4 className="group-hover:text-highlight">
                    {project.title}
                  </h4>
                )}
              </div>
              <p className="text-sm md:text-base">{project.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 mt-4">
              {project.techs.map((t) => (
                <TechBadge key={t.name} name={t.name} iconSrc={t.iconSrc} />
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechBadge({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <li className="bg-faded text-title font-bold text-xs md:text-sm px-2 py-1 rounded-full flex items-center">
      <span
        aria-hidden="true"
        className="mr-1 inline-block h-[12px] w-[12px] md:h-[14px] md:w-[14px] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
        style={{ maskImage: `url(${iconSrc})` }}
      />
      {name}
    </li>
  );
}
