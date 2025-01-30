import Image from "next/image";
import { ContentBlock, HeroData, PageData } from "@/lib/entities/constants";
import { GetStaticProps } from "next";
import { getMarkup } from "@/lib/utils/markdown";
import ReactMarkdown from "react-markdown";

export default function Home({
  heroContent,
  pageContent,
}: {
  heroContent: HeroData;
  pageContent: PageData;
}) {
  return (
    <main>
      <section
        style={{
          textAlign: "center",
          margin: "2rem 0",
        }}
      >
        <h1>{heroContent.title}</h1>
        <p>{heroContent.subtitle}</p>
        {heroContent.backgroundImage && heroContent.backgroundImageAltText && (
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <Image
              src={heroContent.backgroundImage}
              alt={heroContent.backgroundImageAltText}
              width={300}
              height={300}
            />
          </div>
        )}
        <button>{heroContent.buttonText}</button>
      </section>
      <section style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem" }}>{pageContent.sectionTitle}</h2>
        {pageContent.contents.map((block: ContentBlock, idx: number) => (
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

  const { data: heroContent } = heroMarkups;
  const { data: pageContent } = pageMarkups;

  // Return the data as props
  return {
    props: {
      heroContent,
      pageContent,
    },
  };
};
