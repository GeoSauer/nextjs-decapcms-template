export type Hero = {
  title: string;
  description: string;
  details: {
  text: string;
  link: string;
  url: string;
  };
  cta: {
  text: string;
  url: string;
  };
};

export type InfoBlocks = {
  sectionTitle: string;
  blocks: InfoBlock[];
};

export type InfoBlock = {
  title: string;
  subtitle: string;
  body?: string;
};