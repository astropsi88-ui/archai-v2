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
  'office-demo.html',
  'pricing.html',
  'privacy.html',
  'terms.html',
  '404.html',
  'assets/styles.css',
  'assets/app.js',
  'assets/business.css',
  'assets/pricing-data.js',
  'assets/office-demo.css',
  'assets/office-demo.js',
  'assets/images/adam-room.png',
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
const appJs = fs.readFileSync(path.join(publicDir, 'assets/app.js'), 'utf8');
try {
  new Function(appJs);
} catch (error) {
  console.error('app.js contains invalid JavaScript:', error.message);
  ok = false;
}
if (appJs.includes('<' + 'redacted>')) {
  console.error('app.js contains a redaction placeholder');
  ok = false;
}
if (!home.includes('class="vik-idle-caret"') || !home.includes('assets/app.js?v=20260822-runtime-repair-2')) {
  console.error('Homepage missing restored idle caret or repaired app cache version');
  ok = false;
}
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
  if (!html.includes('v=20260819-vik-play-1')) {
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
for (const expected of ['office-demo.html', 'data-office-live-preview', 'Открыть интерактивный Office', 'Открывается в браузере — на компьютере и телефоне.']) {
  if (!office.includes(expected)) {
    console.error('digital-office.html missing live Office demo element:', expected);
    ok = false;
  }
}
const officeDemo = fs.readFileSync(path.join(publicDir, 'office-demo.html'), 'utf8');
const officeDemoJs = fs.readFileSync(path.join(publicDir, 'assets/office-demo.js'), 'utf8');
for (const expected of ['Вся команда', 'Голосовой режим', 'Прослушать', 'assets/images/adam-room.png', 'assets/office-demo.css', 'assets/office-demo.js']) {
  if (!officeDemo.includes(expected) && !officeDemoJs.includes(expected)) {
    console.error('office-demo.html missing interactive capability:', expected);
    ok = false;
  }
}
for (const forbidden of ['getUserMedia', 'MediaRecorder', 'speechSynthesis', 'new Audio(', 'fetch(', 'XMLHttpRequest', 'WebSocket']) {
  if (officeDemoJs.includes(forbidden)) {
    console.error('Office public demo must remain side-effect free:', forbidden);
    ok = false;
  }
}
if ((home.match(/vik-intro-16x9\.mp4/g) || []).length !== 1 || productPages.includes('vik-intro-16x9.mp4')) {
  console.error('The primary Vik video must appear exactly once, on the homepage');
  ok = false;
}
if (!home.includes('aria-label="Поговорить с Виком голосом" data-vik-voice-prototype') || home.includes('disabled aria-label="Поговорить с Виком')) {
  console.error('The public Vik voice card must be enabled in normal homepage HTML');
  ok = false;
}
for (const expected of ['"X-Vik-Voice": "1"', '/api/vik-site/voice/session', '/api/vik-site/voice/deep', 'mode: "speech_to_speech"', 'new RTCPeerConnection()', 'response.output_audio_transcript.delta', 'function_call_output', '/api/vik-site/voice/events', 'sessionStorage.setItem(vikConversationStorageKey, token.conversationId)']) {
  if (!appJs.includes(expected)) {
    console.error('app.js missing public ONE VIK voice production lock:', expected);
    ok = false;
  }
}
if (appJs.includes('params.get("vik_voice_test") !== "1"') || appJs.includes('Закрытый тест ·')) {
  console.error('Normal public voice must not require the legacy test query gate');
  ok = false;
}
for (const expected of ['params.get("vik_owner") === "1"', 'params.get("vik_owner_rotate") === "1"', '/api/vik-site/owner/auth', '/api/vik-site/owner/secret-rotation', 'window.location.replace(target.href)']) {
  if (!appJs.includes(expected)) {
    console.error('app.js missing closed owner browser flow lock:', expected);
    ok = false;
  }
}
for (const expected of ['url.protocol !== "https:"', '["t.me", "telegram.me"].includes(url.hostname)', 'url.searchParams.get("start")', 'window.location.assign(data.url)']) {
  if (!appJs.includes(expected)) {
    console.error('Telegram handoff must validate and use the fresh backend t.me URL directly:', expected);
    ok = false;
  }
}
for (const forbidden of ['makeTelegramWebUrl', 'web.telegram.org/a/#?tgaddr']) {
  if (appJs.includes(forbidden)) {
    console.error('Telegram handoff must not transform the fresh backend URL:', forbidden);
    ok = false;
  }
}
if (fs.readFileSync(path.join(__dirname, '..', 'assets/app.js'), 'utf8') !== appJs) {
  console.error('Source and public app.js must remain synchronized');
  ok = false;
}
for (const expected of ['addChatMessage("user", transcript)', 'addChatMessage("assistant", state.assistantTranscript', 'updateChatMessages(state.assistantItems, state.assistantTranscript)', 'vikVoiceCompletedTurnOutboxV1', 'persistCompletedTurn({ type: "completed_turn", status: "completed"', 'responseStatus === "completed"', 'pendingClientTurnId']) {
  if (!appJs.includes(expected)) {
    console.error('Realtime transcript must render live and completed turns must remain durably queued:', expected);
    ok = false;
  }
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

for (const file of requiredPublicFiles.filter((file) => file.endsWith('.html') && file !== 'office-demo.html')) {
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
