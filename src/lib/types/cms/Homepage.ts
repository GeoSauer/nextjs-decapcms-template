export type Hero = {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundImageAltText?: string;
  buttonText: string;
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