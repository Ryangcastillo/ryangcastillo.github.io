import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const srcDir = path.resolve(root, 'src', 'admin');
const destDir = path.resolve(root, 'templates', 'admin-starter', 'src', 'admin');

async function exists(p) {
  try { await fs.stat(p); return true; } catch { return false; }
}

async function main() {
  if (!(await exists(srcDir))) {
    console.error(`Source admin module not found at: ${srcDir}`);
    process.exit(1);
  }
  // Ensure parent exists
  await fs.mkdir(path.dirname(destDir), { recursive: true });
  // Clean destination
  await fs.rm(destDir, { recursive: true, force: true });
  // Copy
  // fs.cp is available in Node 16+
  await fs.cp(srcDir, destDir, { recursive: true });
  console.log(`Synced admin module to: ${destDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

