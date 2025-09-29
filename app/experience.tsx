import Image from 'next/image';

type ExperienceEntry = {
  company: string;
  role: string;
  year: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
};

const experiences: ExperienceEntry[] = [
  {
    company: 'BoursoBank',
    role: 'Mobile developer',
    year: '2025',
    description:
      'At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank',
    logoSrc: '/boursobank.png',
    logoAlt: 'BoursoBank logo',
  },
  {
    company: 'Petit Roudoudou',
    role: 'Front-end Developer',
    year: '2024',
    description:
      'At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank',
  },
  {
    company: 'BUT MMI/Infromatique',
    role: 'Université de Lorraine',
    year: '2022-2025',
    description:
      'At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank At bourso bank',
    logoSrc: '/universite.png',
    logoAlt: 'Université de Lorraine logo',
  },
];

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <div>
      {entry.logoSrc ? (
        <Image
          src={entry.logoSrc}
          height={32}
          width={32}
          alt={entry.logoAlt ?? `${entry.company} logo`}
        />
      ) : null}
      <div className="flex gap-24">
        <div className="w-72 flex-none">
          <h4 className="text-title text-3xl whitespace-nowrap">
            {entry.company}
          </h4>
          <h5 className="whitespace-nowrap">{entry.role}</h5>
          <p className="text-faded text-base">{entry.year}</p>
        </div>
        <div className="flex-1 min-w-0">
          <p>{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="space-y-8 mb-16">
      {experiences.map((entry, index) => (
        <ExperienceItem key={`${entry.company}-${index}`} entry={entry} />
      ))}
    </div>
  );
}
