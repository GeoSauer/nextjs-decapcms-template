import Image from "next/image";
import { ContentBlock, HeroData, PageData } from "@/lib/entities/constants";
import { GetStaticProps } from "next";
import { getMarkup } from "@/lib/utils/markdown";
import ReactMarkdown from "react-markdown";
import Script from "next/script";

interface HomeProps {
  hero: HeroData;
  page: PageData;
}

export default function Home({ hero, page }: HomeProps) {
  return (
    <main>
      {/* include this script on '/' so that invited users can set a password */}
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <section
        style={{
          textAlign: "center",
          margin: "2rem 0",
        }}
      >
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
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
        <h2 style={{ marginBottom: "2rem" }}>{page.sectionTitle}</h2>
        {page.contents.map((block: ContentBlock, idx: number) => (
          <div key={`${block.title}-${idx}`} style={{ marginBottom: "2rem" }}>
            <h3>{block.title}</h3>
            <p>{block.subtitle}</p>
            {/* any markdown widgets need to be wrapped in ReactMarkdown to render properly */}
            <ReactMarkdown>{block.sectionContent}</ReactMarkdown>
          </div>
        ))}
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Use the getMarkup utility to fetch markdown data for hero and page content
  const heroMarkups = getMarkup("src/content/homepage", "hero.md");
  const pageMarkups = getMarkup("src/content/homepage", "content_blocks.md");

  // If no content is found, return a 404
  if (!heroMarkups || !pageMarkups) {
    return { notFound: true };
  }

  const { data: hero } = heroMarkups;
  const { data: page } = pageMarkups;

  // Return the data as props
  return {
    props: {
      hero,
      page,
    },
  };
};
