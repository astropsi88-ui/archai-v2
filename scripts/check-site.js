const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const requiredPublicFiles = [
  'index.html',
  'companion.html',
  'partner.html',
  'coauthor.html',
  'project.html',
  'ai-sites.html',
  'privacy.html',
  'terms.html',
  '404.html',
  'assets/styles.css',
  'assets/app.js',
];
const forbiddenPublicEntries = [
  'ArchAI_Codex_CLEAN_2026-07-10 (1).md',
  'references',
  'scripts',
  'package.json',
  'wrangler.jsonc',
];
let ok = true;

if (!fs.existsSync(publicDir)) {
  console.error('Missing public directory');
  ok = false;
}

for (const file of requiredPublicFiles) {
  const fullPath = path.join(publicDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error('Missing public asset:', file);
    ok = false;
  }
}

for (const entry of forbiddenPublicEntries) {
  const fullPath = path.join(publicDir, entry);
  if (fs.existsSync(fullPath)) {
    console.error('Forbidden file or directory in public:', entry);
    ok = false;
  }
}

for (const file of requiredPublicFiles.filter((file) => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(publicDir, file), 'utf8');
  if (!html.includes('assets/styles.css')) {
    console.error(file, 'does not reference assets/styles.css');
    ok = false;
  }
  if (!html.includes('assets/app.js')) {
    console.error(file, 'does not reference assets/app.js');
    ok = false;
  }
}

const wranglerConfigPath = path.join(__dirname, '..', 'wrangler.jsonc');
if (!fs.existsSync(wranglerConfigPath)) {
  console.error('Missing wrangler.jsonc');
  ok = false;
} else {
  const wranglerConfig = fs.readFileSync(wranglerConfigPath, 'utf8');
  for (const expected of ['"name": "archai-v2"', '"compatibility_date": "2026-07-10"', '"directory": "./public"', '"html_handling": "auto-trailing-slash"', '"not_found_handling": "404-page"']) {
    if (!wranglerConfig.includes(expected)) {
      console.error('wrangler.jsonc missing expected setting:', expected);
      ok = false;
    }
  }
}

process.exit(ok ? 0 : 1);
