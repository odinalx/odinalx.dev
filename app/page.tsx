import Experience from './experience';
import Work from './work';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
export default function Home() {
  return (
    <main className="text-primary min-h-screen max-w-5xl">
      <section id="home" className="min-h-screen flex flex-col justify-center ">
        <h1 className="font-bold text-9xl text-title">Odin Alexandre</h1>
        <h2 className="text-light-faded font-semibold text-7xl mb-8">
          Full Stack Developer
        </h2>

        <p className="max-w-xl">
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
        <section id="about" className=" flex flex-col">
          <div className="flex items-center mb-12">
            <h3 className="text-title text-6xl font-bold">
              <span className="text-highlight">&gt;</span>About
            </h3>
            <div className="ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="space-y-3  mb-48">
            <p>
              I’m a developer passionate about crafting accessible,
              pixel-perfect user interfaces that blend thoughtful design with
              robust engineering. My favorite work lies at the intersection of
              design and development, creating experiences that not only look
              great but are meticulously built for performance and usability.
            </p>
            <p>
              Currently, I’m a Senior Front-End Engineer a Klaviyo, specializing
              in accessibility. I contribute to the creation and maintenance of
              UI components that power Klaviyo’s frontend, ensuring our platform
              meets web accessibility standards and best practices to deliver an
              inclusive user experience.
            </p>
            <p>
              In my spare time, I’m usually climbing, playing tennis, hanging
              out with my wife and two cats, or running around Hyrule searching
              for Korok seedsKorokseeds.
            </p>
          </div>
        </section>
        <section id="experience" className=" flex flex-col ">
          <div className="flex items-center mb-12">
            <h3 className="text-title text-6xl font-bold">
              <span className="text-highlight">&gt;</span>Experience
            </h3>
            <div className="ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="space-y-3 mb-48">
            <Experience />
            <a
              href="#"
              className="flex  text-title font-bold hover:text-highlight box-content group w-fit"
            >
              View Full Résumé
              <ArrowUpRight className="ml-1 transition-transform duration-200 ease-out translate-y-[4px] -translate-x-[4px] group-hover:-translate-y-0 group-hover:translate-x-0" />
            </a>
          </div>
        </section>
        <section id="work" className=" flex flex-col ">
          <div className="flex items-center mb-12">
            <h3 className="text-title text-6xl font-bold">
              <span className="text-highlight">&gt;</span>Work
            </h3>
            <div className="ml-8 h-px bg-faded flex-1"></div>
          </div>
          <div className="space-y-3 mb-48">
            <Work />
            <a
              href="#"
              className="flex  text-title font-bold hover:text-highlight box-content group w-fit"
            >
              View All Works
              <ArrowRight className="ml-1 transition-transform duration-200 ease-out translate-y-[2px] -translate-x-[4px] group-hover:translate-x-[2px]" />
            </a>
          </div>
        </section>
        <section id="contact" className=" flex flex-col ">
          <div className="flex items-center mb-12">
            <h3 className="text-title text-6xl font-bold">
              <span className="text-highlight">&gt;</span>Contact
            </h3>
            <div className="ml-4 h-px bg-faded flex-1"></div>
          </div>
          <div className="space-y-3 mb-32 text-center flex flex-col items-center">
            <p className="max-w-xl m-auto mb-8">
              Im currently looking for new opportunities. My inbox is always
              open, whether you have a question or just want to say hi !
            </p>
            <ArrowDown className="mb-8 text-title" />
            <a href="" className="font-bold text-5xl text-title">
              GET IN <span className="text-highlight">TOUCH</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
