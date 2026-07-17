import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { createHash } from "crypto";
import { join, relative, sep, dirname } from "path";
import { fileURLToPath } from "url";

const CHATTERBOX_URL = "http://localhost:8004/v1/audio/speech";
const VOICE = "Michael.wav";
const MODEL = "chatterbox";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIKI_DIR = join(__dirname, "..", "src", "content", "wiki");
const AUDIO_DIR = join(__dirname, "..", "public", "audio", "wiki");
const MANIFEST_PATH = join(AUDIO_DIR, "manifest.json");

function walkDir(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

function stripMdx(text: string): string {
  let result = text;

  // Remove frontmatter (--- ... ---)
  result = result.replace(/^---[\s\S]*?---\n*/m, "");

  // Remove code blocks (``` ... ```)
  result = result.replace(/```[\s\S]*?```/g, "");

  // Remove inline code
  result = result.replace(/`[^`]+`/g, "");

  // Remove HTML/JSX tags
  result = result.replace(/<[^>]*>/g, "");

  // Remove images ![alt](url)
  result = result.replace(/!\[.*?\]\(.*?\)/g, "");

  // Replace markdown links with just the text [text](url) -> text
  result = result.replace(/\[([^\]]*)\]\(.*?\)/g, "$1");

  // Remove bold/italic markers
  result = result.replace(/(\*\*\*|___)(.*?)\1/g, "$2");
  result = result.replace(/(\*\*|__)(.*?)\1/g, "$2");
  result = result.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove markdown headers markers
  result = result.replace(/^#{1,6}\s+/gm, "");

  // Remove horizontal rules
  result = result.replace(/^---+\s*$/gm, "");
  result = result.replace(/^\*+\s*$/gm, "");

  // Remove table separators
  result = result.replace(/^\|.*\|$/gm, "");
  result = result.replace(/^[-| :]+$/gm, "");

  // Remove blockquote markers
  result = result.replace(/^>\s+/gm, "");

  // Remove list markers
  result = result.replace(/^[\s]*[-*+]\s+/gm, "");
  result = result.replace(/^[\s]*\d+\.\s+/gm, "");

  // Handle wiki links: [[Page|Label]] -> Label, [[Page]] -> Page
  result = result.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2");
  result = result.replace(/\[\[([^\]]+)\]\]/g, "$1");

  // Collapse multiple newlines into two
  result = result.replace(/\n{3,}/g, "\n\n");

  // Trim
  result = result.trim();

  return result;
}

function slugFromPath(filePath: string): string {
  const rel = relative(WIKI_DIR, filePath).replace(/\.mdx$/, "");
  return rel.split(sep).join("/");
}

function contentHash(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

async function generateAudio(text: string, slug: string): Promise<boolean> {
  const payload = {
    model: MODEL,
    input: text,
    voice: VOICE,
    response_format: "wav",
    speed: 1.0,
  };

  console.log(`  Generating audio for ${slug} (${text.length} chars)...`);

  try {
    const res = await fetch(CHATTERBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`  FAILED ${slug}: ${res.status} ${errText}`);
      return false;
    }

    const audioBuffer = await res.arrayBuffer();
    const outPath = join(AUDIO_DIR, `${slug.replace(/\//g, "-")}.wav`);
    mkdirSync(new URL(outPath, "file://").pathname ? join(outPath, "..") : AUDIO_DIR, { recursive: true });
    const dir = outPath.substring(0, outPath.lastIndexOf("/"));
    mkdirSync(dir, { recursive: true });
    writeFileSync(outPath, Buffer.from(audioBuffer));

    console.log(`  ✓ Saved ${outPath}`);
    return true;
  } catch (err) {
    console.error(`  ERROR ${slug}: ${err}`);
    return false;
  }
}

async function main() {
  console.log("Scanning wiki content...");
  const files = walkDir(WIKI_DIR);
  console.log(`Found ${files.length} wiki files`);

  let manifest: Record<string, string> = {};
  if (existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  }

  const toGenerate: { slug: string; text: string }[] = [];

  for (const file of files) {
    const slug = slugFromPath(file);
    const content = readFileSync(file, "utf-8");
    const plainText = stripMdx(content);
    const hash = contentHash(plainText);

    if (manifest[slug] === hash) {
      console.log(`  ✓ ${slug} — up to date`);
      continue;
    }

    toGenerate.push({ slug, text: plainText });
  }

  if (toGenerate.length === 0) {
    console.log("All audio files are up to date!");
    return;
  }

  console.log(`\nGenerating ${toGenerate.length} audio files via Chatterbox TTS...\n`);

  // Check if server is up
  try {
    const healthCheck = await fetch("http://localhost:8004/");
    if (!healthCheck.ok) throw new Error(`Server returned ${healthCheck.status}`);
  } catch {
    console.error("ERROR: Cannot reach Chatterbox TTS server at http://localhost:8004");
    console.error("Make sure it's running: cd ~/AI/Chatterbox-TTS-Server && python server.py");
    process.exit(1);
  }

  for (const { slug, text } of toGenerate) {
    const success = await generateAudio(text, slug);
    if (success) {
      manifest[slug] = contentHash(text);
    }
  }

  mkdirSync(AUDIO_DIR, { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone! Manifest saved to ${MANIFEST_PATH}`);
}

main().catch(console.error);
