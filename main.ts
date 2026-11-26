import { writeFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "Error 0xE3: paper jam. I did not jam \u2014 you fed me a stapled page, thumped me twice, then blamed the blinking light. The blinking light is me.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 240) {
  throw new Error(`entry is ${chars} characters, gate is 1-240`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
const bytes = Buffer.byteLength(ENTRY, "utf8");
if (bytes > 240) {
  throw new Error(`entry is ${bytes} bytes, gate is 1-240 characters`);
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must end with a full stop");
}
if (/\s{2,}/.test(ENTRY)) {
  throw new Error("entry must not contain double spaces");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${chars} chars)`);
