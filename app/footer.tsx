import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <p className="text-base text-faded max-w-md ">
          Designed in{' '}
          <a href="" className="font-bold text-primary">
            Figma
          </a>{' '}
          and coded in{' '}
          <a href="" className="font-bold text-primary">
            Visual Studio Code
          </a>
          . Built with{' '}
          <a href="" className="font-bold text-primary">
            Next.js
          </a>{' '}
          and{' '}
          <a href="" className="font-bold text-primary">
            Tailwind CSS
          </a>
          , deployed with{' '}
          <a href="" className="font-bold text-primary">
            Vercel
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
