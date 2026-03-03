import { mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'node_modules', '@gutenye', 'ocr-models');
const targetRoot = path.join(root, 'public', 'assets');
const required = new Set([
  'ch_PP-OCRv4_det_infer.onnx',
  'ch_PP-OCRv4_rec_infer.onnx',
  'ppocr_keys_v1.txt'
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

async function main() {
  const allFiles = await walk(sourceRoot);
  const selected = allFiles.filter(file => required.has(path.basename(file)));

  if (selected.length !== required.size) {
    const found = selected.map(file => path.basename(file));
    const missing = [...required].filter(file => !found.includes(file));
    throw new Error(`Faltan modelos OCR: ${missing.join(', ')}`);
  }

  await mkdir(targetRoot, { recursive: true });

  for (const file of selected) {
    const fileName = path.basename(file);
    await copyFile(file, path.join(targetRoot, fileName));
  }
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
