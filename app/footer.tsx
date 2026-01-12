import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-4 md:py-6 text-center">
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-4">
        {/* Social Icons - Mobile/Tablet Only */}
        <div className="lg:hidden flex justify-center gap-6 mb-6 text-light-faded" role="navigation" aria-label="Social media links">
          <a href="https://github.com/odinalx" target="_blank" rel="noreferrer" className="hover:text-highlight transition-colors p-2" aria-label="GitHub profile">
            <Github size={24} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/odinalexandre/" target="_blank" rel="noreferrer" className="hover:text-highlight transition-colors p-2" aria-label="LinkedIn profile">
            <Linkedin size={24} aria-hidden="true" />
          </a>
          <a href="https://x.com/_Odin_Dev" target="_blank" rel="noreferrer" className="hover:text-highlight transition-colors p-2" aria-label="Twitter profile">
            <Twitter size={24} aria-hidden="true" />
          </a>
          <a href="https://www.instagram.com/_odin_dev/" target="_blank" rel="noreferrer" className="hover:text-highlight transition-colors p-2" aria-label="Instagram profile">
            <Instagram size={24} aria-hidden="true" />
          </a>
        </div>

        {/* Footer Text */}
        <div className="flex justify-center">
          <p className="text-xs md:text-sm lg:text-base text-primary max-w-md">
            Designed in{' '}
            <a
              href="https://www.figma.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-light-faded hover:text-title transition-colors"
            >
              Figma
            </a>{' '}
            and coded in{' '}
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-light-faded hover:text-title transition-colors"
            >
              Visual Studio Code
            </a>
            . Built with{' '}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-light-faded hover:text-title transition-colors"
            >
              Next.js
            </a>{' '}
            and{' '}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-light-faded hover:text-title transition-colors"
            >
              Tailwind CSS
            </a>
            , deployed with{' '}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-light-faded hover:text-title transition-colors"
            >
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
