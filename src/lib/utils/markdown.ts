import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { transformKeys } from "./misc";

/**
 * Reads and parses a markdown file safely.
 */
const readMarkdownFile = (filePath: string): { [key: string]: any; body: string } | null => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }

    const file = matter.read(filePath);

    if (!file.content.trim() && !Object.keys(file.data).length) {
      console.warn(`Skipping empty or invalid markdown file: ${filePath}`);
      return null;
    }

    return { ...transformKeys(file.data), body: file.content };
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    return null;
  }
};

/**
 * Converts a specific markdown file to a structured object.
 */
export const getMarkup = (directory: string, filename: string): Record<string, any> => {
  if (!filename.endsWith(".md")) {
    console.warn(`Invalid file type: ${filename}`);
    return {};
  }

  const filePath = path.join(process.cwd(), directory, filename);
  return readMarkdownFile(filePath) || {};
};

/**
 * Reads all markdown files in a given directory and returns structured objects.
 */
export const getFolderMarkups = (
  directory: string
): Record<string, { [key: string]: any; body: string }> => {
  try {
    const directoryPath = path.join(process.cwd(), directory);

    if (!fs.existsSync(directoryPath)) {
      console.warn(`Directory not found: ${directoryPath}`);
      return {};
    }

    const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith(".md"));

    if (files.length === 0) {
      console.warn(`No markdown files found in directory: ${directoryPath}`);
      return {};
    }

    const markups: Record<string, { [key: string]: any; body: string }> = {};

    for (const filename of files) {
      const filePath = path.join(directoryPath, filename);
      const fileData = readMarkdownFile(filePath);
      if (fileData) {
        const key = filename.replace(/\.md$/, "");
        markups[key] = fileData;
      }
    }

    return markups;
  } catch (error) {
    console.error(`Error reading directory: ${directory}`, error);
    return {};
  }
};
