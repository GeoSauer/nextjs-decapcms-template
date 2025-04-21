import { event } from "@/lib/utils/analytics";

export const useAnalytics = () => {
  const trackExternalLink = (label: string, url: string) => {
    event({
      action: "click",
      category: "external_link",
      label: `${label} - ${url}`,
    });
  };

  return { trackExternalLink };
};
