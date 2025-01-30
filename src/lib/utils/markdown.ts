import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getMarkup = (
  directory: string,
  filename: string
): matter.GrayMatterFile<string> | null => {
  /* Converts specific file to a gray-matter object */
  try {
    const filePath = path.join(process.cwd(), directory, filename);

    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }

    // Ensure file is .md
    if (!filename.endsWith(".md")) {
      console.warn(`Invalid file type: ${filename}`);
      return null;
    }

    const file = matter.read(filePath);

    //Ensure file has valid content
    if (!file.content.trim() && !Object.keys(file.data).length) {
      console.warn(`File is empty or missing valid content: ${filePath}`);
      return null;
    }

    return file;
  } catch (error) {
    console.error(`Failed to read file: ${directory}/${filename}`, error);
    return null;
  }
};

export const getFolderMarkups = (directory: string): matter.GrayMatterFile<string>[] | null => {
  /* Converts all files in a directory to gray-matter objects */
  try {
    const directoryPath = path.join(process.cwd(), directory);

    // Ensure directory path is valid
    if (!fs.existsSync(directoryPath)) {
      console.warn(`Directory not found: ${directoryPath}`);
      return null;
    }

    // Remove any non-.md files
    const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith(".md"));

    // Ensure directory contains at least one .md file
    if (files.length === 0) {
      console.warn(`Directory is empty: ${directoryPath}`);
      return null;
    }

    // Convert each file to markup, removing any null entries
    const markups = files
      .map((filename) => {
        try {
          const filePath = path.join(directoryPath, filename);
          const file = matter.read(filePath);

          //Ensure file has valid content
          if (!file.content.trim() && !Object.keys(file.data).length) {
            console.warn(`File is empty or missing valid content: ${filePath}`);
            return null;
          }

          return file;
        } catch (error) {
          console.error(`Failed to parse file: ${filename}`, error);
          return null;
        }
      })
      .filter((file): file is matter.GrayMatterFile<string> => file !== null);

    return markups;
  } catch (error) {
    console.error(`Failed to read directory: ${directory}`, error);
    return null;
  }
};
