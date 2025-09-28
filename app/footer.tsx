import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-all duration-300 hover:shadow-glow"
          >
            <Github />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-all duration-300 hover:shadow-glow"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-all duration-300 hover:shadow-glow"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          Made with <span className="text-red-500">❤️</span> by Odin
        </p>
      </div>
    </footer>
  );
}
