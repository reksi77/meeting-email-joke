// The Meeting That Should Have Been an Email — entry program.
//
// Writes one original one-line joke to /output/entry.txt. The joke is
// written by hand below (a single string literal); the program simply
// delivers it, byte-identical, on every run.
//
// The angle: the meeting exists because nobody wanted to WRITE the email,
// so fourteen people sit through a live reading of the draft instead.
// The turn lands on the last words — the man pausing after every comma
// like the punctuation might object.
//
// The entry is validated against the sealed gate before it is written:
// UTF-8, 1–200 characters (code points, not bytes), one line, and more
// than whitespace — so a bad string fails loudly here instead of
// silently scoring Valid 0 in the sandbox.
import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "Nobody wanted to write the email, so they called a meeting, and fourteen of us sat in the glass room watching a man read his own draft out loud, pausing after every comma like it might object.";

const chars = [...JOKE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, outside the 1–200 gate`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!/\S/.test(JOKE)) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
