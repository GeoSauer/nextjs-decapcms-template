import Head from "next/head";
import { GetStaticProps } from "next";
import { getFolderMarkups } from "@/lib/utils/markdown";
// import ReactMarkdown from "react-markdown";
import Script from "next/script";
import { useState } from "react";
import { ClientFeature, DevFeature, Examples, Features, Hero, Page } from "@/types/cms/HomePage";
import { RxExternalLink, RxGithubLogo } from "react-icons/rx";

interface HomeProps {
  hero: Hero;
  features: Features;
  examples: Examples;
}

export default function Home({ hero, features, examples }: HomeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Next.js + DecapCMS Template</title>
      </Head>
      {/* include this script on '/' so that invited users can set a password */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="lazyOnload"
      />
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 min-h-screen w-full text-gray-300 flex flex-col justify-between">
        {/* HEADER */}
        <header className="fixed w-full text-center md:text-left flex bg-gray-950 justify-between p-4 md:px-15 z-1">
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
            className="hover:bg-white bg-gray-300 p-[1px] rounded-full "
            href="https://github.com/GeoSauer/nextjs-decapcms-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RxGithubLogo className="text-gray-950" size={30} />
          </a>
        </header>
        <main className="p-4 flex flex-col gap-15 md:gap-35 flex-grow max-w-7xl mx-auto mt-30 md:mt-40">
          {/* HERO */}
          {hero && (
            <section className="flex flex-col gap-4 md:gap-8">
              <h1 className="text-2xl md:text-7xl">{hero?.title}</h1>
              <p className="text-md text-gray-500 md:text-xl">{hero?.description}</p>
              <span className="text-md text-gray-500 md:text-lg">
                {hero?.details.text}{" "}
                <a
                  className="text-gray-300 hover:underline hover:text-white inline-flex items-center gap-1"
                  href={hero.details.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero?.details.link}
                  <RxExternalLink />
                </a>
                .
              </span>
              <a
                className="bg-gray-900 text-gray-300 hover:bg-gray-700 transition-colors rounded-full px-4 py-2 max-w-fit mx-auto md:ml-40 inline-flex items-center gap-1 cursor-pointer mt-10 md:mt-3"
                href={hero?.cta.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero?.cta.text}
                <RxExternalLink />
              </a>
            </section>
          )}

          {/* FEATURES */}
          {(features.clients.length > 0 || features.developers.length > 0) && (
            <section className="flex flex-col md:flex-row justify-evenly gap-20 md:gap-0">
              <FeatureList title="Developers Love:" features={features.developers} />
              <FeatureList title="Clients Love:" features={features.clients} />
            </section>
          )}

          {/* EXAMPLES */}
          {examples.pages.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl text-center">{examples.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 mt-5 md:mt-15">
                {examples.pages.map((page, index) => (
                  <ExampleCard key={index} page={page} />
                ))}
              </div>
            </section>
          )}

          {/* CONTACT */}
        </main>

        {/* FOOTER */}
        <footer className="w-full text-center bg-gray-950 text-gray-300 mt-30">
          <p className="py-1.5">
            Copyright © 2025
            {currentYear > 2025 ? ` - ${currentYear} ` : " "}
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
    </>
  );
}

interface FeatureListProps {
  title: string;
  features: DevFeature[] | ClientFeature[];
}

export const FeatureList = ({ title, features }: FeatureListProps) => {
  if (features.length === 0) return null;

  return (
    <div className="text-left md:max-w-1/3">
      <h2 className="text-2xl md:text-3xl text-center">{title}</h2>
      <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-10">
        {features.map((feature, index) => (
          <p key={index}>
            <span className="font-bold">{feature.title} - </span>
            <span className="text-gray-500">{feature.description}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

interface ExampleCardProps {
  page: Page;
}

export const ExampleCard = ({ page }: ExampleCardProps) => {
  const [imageExists, setImageExists] = useState(true);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
      <div className="hover:scale-105 transition-transform duration-300 h-full">
        <a href={page.url} target="_blank" rel="noopener noreferrer">
          {imageExists ? (
            <img
              src={page.image}
              alt={page.alt || page.title}
              onError={() => setImageExists(false)}
              className="w-full"
            />
          ) : (
            <div className="flex justify-center w-full h-full bg-gray-700">
              <span className="text-2xl my-auto">{page.title}</span>
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Use the getFolderMarkups utility to fetch markdown data from a given folder
  const homePageMarkups = getFolderMarkups("src/content/home-page");

  //* Alternatively, use the getMarkup utility to fetch a single markdown file
  // const heroMarkups = getMarkup("src/content/home-page", "hero.md");

  // Return the data as props
  return {
    props: {
      hero: homePageMarkups.hero || null,
      features: homePageMarkups.features || null,
      examples: homePageMarkups.examples || [],
    },
  };
};
