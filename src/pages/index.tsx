import Image from "next/image";
import { GetStaticProps } from "next";
import { getFolderMarkups } from "@/lib/utils/markdown";
import ReactMarkdown from "react-markdown";
import Script from "next/script";
import { HomePage } from "@/lib/types/cms";
interface HomeProps {
  hero: HomePage.Hero;
  page: HomePage.InfoBlocks;
}

export default function Home({ hero, page }: HomeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* include this script on '/' so that invited users can set a password */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="lazyOnload"
      />
      <div className="bg-gradient-to-tr from-gray-700 to-gray-900 min-h-screen w-full text-gray-400 flex flex-col justify-between">
        {/* HEADER */}
        <header className="fixed w-full text-center md:text-left flex bg-gray-950 justify-between p-4 md:px-15">
          <p className="text-2xl font-bold">
            <a
              className="hover:text-white"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            +{" "}
            <a
              className="hover:text-white"
              href="https://decapcms.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DecapCMS
            </a>
            <span className="hidden md:inline"> Template</span>
          </p>
          <a
            className="hover:bg-white transition-transform my-auto bg-gray-300 p-[1px] pt-[.5px] rounded-full"
            href="https://github.com/GeoSauer/nextjs-decapcms-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/icons/github.svg" alt="GitHub Logo" width={30} height={30} />
          </a>
        </header>
        <main className="p-4 pt-30 flex-grow">
          {/* HERO */}
          <div className="md:w-1/2 md:ml-10 mx-auto flex flex-col gap-4 md:gap-6">
            <h1 className="text-2xl md:text-5xl">
              The Fastest Way to Launch a Modern, Headless CMS Website.
            </h1>
            <p className="text-md text-gray-500 md:text-xl">
              Our Next.js + DecapCMS template comes pre-configured so you can jump straight into
              designing and developing your site — without the hassle of setup.
            </p>
            <p className="text-md text-gray-500 md:text-lg">
              For more detailed instructions, check out the{" "}
              <a
                className="text-gray-300 hover:underline"
                href="https://github.com/GeoSauer/nextjs-decapcms-template/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                README
              </a>
              .
            </p>
            <a
              className="bg-gray-900 text-gray-300 hover:bg-gray-700 transition-colors rounded-full px-4 py-2 max-w-fit mx-auto inline-flex items-center gap-2 cursor-pointer mt-10 md:mt-3"
              href="https://github.com/new?template_name=nextjs-decapcms-template&template_owner=GeoSauer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Use Template
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-square-arrow-out-up-right"
              >
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                <path d="m21 3-9 9" />
                <path d="M15 3h6v6" />
              </svg>
            </a>
          </div>
          {/* FEATURES */}
          <div className="flex flex-col md:flex-row justify-evenly mt-15 gap-10 md:gap-0">
            {/* DEV FEATURES */}
            <div className="text-left md:max-w-1/3 ">
              <h2 className="text-2xl md:text-3xl text-center">Key Developer Features:</h2>
              <div className="flex flex-col gap-4 mt-4">
                <p>
                  <span className="font-bold">Fully Integrated - </span>
                  <span className="text-gray-500">
                    Next.js for speed, DecapCMS for easy content management, and TailwindCSS for
                    rapid styling.
                  </span>
                </p>
                <p>
                  <span className="font-bold">Zero Setup Required - </span>
                  <span className="text-gray-500">
                    Clone, install, and start building immediately.
                  </span>
                </p>
                <p>
                  <span className="font-bold">Typescript & Types Generation - </span>
                  <span className="text-gray-500">
                    Automatically generate types for CMS data with a simple command, no need to
                    manually define your structures.
                  </span>
                </p>
                <p>
                  <span className="font-bold">Open Source and Developer-Friendly - </span>
                  <span className="text-gray-500">
                    Built to be lightweight, scalable, and easy to maintain.
                  </span>
                </p>
              </div>
              {/* USER FEATURES */}
            </div>
            <div className="text-left md:max-w-1/3 ">
              <h2 className="text-2xl md:text-3xl text-center">Key Client Features:</h2>
              <div className="flex flex-col gap-4 mt-4">
                <p>
                  <span className="font-bold">Blazing Fast Performance - </span>
                  <span className="text-gray-500">
                    Optimized for modern web standards and SEO-friendly.
                  </span>
                </p>
                <p>
                  <span className="font-bold">Zero Backend Costs - </span>
                  <span className="text-gray-500">
                    No need for a separately hosted backend. The only recurring cost is the custom
                    domain.
                  </span>
                </p>
                <p>
                  <span className="font-bold">DecapCMS-Powered Content Management - </span>
                  <span className="text-gray-500">
                    Empower clients to manage their content easily, featuring live previews and a
                    user-friendly interface.
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* DEMOS/EXAMPLES */}
          {/* CONTACT */}
        </main>
        {/* FOOTER */}
        <footer className="w-full text-center bg-gray-950 text-gray-300">
          <p className="py-1.5">
            Copyright © {currentYear}{" "}
            <a
              className="hover:text-white"
              href="https://geosauer.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Geo Sauer
            </a>
          </p>
        </footer>
      </div>
      {/* <section
        style={{
          textAlign: "center",
          margin: "2rem 0",
        }}
      >
        <h1>{hero?.title}</h1>
        <p>{hero?.subtitle}</p>
        {hero.backgroundImage && hero.backgroundImageAltText && (
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <Image
              src={hero.backgroundImage}
              alt={hero.backgroundImageAltText}
              width={300}
              height={300}
            />
          </div>
        )}
        <button className="">{hero.buttonText}</button>
      </section>
      <section style={{ textAlign: "center" }}>
        {<h2 style={{ marginBottom: "2rem" }}>{page?.sectionTitle}</h2>}
        {page?.blocks.map((block: HomePage.InfoBlock, idx: number) => (
          <div key={`${block.title}-${idx}`} style={{ marginBottom: "2rem" }}>
            <h3>{block.title}</h3>
            <p>{block.subtitle}</p>
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>
        ))}
      </section> */}
      {/* any markdown widgets need to be wrapped in ReactMarkdown to render properly */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Use the getFolderMarkups utility to fetch markdown data from a given folder
  const homePageMarkups = getFolderMarkups("src/content/home-page");

  //* Alternatively, use the getMarkup utility to fetch a single markdown file
  // const heroMarkups = getMarkup("src/content/homepage", "hero.md");
  // const contentBlockMarkups = getMarkup("src/content/homepage", "content_blocks.md");

  // Return the data as props
  return {
    props: {
      hero: homePageMarkups.hero || null,
      page: homePageMarkups.info_blocks || null,
    },
  };
};
