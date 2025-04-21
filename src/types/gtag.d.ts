declare interface Window {
  gtag: (type: string, action: string, config: { [key: string]: any }) => void;
}
