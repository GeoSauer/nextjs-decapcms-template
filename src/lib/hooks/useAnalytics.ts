import { pushEvent } from "@/lib/utils/analytics";

export const useAnalytics = () => {
  const trackExternalLink = (url: string, linkText: string) => {
    pushEvent({
      event: "external_link_click",
      eventCategory: "External Links",
      eventAction: "Click",
      eventLabel: `${linkText} - ${url}`,
    });
  };

  const trackNavigation = (destination: string) => {
    pushEvent({
      event: "navigation",
      eventCategory: "Navigation",
      eventAction: "Internal Link Click",
      eventLabel: destination,
    });
  };

  const trackFeatureClick = (featureTitle: string) => {
    pushEvent({
      event: "feature_interaction",
      eventCategory: "Features",
      eventAction: "Click",
      eventLabel: featureTitle,
    });
  };

  return {
    trackExternalLink,
    trackNavigation,
    trackFeatureClick,
  };
};
