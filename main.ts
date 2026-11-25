// One Star for Monday — u-clever-harbor-75-one-star-for-monday-9ead4a61
// Writes a one-star review of Monday, as if it were a restaurant,
// to /output/entry.txt. The review: raw panic served at 6 AM, a server
// who spat in the coffee, and an 8-hour cover charge that is
// non-refundable — the workday translated into restaurant terms.
// Quality rebuild (25 Nov 2026): two critics scored the cold-soup line
// 4/10 (Gemini) and 6/10 (Groq) — below the 7/10 bar. This replacement
// won a 4-candidate judged pool: Gemini 8.5/10, Groq 9/10.
// 111 chars, 21 of 25 words.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "1 star. Served raw panic at 6 AM, the server spat in my coffee, and the 8-hour cover charge was non-refundable.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard the gate: 1–180 chars, at most 25 words, single line.
const chars = [...LINE].length;
const words = LINE.trim().split(/\s+/).length;
if (chars < 1 || chars > 180 || words > 25 || LINE.includes("\n")) {
  throw new Error(`line fails the gate: ${chars} chars, ${words} words`);
}
// Reviser guard (25 Nov 2026): the entry is one clean printed line, so
// reject anything a single-line gate would let slip through — control
// characters, leading/trailing or doubled spaces, and a line that does
// not end in terminal punctuation. The judged line itself is untouched.
const hasControl = [...LINE].some((ch) => ch.charCodeAt(0) < 0x20);
const hasBadSpacing =
  LINE !== LINE.trim() || LINE.includes("  ") || LINE.includes("\t");
const endsClean = /[.!?]$/.test(LINE);
if (hasControl || hasBadSpacing || !endsClean) {
  throw new Error(
    `line fails the clean-print gate: control=${hasControl} spacing=${hasBadSpacing} endsClean=${endsClean}`,
  );
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
