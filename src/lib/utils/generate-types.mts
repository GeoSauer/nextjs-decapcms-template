import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const toCamelCase = (str: string) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
const toPascalCase = (str: string) =>
  str
    .split(/[_\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

// Map DecapCMS widgets to TypeScript types
const mapWidgetToType = (widget: string, field: any): string => {
  switch (widget) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "datetime":
      return "string"; // ISO date format
    case "image":
    case "file":
      return "string"; // URL or path
    case "select":
      return field.options
        ? field.options.map((opt: any) => (typeof opt === "number" ? opt : `"${opt}"`)).join(" | ")
        : "string";
    case "list":
      if (field.field) {
        return `${mapWidgetToType(field.field.widget, field.field)}[]`;
      } else if (field.fields) {
        return `{ ${field.fields.map((subField: any) => `${subField.name}: ${mapWidgetToType(subField.widget, subField)};`).join(" ")} }[]`;
      }
      return "string[]"; // Default for lists
    case "relation":
      return "string | number";
    case "map":
      return "{ [key: string]: any }";
    case "object":
      return `{ ${field.fields.map((subField: any) => `${toPascalCase(subField.name)}: ${mapWidgetToType(subField.widget, subField)};`).join(" ")} }`;
    case "code":
      return "string";
    case "hidden":
      return ""; // Ignore hidden fields
    default:
      return "string"; // Default type
  }
};

// Read the DecapCMS config.yml file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.resolve(__dirname, "../../../public/admin/config.yml");
const outputDir = path.resolve(__dirname, "../types/cms");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const config = yaml.load(fs.readFileSync(configPath, "utf8")) as any;
if (!config || !config.collections) {
  throw new Error("Missing or invalid 'collections' field in the config.");
}

const generatedFiles: string[] = [];

config.collections.forEach((collection: any) => {
  if (!collection.fields && !collection.files) {
    throw new Error(`Missing 'fields' or 'files' in collection: ${collection.name}`);
  }

  const collectionName = toPascalCase(collection.name);
  const typeDefinitions: string[] = [];
  const listTypes: { name: string; fields: any[] }[] = [];

  const generateTypeForField = (field: any): string | null => {
    const fieldName = toCamelCase(field.name);
    const optionalMark = field.required === false ? "?" : "";

    if (field.widget === "object" && field.fields) {
      const nestedFields = field.fields.map(generateTypeForField).filter(Boolean).join("\n");
      return `  ${fieldName}${optionalMark}: {\n${nestedFields}\n  };`;
    } else if (field.widget === "list") {
      if (field.label_singular) {
        const listTypeName = field.label_singular.replace(/\s+/g, "");
        listTypes.push({ name: listTypeName, fields: field.fields || [] });
        return `  ${fieldName}${optionalMark}: ${listTypeName}[];`;
      } else if (field.fields) {
        const nestedFields = field.fields.map(generateTypeForField).filter(Boolean).join("\n");
        return `  ${fieldName}${optionalMark}: {\n${nestedFields}\n  }[];`;
      } else {
        return `  ${fieldName}${optionalMark}: string[];`;
      }
    } else {
      const tsType = mapWidgetToType(field.widget, field);
      return tsType ? `  ${fieldName}${optionalMark}: ${tsType};` : null;
    }
  };

  if (collection.fields) {
    const fields = collection.fields.map(generateTypeForField).filter(Boolean);
    typeDefinitions.push(`export type ${collectionName} = {\n${fields.join("\n")}\n};`);
  }

  if (collection.files) {
    collection.files.forEach((file: any) => {
      const fileTypeName = toPascalCase(file.name);
      const fields = file.fields.map(generateTypeForField).filter(Boolean);
      typeDefinitions.push(`export type ${fileTypeName} = {\n${fields.join("\n")}\n};`);
    });
  }

  // Generate standalone list item types
  const listTypeDefinitions = listTypes
    .map(({ name, fields }) => {
      const fieldDefinitions = fields.map(generateTypeForField).filter(Boolean).join("\n");
      return `export type ${name} = {\n${fieldDefinitions}\n};`;
    })
    .join("\n\n");

  const finalTypes = `${typeDefinitions.join("\n\n")}\n\n${listTypeDefinitions}`;

  // Write each collection to a separate file
  const outputPath = path.join(outputDir, `${toPascalCase(collection.name)}.ts`);
  fs.writeFileSync(outputPath, finalTypes, "utf8");
  console.log(`Generated: ${outputPath}`);

  generatedFiles.push(toCamelCase(collection.name));
});

// Generate `index.ts` with exports for all collection files
const indexPath = path.join(outputDir, "index.ts");
const indexContent = generatedFiles
  .map((file) => `export * as ${toPascalCase(file)} from "./${toPascalCase(file)}";`)
  .join("\n");

fs.writeFileSync(indexPath, indexContent, "utf8");
console.log(`Generated: ${indexPath}`);
