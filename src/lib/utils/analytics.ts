type DataLayerEvent = {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  eventValue?: number;
};

export const pushEvent = (event: DataLayerEvent) => {
  if (typeof window.dataLayer === "undefined") {
    console.warn("DataLayer not loaded");
    return;
  }

  window.dataLayer.push(event);
};
