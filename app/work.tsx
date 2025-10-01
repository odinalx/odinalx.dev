import Image from 'next/image';
import { Github, ArrowUpRight } from 'lucide-react';

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
    title: 'Projet 1',
    description:
      'Creation and maintenance of UI components that power Klaviyo’s frontend, ensuring our platform meets accessibility standards and best practices.',
    imageSrc: '/test.png',
    imageAlt: 'Preview project 1',
    href: '',
    githubUrl: '',
    techs: [
      { name: 'TypeScript', iconSrc: '/typescript.svg' },
      { name: 'React', iconSrc: '/react.svg' },
    ],
  },
  {
    slug: 'project-2',
    title: 'Projet 2',
    description:
      'Optimized rendering performance and built a design system with consistent tokens and accessible components.',
    imageSrc: '/test.png',
    imageAlt: 'Preview project 2',
    href: '#',
    githubUrl: '',
    techs: [
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
  {
    slug: 'project-3',
    title: 'Projet 3',
    description:
      'Built a CI-ready app with containers and robust DX, focusing on maintainability and testability.',
    imageSrc: '/test.png',
    imageAlt: 'Preview project 3',
    href: '#',
    githubUrl: '#',
    techs: [
      { name: 'Docker', iconSrc: '/docker.svg' },
      { name: 'TypeScript', iconSrc: '/typescript.svg' },
    ],
  },
];

export default function Work() {
  return (
    <div className="space-y-8 mb-16 group/list">
      {projects.map((project) => (
        <div
          key={project.slug}
          className={`group relative flex pb-1 transition-all lg:group-hover/list:opacity-50 lg:hover:!opacity-100 ${
            project.href ? 'cursor-pointer' : 'cursor-none'
          }`}
        >
          <div
            className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
            aria-hidden="true"
          ></div>
          {project.href ? (
            <a
              href={project.href}
              aria-label={`${project.title} website`}
              className="absolute -inset-x-4 -inset-y-4 lg:-inset-x-6 z-20 cursor-pointer"
            />
          ) : null}
          <div className="flex flex-col z-30 justify-between flex-none pointer-events-none mr-16">
            <Image
              alt={project.imageAlt}
              src={project.imageSrc}
              width={250}
              height={0}
              className="h-auto border-2 border-faded rounded-xl mb-4 transition-colors duration-200 ease-out group-hover:border-light-faded"
            />
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors relative z-40 pointer-events-auto hover:text-highlight"
              >
                <Github />
              </a>
            ) : null}
          </div>
          <div className="flex flex-col justify-between z-10 flex-1 min-w-0 pointer-events-none">
            <div>
              <div className="flex text-title text-2xl">
                {project.href ? (
                  <a
                    href={project.href}
                    className="flex items-start text-title transition-colors duration-200 group w-fit pointer-events-none"
                  >
                    <h4 className="group-hover:text-highlight">
                      {project.title}
                    </h4>
                    <ArrowUpRight className="ml-1 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0 group-hover:text-highlight" />
                  </a>
                ) : (
                  <h4 className="group-hover:text-highlight">
                    {project.title}
                  </h4>
                )}
              </div>
              <p>{project.description}</p>
            </div>
            <ul className="flex space-x-2 mt-4">
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
    <li className="bg-faded text-title font-bold text-sm px-2 py-1 rounded-full flex items-center">
      <span
        aria-hidden="true"
        className="mr-1 inline-block h-[14px] w-[14px] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
        style={{ maskImage: `url(${iconSrc})` }}
      />
      {name}
    </li>
  );
}
