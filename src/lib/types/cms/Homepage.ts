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

export type Features = {
  developers: {
  title: string;
  description: string;
  }[];
  clients: {
  title: string;
  description: string;
  }[];
};

export type Examples = {
  title: string;
  pages: Page[];
};

export type Page = {
  title: string;
  url: string;
  image: string;
  alt?: string;
};