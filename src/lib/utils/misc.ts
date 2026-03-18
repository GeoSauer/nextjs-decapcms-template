export const toCamelCase = (str: string): string => {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const toPascalCase = (str: string): string => {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    .split(/[_\s-]/)
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .filter(Boolean)
    .join("");
};

export const transformKeys = <T extends Record<string, unknown>>(obj: T): T => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      item && typeof item === "object" ? transformKeys(item as Record<string, unknown>) : item,
    ) as unknown as T;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      toCamelCase(key),
      value && typeof value === "object" ? transformKeys(value as Record<string, unknown>) : value,
    ]),
  ) as T;
};

/**
 * Converts a JPG/JPEG/PNG URL to its WebP variant.
 */
export const toWebpUrl = (url: string): string => {
  if (!url || typeof url !== "string") {
    return url;
  }

  return url.replace(/\.(jpe?g|png)$/i, ".webp");
};

/**
 * Returns a MIME type for common raster image extensions.
 */
export const getImageMimeType = (url: string): string | null => {
  if (!url || typeof url !== "string") {
    return null;
  }

  const match = url.toLowerCase().match(/\.([a-z0-9]+)$/);
  const extension = match?.[1];

  if (extension === "jpg" || extension === "jpeg") {
    return "image/jpeg";
  }

  if (extension === "png") {
    return "image/png";
  }

  if (extension === "webp") {
    return "image/webp";
  }

  if (extension === "avif") {
    return "image/avif";
  }

  return null;
};
