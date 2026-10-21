/**
 * Post-build SSG script
 * Generates individual HTML pages for each word + sitemap.xml
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://kyotan.tobazu.com";

function wordToSlug(word) {
  return word.toLowerCase().replace(/\s+/g, "-");
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildTitle(word) {
  return `${word.word} - ${word.meaning_ja} | 語源・例文 | 京大英語頻出単語`;
}

function buildDescription(word) {
  const parts = [
    `「${word.word}」は${word.pos_ja}で「${word.meaning_ja}」を意味します。`,
  ];
  if (word.etymology) parts.push(`語源：${word.etymology.slice(0, 60)}。`);
  if (word.synonyms) parts.push(`類義語：${word.synonyms}。`);
  parts.push("京大入試頻出の英単語を語源・例文つきで解説。");
  return parts.join("").slice(0, 155);
}

function buildJsonLd(word, url) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    name: word.word,
    description: word.meaning_ja,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${SITE_URL}/#dataset`,
      name: "京大英語頻出単語データベース",
      url: SITE_URL,
    },
  };
  if (word.example_en) {
    schema.workExample = {
      "@type": "CreativeWork",
      text: word.example_en,
      ...(word.example_ja && { description: word.example_ja }),
    };
  }
  return JSON.stringify(schema);
}

function buildNoscriptContent(word) {
  const lines = [
    `<h1>${escapeHtml(word.word)}</h1>`,
    `<p><strong>品詞:</strong> ${escapeHtml(word.pos_ja)}</p>`,
    `<p><strong>意味:</strong> ${escapeHtml(word.meaning_ja)}</p>`,
    `<p><strong>頻度分類:</strong> ${escapeHtml(word.level)}</p>`,
  ];
  if (word.etymology)
    lines.push(`<p><strong>語源:</strong> ${escapeHtml(word.etymology)}</p>`);
  if (word.example_en) {
    lines.push(`<p><strong>例文:</strong> ${escapeHtml(word.example_en)}</p>`);
    if (word.example_ja)
      lines.push(`<p><strong>訳:</strong> ${escapeHtml(word.example_ja)}</p>`);
  }
  if (word.synonyms)
    lines.push(`<p><strong>類義語:</strong> ${escapeHtml(word.synonyms)}</p>`);
  if (word.antonyms)
    lines.push(`<p><strong>対義語:</strong> ${escapeHtml(word.antonyms)}</p>`);
  if (word.kyodai_usage)
    lines.push(
      `<p><strong>京大での使われ方:</strong> ${escapeHtml(word.kyodai_usage)}</p>`
    );
  if (word.memory_tip)
    lines.push(`<p><strong>覚え方:</strong> ${escapeHtml(word.memory_tip)}</p>`);
  return lines.join("\n    ");
}

function generateWordHtml(baseHtml, word) {
  const slug = wordToSlug(word.word);
  const url = `${SITE_URL}/words/${slug}`;
  const title = escapeHtml(buildTitle(word));
  const description = escapeHtml(buildDescription(word));
  const jsonLd = buildJsonLd(word, url);

  const extraHead = `
    <script type="application/ld+json">${jsonLd}</script>`;

  const noscript = `
  <noscript>
    <div style="max-width:800px;margin:2rem auto;padding:1rem;font-family:sans-serif">
    ${buildNoscriptContent(word)}
    <p><a href="${SITE_URL}/">← 単語一覧に戻る</a></p>
    </div>
  </noscript>`;

  return baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="article" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${url}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace("</head>", `${extraHead}\n  </head>`)
    .replace('<div id="root"></div>', `${noscript}\n  <div id="root"></div>`);
}

// ── Main ──────────────────────────────────────────────────────────────────

const distDir = path.join(ROOT, "dist");
if (!fs.existsSync(distDir)) {
  console.error("dist/ が見つかりません。先に npm run build を実行してください。");
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const words = JSON.parse(
  fs.readFileSync(path.join(ROOT, "public/data/words.json"), "utf-8")
);

console.log(`Generating ${words.length} word pages...`);

for (const word of words) {
  const slug = wordToSlug(word.word);
  const dir = path.join(distDir, "words", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), generateWordHtml(baseHtml, word));
}

console.log("Word pages generated.");

// ── sitemap.xml ───────────────────────────────────────────────────────────

const priorityMap = { 頻出: "0.8", 重要: "0.7", 発展: "0.6" };
const today = new Date().toISOString().split("T")[0];

const urlEntries = words
  .map((w) => {
    const slug = wordToSlug(w.word);
    const priority = priorityMap[w.level] || "0.6";
    return `  <url>
    <loc>${SITE_URL}/words/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${urlEntries}
</urlset>`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf-8");
console.log(`sitemap.xml generated (${words.length + 1} URLs).`);

console.log("SSG build complete.");
