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
  'digital-office.html',
  'pricing.html',
  'privacy.html',
  'terms.html',
  '404.html',
  'assets/styles.css',
  'assets/app.js',
  'assets/business.css',
  'assets/pricing-data.js',
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

const businessPages = ['index.html', 'companion.html', 'partner.html', 'ai-sites.html', 'digital-office.html', 'pricing.html'];
for (const file of businessPages) {
  const html = fs.readFileSync(path.join(publicDir, file), 'utf8');
  for (const expected of ['companion.html', 'ai-sites.html', 'digital-office.html', 'pricing.html', 'assets/business.css']) {
    if (!html.includes(expected)) {
      console.error(file, 'missing business navigation or asset:', expected);
      ok = false;
    }
  }
  if (/29\s*000|65\s*000|9\s*000|15\s*000/.test(html)) {
    console.error(file, 'contains a retired public price');
    ok = false;
  }
}

const home = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
const productPages = businessPages.slice(1).map((file) => fs.readFileSync(path.join(publicDir, file), 'utf8')).join('\n');
const businessCss = fs.readFileSync(path.join(publicDir, 'assets/business.css'), 'utf8');
const footerRequirements = [
  'Обсудить с Виком',
  'Написать Светлане Итаф',
  'Telegram Вика',
  'Telegram ArchAI',
  'YouTube',
  'Политика конфиденциальности',
  'Пользовательское соглашение',
];
for (const file of businessPages) {
  const html = fs.readFileSync(path.join(publicDir, file), 'utf8');
  for (const expected of footerRequirements) {
    if (!html.includes(expected)) {
      console.error(file, 'missing restored footer item:', expected);
      ok = false;
    }
  }
  if (!html.includes('v=20260818-pricing-v2')) {
    console.error(file, 'missing current cache-busting asset version');
    ok = false;
  }
}
for (const expected of [
  '.hero-contact-row',
  'height:244px',
  'resize:none!important',
  '.light-flow-track i',
  '@keyframes flow-signal',
  '.office-dashboard',
  'body.business-page:not(.home-page) .page-hero h1',
  'font-size:clamp(50px,5.2vw,64px)',
  '.site-footer .footer-links > div',
]) {
  if (!businessCss.includes(expected)) {
    console.error('business.css missing visual regression lock:', expected);
    ok = false;
  }
}
const office = fs.readFileSync(path.join(publicDir, 'digital-office.html'), 'utf8');
for (const expected of ['AI-администратор', 'AI-продавец', 'AI-маркетолог', 'AI-аналитик', 'data-office-demo', 'Открывается в браузере — на компьютере и телефоне.']) {
  if (!office.includes(expected)) {
    console.error('digital-office.html missing interactive demo element:', expected);
    ok = false;
  }
}
if ((home.match(/vik-intro-4x5\.mp4/g) || []).length !== 1 || productPages.includes('vik-intro-4x5.mp4')) {
  console.error('The primary Vik video must appear exactly once, on the homepage');
  ok = false;
}
if (!fs.readFileSync(path.join(publicDir, 'partner.html'), 'utf8').includes('ai-development-hero')) {
  console.error('Development transformation film is missing');
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
