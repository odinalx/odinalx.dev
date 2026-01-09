export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <div className="max-w-5xl mx-auto px-4 pb-4 flex justify-center">
        <p className="text-base text-faded max-w-md">
          Designed in{' '}
          <a
            href="https://www.figma.com/"
            target="_blank"
            className="font-bold text-primary"
          >
            Figma
          </a>{' '}
          and coded in{' '}
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            className="font-bold text-primary"
          >
            Visual Studio Code
          </a>
          . Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-bold text-primary"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            className="font-bold text-primary"
          >
            Tailwind CSS
          </a>
          , deployed with{' '}
          <a
            href="https://vercel.com/"
            target="_blank"
            className="font-bold text-primary"
          >
            Vercel
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
