import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

export function read(fileName: string): any[] {
  const filePath = path.join(dataDirectory, `${fileName}.json`);

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");

    if (!content.trim()) {
      return [];
    }

    return JSON.parse(content);
  } catch (error) {
    console.error(`READ ${fileName} ERROR:`, error);
    return [];
  }
}

export function write(fileName: string, data: any[]): any[] {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  const filePath = path.join(dataDirectory, `${fileName}.json`);

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return data;
}