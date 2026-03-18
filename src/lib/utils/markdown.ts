import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { transformKeys } from "./misc";

/**
 * Represents parsed markdown content with frontmatter data.
 */
export interface ParsedMarkdown {
  [key: string]: unknown;
  body: string;
}

/**
 * Reads and parses a markdown file safely.
 */
const readMarkdownFile = (filePath: string): ParsedMarkdown | null => {
  try {
    if (!filePath || typeof filePath !== "string") {
      console.warn("Invalid file path provided");
      return null;
    }

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
export const getMarkup = (directory: string, filename: string): ParsedMarkdown => {
  if (!directory || !filename) {
    console.warn("Directory and filename are required");
    return { body: "" };
  }

  if (!filename.endsWith(".md")) {
    console.warn(`Invalid file type: ${filename}`);
    return { body: "" };
  }

  const filePath = path.join(process.cwd(), directory, filename);
  return readMarkdownFile(filePath) || { body: "" };
};

/**
 * Reads all markdown files in a given directory and returns structured objects.
 */
export const getFolderMarkups = (directory: string): Record<string, ParsedMarkdown> => {
  try {
    if (!directory || typeof directory !== "string") {
      console.warn("Directory path is required and must be a string");
      return {};
    }

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

    const markups: Record<string, ParsedMarkdown> = {};

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
