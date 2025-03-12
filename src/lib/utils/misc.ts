export const toCamelCase = (str: string) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const toPascalCase = (str: string) =>
  str
    .split(/[_\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

export const transformKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [toCamelCase(key), transformKeys(value)])
    );
  }
  return obj;
};
