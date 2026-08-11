import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = join(fileURLToPath(new URL('../out/', import.meta.url)));
const PORT = 4325;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt', '.xml']);

function cacheControl(path) {
  if (path.includes('/_next/static/')) return 'public, max-age=31536000, immutable';
  if (extname(path) === '.pdf') return 'public, max-age=86400';
  return 'no-cache';
}

function resolveRsc(pathname) {
  if (pathname.endsWith('.__PAGE__.txt')) {
    const idx = pathname.lastIndexOf('/__next.');
    if (idx !== -1) {
      const rest = pathname.slice(idx + '/__next.'.length);
      const m = rest.match(/^(.*)\.__PAGE__\.txt$/);
      if (m) {
        const dir = m[1].replace(/\./g, '/');
        return `${pathname.slice(0, idx)}/__next.${dir}/__PAGE__.txt`;
      }
    }
  }
  return pathname;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  let path = decodeURIComponent(resolveRsc(pathname));
  if (path.endsWith('/')) path += 'index.html';
  const filePath = normalize(join(ROOT, path));
  if (!filePath.toLowerCase().startsWith(ROOT.toLowerCase())) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  try {
    const info = await stat(filePath);
    if (info.isFile()) {
      const type = TYPES[extname(filePath)] ?? 'application/octet-stream';
      let body = await readFile(filePath);
      const headers = { 'Content-Type': type, 'Cache-Control': cacheControl(filePath) };
      if (COMPRESSIBLE.has(extname(filePath)) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
        body = gzipSync(body);
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
      }
      res.writeHead(200, headers);
      res.end(body);
      return;
    }
  } catch {
    // fall through to 404
  }
  try {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(await readFile(join(ROOT, '404.html')));
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`static server on ${PORT}`));
