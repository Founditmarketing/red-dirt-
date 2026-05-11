// One-shot image optimizer.
// Generates AVIF + WebP at multiple widths for the assets that drive LCP and
// brand recognition. Outputs alongside the originals so paths stay stable.
//
// Run with: node scripts/optimize-images.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const targets = [
    {
        input: 'tractors/12.jpg',
        sizes: [640, 960, 1440, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_about.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_inventory.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_parts_service.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_contact.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_transparency.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'hero_trailers.png',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
    {
        input: 'reddirtlightlogo.png',
        sizes: [120, 200, 320],
        formats: ['webp', 'avif'],
        quality: { avif: 70, webp: 88 },
    },
    {
        input: 'logo.png',
        sizes: [120, 240, 480],
        formats: ['webp', 'avif'],
        quality: { avif: 70, webp: 88 },
    },
    {
        input: 'about.jpg',
        sizes: [768, 1280, 1920],
        formats: ['avif', 'webp'],
        quality: { avif: 55, webp: 78 },
    },
];

const summary = [];

for (const target of targets) {
    const inputAbs = path.join(PUBLIC_DIR, target.input);
    let stat;
    try {
        stat = await fs.stat(inputAbs);
    } catch {
        console.warn('skip (missing):', target.input);
        continue;
    }
    const inputSize = stat.size;

    const ext = path.extname(target.input);
    const base = target.input.slice(0, -ext.length);

    for (const format of target.formats) {
        for (const width of target.sizes) {
            const outRel = `${base}-${width}.${format}`;
            const outAbs = path.join(PUBLIC_DIR, outRel);
            await fs.mkdir(path.dirname(outAbs), { recursive: true });

            const pipeline = sharp(inputAbs).rotate().resize({
                width,
                withoutEnlargement: true,
                fit: 'inside',
            });

            let buf;
            if (format === 'avif') {
                buf = await pipeline.avif({ quality: target.quality.avif }).toBuffer();
            } else if (format === 'webp') {
                buf = await pipeline.webp({ quality: target.quality.webp }).toBuffer();
            } else {
                throw new Error(`Unsupported format: ${format}`);
            }

            await fs.writeFile(outAbs, buf);
            summary.push({
                input: target.input,
                output: outRel,
                originalKB: Math.round(inputSize / 1024),
                outputKB: Math.round(buf.length / 1024),
            });
        }
    }
}

const totalIn = summary.reduce((sum, s) => sum + s.originalKB, 0);
const totalOut = summary.reduce((sum, s) => sum + s.outputKB, 0);
console.log(`Generated ${summary.length} optimized files.`);
for (const row of summary) {
    console.log(`  ${row.output.padEnd(48)} ${String(row.outputKB).padStart(5)} KB  (from ${row.originalKB} KB original)`);
}
console.log(`Total original (each counted per output): ${totalIn} KB`);
console.log(`Total optimized:                          ${totalOut} KB`);
