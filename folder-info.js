import path from "node:path";
import fs from "node:fs/promises";

const inputCLI = process.argv[2];
const folderPath = inputCLI ? path.resolve(inputCLI) : process.cwd();

let entries;

try {
  const files = await fs.readdir(folderPath);
  entries = await Promise.all(
    files.map((f) => fs.stat(path.join(folderPath, f))),
  );
} catch (error) {
  console.error("error: could not read folder: missing-folder:", error.message);
  console.log('stop execution');
  process.exit(1);
}

console.log("Folder: ", path.basename(folderPath));
console.log("Path: ", folderPath);
console.log("Files: ", entries.filter((s) => s.isFile()).length);
console.log("Folders: ", entries.filter((s) => s.isDirectory()).length);
