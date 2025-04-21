export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID; //TODO ensure this is set in the environment variables

// Log page views
export const pageview = (url: string) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("config", GA_MEASUREMENT_ID as string, {
    page_path: url,
  });
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
