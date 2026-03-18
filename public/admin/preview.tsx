// import CMS from "decap-cms-app";
import "../styles/globals.css"; // Tailwind base styles
import Home from "@/pages";
import { Contact, Examples, Features, Hero } from "@/types/cms/HomePage";
import { ReactElement } from "react";

declare const CMS: {
  registerPreviewTemplate: (name: string, component: (props: HeroPreviewProps) => ReactElement) => void;
  registerPreviewStyle: (style: string, options?: { raw?: boolean }) => void;
};

interface CmsEntryLike {
  getIn: (path: string[]) => { toJS: () => unknown };
}

interface HeroPreviewProps {
  entry: CmsEntryLike;
}

const defaultHero: Hero = {
  title: "",
  description: "",
  details: {
    text: "",
    link: "",
    url: "",
  },
  cta: {
    text: "",
    url: "",
  },
};

const defaultFeatures: Features = {
  developers: [],
  clients: [],
};

const defaultExamples: Examples = {
  title: "",
  pages: [],
};

const defaultContact: Contact = {
  show: false,
  title: "",
  subtitle: "",
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const HeroPreview = ({ entry }: HeroPreviewProps) => {
  const heroData = entry.getIn(["data"]).toJS();

  const parsedHero: Hero = {
    ...defaultHero,
    ...(isRecord(heroData) ? (heroData as Partial<Hero>) : {}),
    details: {
      ...defaultHero.details,
      ...(isRecord(heroData) && isRecord(heroData.details) ? (heroData.details as Partial<Hero["details"]>) : {}),
    },
    cta: {
      ...defaultHero.cta,
      ...(isRecord(heroData) && isRecord(heroData.cta) ? (heroData.cta as Partial<Hero["cta"]>) : {}),
    },
  };

  return <Home hero={parsedHero} features={defaultFeatures} examples={defaultExamples} contact={defaultContact} />;
};

CMS.registerPreviewTemplate("hero", HeroPreview);
CMS.registerPreviewStyle("/styles/globals.css", { raw: false }); // Ensures Tailwind loads in iframe
