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
  return (
    <main>
      {/* include this script on '/' so that invited users can set a password */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="lazyOnload"
      />
      <section
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
        <button>{hero.buttonText}</button>
      </section>
      <section style={{ textAlign: "center" }}>
        {<h2 style={{ marginBottom: "2rem" }}>{page?.sectionTitle}</h2>}
        {page?.blocks.map((block: HomePage.InfoBlock, idx: number) => (
          <div key={`${block.title}-${idx}`} style={{ marginBottom: "2rem" }}>
            <h3>{block.title}</h3>
            <p>{block.subtitle}</p>
            {/* any markdown widgets need to be wrapped in ReactMarkdown to render properly */}
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>
        ))}
      </section>
    </main>
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
