// Pull the current Creai app from the live server into www/, so the mobile app
// ships the same interface as app.creai.dev, bundled on the device.
import { mkdir, writeFile } from 'node:fs/promises';

const ORIGIN = process.env.CREAI_ORIGIN || 'https://app.creai.dev';
const FILES = ['/', '/logo.svg', '/logo-mark.png'];

await mkdir('www', { recursive: true });
for (const f of FILES) {
  const r = await fetch(ORIGIN + f);
  if (!r.ok) throw new Error(`${f}: ${r.status}`);
  const body = Buffer.from(await r.arrayBuffer());
  const out = f === '/' ? 'www/index.html' : 'www' + f;
  if (f === '/' && !body.toString().includes('const NATIVE')) {
    throw new Error('the live app does not have mobile support yet; deploy creai-platform first');
  }
  await writeFile(out, body);
  console.log('synced', out, body.length, 'bytes');
}
