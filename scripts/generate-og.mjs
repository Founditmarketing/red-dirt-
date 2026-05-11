// Generate a branded 1200x630 OpenGraph image (PNG) for social link previews.
// Uses sharp to composite the hero photo with a brand-red bar and SVG headline.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const W = 1200;
const H = 630;

const heroPath = path.join(PUBLIC_DIR, 'tractors', '12-1440.webp');
const outPath = path.join(PUBLIC_DIR, 'og-image.png');

// Render the hero, dim it, lay a charcoal-to-transparent gradient, then add SVG text.
const hero = await sharp(heroPath)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.85 })
    .toBuffer();

// SVG overlay: gradient mask + headline + brand bar + eyebrow + footer
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="darken" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#1A1A1A" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0.45"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0.85"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#darken)"/>
  <rect x="0" y="${H - 220}" width="${W}" height="220" fill="url(#bottomFade)"/>

  <!-- Brand red diagonal accent on the right edge -->
  <polygon points="${W - 8},0 ${W},0 ${W},${H} ${W - 8},${H}" fill="#E31837"/>
  <polygon points="${W - 220},0 ${W - 8},0 ${W - 8},42 ${W - 220 + 42},42" fill="#E31837" opacity="0.85"/>

  <!-- Eyebrow -->
  <text x="80" y="180"
        font-family="Helvetica, Arial, sans-serif"
        font-size="24"
        font-weight="700"
        letter-spacing="6"
        fill="#E31837">
    RED DIRT TRACTORS
  </text>

  <!-- Headline -->
  <text x="80" y="290"
        font-family="Helvetica, Arial, sans-serif"
        font-size="92"
        font-weight="900"
        fill="#FFFFFF"
        letter-spacing="-2">
    Move the Earth.
  </text>
  <text x="80" y="385"
        font-family="Helvetica, Arial, sans-serif"
        font-size="92"
        font-weight="900"
        fill="#FFFFFF"
        letter-spacing="-2">
    Master the <tspan fill="#E31837">Land.</tspan>
  </text>

  <!-- Brand strip -->
  <text x="80" y="475"
        font-family="Helvetica, Arial, sans-serif"
        font-size="22"
        font-weight="600"
        fill="rgba(255,255,255,0.78)">
    TYM · Mahindra · Ferris · Wacker Neuson · Yanmar
  </text>

  <!-- Footer -->
  <line x1="80" y1="525" x2="180" y2="525" stroke="#E31837" stroke-width="3"/>
  <text x="80" y="565"
        font-family="Helvetica, Arial, sans-serif"
        font-size="22"
        font-weight="700"
        fill="rgba(255,255,255,0.92)">
    7547 Hwy 71 South · Alexandria, LA
  </text>
  <text x="80" y="595"
        font-family="Helvetica, Arial, sans-serif"
        font-size="20"
        font-weight="500"
        fill="rgba(255,255,255,0.55)"
        letter-spacing="2">
    reddirt-tractors.com   ·   318.442.9010
  </text>
</svg>`;

const buffer = await sharp(hero)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png({ quality: 92 })
    .toBuffer();

await fs.writeFile(outPath, buffer);

const stat = await fs.stat(outPath);
console.log(`Wrote ${path.relative(ROOT, outPath)} (${Math.round(stat.size / 1024)} KB)`);

// Also export a square variant for messengers that prefer it
const square = await sharp(hero)
    .resize(1200, 1200, { fit: 'cover', position: 'centre' })
    .composite([{ input: Buffer.from(svg.replace(`viewBox="0 0 ${W} ${H}"`, `viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"`).replace(`height="${H}"`, `height="1200"`)), top: 0, left: 0 }])
    .png({ quality: 92 })
    .toBuffer();
await fs.writeFile(path.join(PUBLIC_DIR, 'og-image-square.png'), square);
const stat2 = await fs.stat(path.join(PUBLIC_DIR, 'og-image-square.png'));
console.log(`Wrote og-image-square.png (${Math.round(stat2.size / 1024)} KB)`);
