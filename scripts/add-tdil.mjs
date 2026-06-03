import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tdilPath = path.join(root, "tdil.json");

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function usage() {
  console.log('Usage: npm run tdil -- --tag CSS "What I learned today"');
  console.log('Optional: --date 2026-06-03');
}

function parseArgs(argv) {
  const result = {
    date: localDateString(),
    tag: "",
    entryParts: []
  };

  for (let i = 0; i < argv.length; i++) {
    const value = argv[i];
    if (value === "--tag" || value === "-t") {
      result.tag = argv[++i] || "";
      continue;
    }
    if (value === "--date" || value === "-d") {
      result.date = argv[++i] || "";
      continue;
    }
    if (value === "--help" || value === "-h") {
      result.help = true;
      continue;
    }
    result.entryParts.push(value);
  }

  return result;
}

function validateDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(date + "T00:00:00Z").getTime());
}

const args = parseArgs(process.argv.slice(2));
const entry = args.entryParts.join(" ").trim();
const tag = args.tag.trim();

if (args.help) {
  usage();
  process.exit(0);
}

if (!entry) {
  console.error("TDIL entry is required.");
  usage();
  process.exit(1);
}

if (!validateDate(args.date)) {
  console.error("Date must use YYYY-MM-DD format.");
  process.exit(1);
}

const existing = JSON.parse(await readFile(tdilPath, "utf8"));
if (!Array.isArray(existing)) {
  throw new Error("tdil.json must contain an array.");
}

const nextEntry = {
  date: args.date,
  tag,
  entry
};

existing.unshift(nextEntry);
await writeFile(tdilPath, JSON.stringify(existing, null, 2) + "\n");

console.log("Added TDIL entry:");
console.log(`${nextEntry.date}${tag ? " [" + tag + "]" : ""} ${nextEntry.entry}`);
