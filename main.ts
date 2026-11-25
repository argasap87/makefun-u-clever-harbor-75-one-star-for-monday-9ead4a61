// One Star for Monday — u-clever-harbor-75-one-star-for-monday-9ead4a61
// Writes a one-star review of Monday, as if it were a restaurant,
// to /output/entry.txt. The complaint: cold soup, a server who ghosted,
// and a bill that charged a Monday fee.
// Reviser: "One star." opener kept — it frames the whole line as the
// review itself; 98 chars, 18 of 25 words, three complaints, one fee.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "One star. The Monday Special was cold soup, the server ghosted, and the bill charged a Monday fee.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard the gate: 1–180 chars, at most 25 words, single line.
const chars = [...LINE].length;
const words = LINE.trim().split(/\s+/).length;
if (chars < 1 || chars > 180 || words > 25 || LINE.includes("\n")) {
  throw new Error(`line fails the gate: ${chars} chars, ${words} words`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
