export interface ContentBlock {
  title: string;
  subtitle: string;
  sectionContent: string;
}

export interface PageData {
  sectionTitle: string;
  contents: ContentBlock[];
}

export interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundImageAltText?: string;
  buttonText: string;
}
