'use client';

import Image from 'next/image';
import { Github, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

function TechBadge({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <span className="bg-faded text-title font-bold text-xs md:text-sm px-2 py-1 rounded-full inline-flex items-center mr-2 mb-2">
      <span
        aria-hidden="true"
        className="mr-1 inline-block h-[12px] w-[12px] md:h-[14px] md:w-[14px] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
        style={{ maskImage: `url(${iconSrc})` }}
      />
      {name}
    </span>
  );
}

export default function AllProjectsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backLinkRef = useRef<HTMLAnchorElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate back link
      if (backLinkRef.current) {
        tl.from(backLinkRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.6,
        });
      }

      // Animate title
      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
      }

      // Animate table rows
      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('tbody tr');
        tl.from(
          rows,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="text-primary min-h-screen max-w-6xl px-4 md:px-6 lg:px-8 py-12 md:py-20" id="main-content">
      <Link
        ref={backLinkRef}
        href="/"
        className="inline-flex items-center text-highlight hover:text-title transition-colors mb-8 md:mb-12 text-sm md:text-base"
        aria-label="Back to home page"
      >
        <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
        Odin Alexandre
      </Link>

      <h1
        ref={titleRef}
        className="text-title text-4xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-16"
      >
        All Projects
      </h1>

      <div>
        <table ref={tableRef} className="w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-faded">
              <th className="text-left py-4 px-2 md:px-4 text-title font-semibold text-sm md:text-base min-w-[200px] md:min-w-[300px]">
                Project
              </th>
              <th className="text-left py-4 px-2 md:px-4 text-title font-semibold text-sm md:text-base min-w-[150px]">
                Built with
              </th>
              <th className="text-center py-4 px-2 md:px-4 text-title font-semibold text-sm md:text-base w-16 md:w-20">
                Link
              </th>
              <th className="text-center py-4 px-2 md:px-4 text-title font-semibold text-sm md:text-base w-16 md:w-20">
                GitHub
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="border-b border-faded/50 hover:bg-white/5 transition-colors"
              >
                <td className="py-6 px-2 md:px-4 min-w-[200px] md:min-w-[300px]">
                  <div className="font-semibold text-title text-sm md:text-lg">
                    {project.title}
                  </div>
                  <div className="text-light-faded text-xs md:text-sm mt-1">
                    {project.description}
                  </div>
                </td>
                <td className="py-6 px-2 md:px-4 min-w-[150px]">
                  <div className="flex flex-wrap items-center gap-1">
                    {project.techs.map((tech) => (
                      <TechBadge
                        key={tech.name}
                        name={tech.name}
                        iconSrc={tech.iconSrc}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-6 px-2 md:px-4 text-center w-16 md:w-20">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-highlight hover:text-title transition-colors text-sm md:text-base"
                      aria-label={`Visit ${project.title} website`}
                    >
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-primary text-sm" aria-label="No website available">—</span>
                  )}
                </td>
                <td className="py-6 px-2 md:px-4 text-center w-16 md:w-20">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-highlight hover:text-title transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-primary text-sm" aria-label="No GitHub repository">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
