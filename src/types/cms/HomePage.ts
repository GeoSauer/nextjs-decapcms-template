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
  developers: DevFeature[];
  clients: ClientFeature[];
};

export type Examples = {
  title: string;
  pages: Page[];
};

export type Contact = {
  show: boolean;
  title: string;
  subtitle: string;
};

export type DevFeature = {
  title: string;
  description: string;
};

export type ClientFeature = {
  title: string;
  description: string;
};

export type Page = {
  title: string;
  url: string;
  image: string;
  alt?: string;
};