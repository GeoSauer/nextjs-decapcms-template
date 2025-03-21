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
      <div className="bg-gradient-to-tr from-gray-700 to-gray-900 min-h-screen w-full text-gray-300 flex flex-col justify-between">
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
            </a>{" "}
            Template
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
          <div className="text-center border-2 border-white p-4 rounded-lg md:w-1/2 mx-auto">
            <h1>Welcome to the Next.js + DecapCMS template!</h1>
            <p>Use this template to get started with your own Next.js + DecapCMS project.</p>
            <p>
              To learn more, check out the{" "}
              <a
                className="text-blue-700 hover:underline"
                href="https://github.com/GeoSauer/nextjs-decapcms-template/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                README
              </a>{" "}
              file.
            </p>
          </div>
          {/* INFO BLOCKS */}
          <div className="text-center">
            <h2 className="">Info Blocks</h2>
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div key={idx}>
                  <h2>Info Block {idx + 1}</h2>
                  <p>This is a sample info block.</p>
                </div>
              ))}
          </div>
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
