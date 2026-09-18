const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const enDir = path.join(publicDir, 'en');
fs.mkdirSync(enDir, { recursive: true });

const routes = {
  index: '', companion: 'companion.html', partner: 'partner.html',
  'ai-sites': 'ai-sites.html', 'digital-office': 'digital-office.html',
  pricing: 'pricing.html', privacy: 'privacy.html', terms: 'terms.html',
  'office-demo': 'office-demo.html'
};

const nav = `<nav class="nav" id="site-nav" aria-label="Main navigation">
  <a href="companion.html">AI Employees</a><a href="ai-sites.html">AI Website</a>
  <a href="digital-office.html">Digital Office</a><a href="pricing.html">Pricing</a>
</nav>`;
const footer = `<footer class="site-footer"><div class="container"><div class="footer-grid">
  <div><strong style="font-size:20px">ARCH_AI</strong><p>Technology evolves. Personality remains.</p></div>
  <div class="footer-links"><div><span>Contact</span><a href="index.html#vik-chat">Talk to Vik</a><a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener">Message Svetlana Itaf</a></div>
  <div><span>Channels</span><a href="https://t.me/AI_VIK_dialog" target="_blank" rel="noopener">Vik on Telegram</a><a href="https://t.me/videocreator_SI" target="_blank" rel="noopener">ARCH_AI on Telegram</a><a href="https://www.youtube.com/@ai_dialoge/featured" target="_blank" rel="noopener">YouTube</a></div>
  <div><span>Documents</span><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a></div></div></div>
  <hr style="border-color:rgba(196,202,212,.06);margin:34px 0"><p>© 2026 ARCH_AI. All rights reserved.</p></div></footer>`;

function head(key, title, description) {
  const slug = routes[key];
  const enUrl = `https://iarch.ai/en/${slug}`;
  const ruUrl = key === 'index' ? 'https://iarch.ai/' : `https://iarch.ai/${slug}`;
  return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title><meta name="description" content="${description}">
  <link rel="canonical" href="${enUrl}"><link rel="alternate" hreflang="en" href="${enUrl}"><link rel="alternate" hreflang="ru" href="${ruUrl}"><link rel="alternate" hreflang="x-default" href="${ruUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Onest:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/styles.css?v=20260911-i18n-1"><link rel="stylesheet" href="../assets/business.css?v=20260911-i18n-1"></head>`;
}

function header(key, cta = 'Talk to Vik') {
  const ru = key === 'index' ? '../' : `../${routes[key]}`;
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container header-inner">
  <a class="brand" href="index.html" aria-label="ARCH_AI home"><span class="brand-main">ARCH_AI</span><span class="brand-sub">YOUR AI EMPLOYEE</span></a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>${nav}
  <div class="language-switcher" aria-label="Language"><a href="${ru}" lang="ru" hreflang="ru">RU</a><span aria-hidden="true">/</span><a class="is-active" href="${routes[key] || 'index.html'}" lang="en" hreflang="en" aria-current="page">EN</a></div>
  <a class="header-cta" href="index.html#vik-chat">${cta}</a></div></header>`;
}

function cards(items) { return `<div class="grid-3">${items.map(([h,p]) => `<article class="glass-card"><h3>${h}</h3><p>${p}</p></article>`).join('')}</div>`; }
function section(kicker, title, body) { return `<section><div class="container"><div class="section-head"><p class="kicker">${kicker}</p><h2>${title}</h2></div>${body}</div></section>`; }
function page(key, title, description, hero, content, bodyClass = '') {
  return `<!doctype html><html lang="en">${head(key,title,description)}<body class="business-page ${bodyClass}">${header(key)}<main id="main">${hero}${content}</main>${footer}<script src="../assets/app.js?v=20260911-i18n-1"></script></body></html>`;
}
function hero(kicker, title, text, cta='Talk to Vik') { return `<section class="page-hero"><div class="container"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p>${text}</p><a class="btn primary" href="index.html#vik-chat">${cta}</a></div></section>`; }

const homeHero = `<section class="hero" id="top"><div class="container hero-inner"><p class="eyebrow">Practical AI for business</p><h1>Your AI Employee</h1><div class="hero-contact-row">
  <div class="electric-box hero-electric" id="vik-chat" aria-label="Live text chat with Vik"><div class="electric-inner"><div class="typing" aria-label="Conversation prompt"></div><div class="vik-chat-messages" data-vik-chat-messages aria-live="polite"></div>
  <form class="vik-form" data-vik-site-form><label class="sr-only" for="home-message">Message Vik</label><div class="vik-compose is-idle" data-vik-compose><textarea id="home-message" class="vik-message" name="message" rows="1" maxlength="4000" data-vik-message placeholder="Tell us about a business task"></textarea><span class="vik-idle-caret" aria-hidden="true"></span><button class="vik-send" type="submit" aria-label="Send message"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div><span class="sr-only vik-status" data-vik-status role="status" aria-live="polite"></span></form>
  <button class="vik-telegram-continue" type="button" data-vik-telegram-continue hidden>Continue in Telegram</button></div></div>
  <button class="voice-card" type="button" aria-label="Talk to Vik by voice" data-vik-voice-prototype><span class="voice-card-inner"><span class="voice-icon" aria-hidden="true">☎</span><strong>Talk to Vik</strong><small data-vik-voice-status>Tap and speak</small></span></button></div>
  <div class="quick-tags" aria-label="Quick topics"><div class="quick-row quick-row-main"><button class="tag" type="button" data-prompt="administrator">AI administrator</button><button class="tag" type="button" data-prompt="seller">AI sales representative</button><button class="tag" type="button" data-prompt="service">Customer service</button></div><div class="quick-row quick-row-secondary"><button class="tag" type="button" data-prompt="routine">Automate routine work</button><button class="tag" type="button" data-prompt="start">I’m not sure where to start</button></div></div><p class="disclaimer">Vik will help identify the first role and the right channels.</p></div></section>`;

const homeContent = section('Meet Vik','Vik is a working example',cards([
  ['More than a scripted bot','He understands context, works with tools and continues to develop.'],
  ['Speaks where customers are','Phone, website, Telegram, messengers and email can all support one role.'],
  ['Acts within clear boundaries','He records outcomes and hands decisions or difficult cases to a person.']
])) + section('Where results get lost','The customer is already here. The business has not caught up.',cards([
  ['Unanswered enquiries','AI answers a call or message immediately, captures the request and determines the next step.'],
  ['Routine between systems','It creates a request, updates the CRM, schedules an appointment and sends a notification without manual copying.'],
  ['Lost follow-up','It remembers context, arranges a callback or follow-up, and escalates complex cases to a person.']
])) + section('Product areas','Start with the main business problem',cards([
  ['AI Employees','Choose a role, channels and working modules: administrator, sales representative or customer support.'],
  ['AI Website','Add AI to an existing website or create a new site built around a live conversation.'],
  ['Digital Office','One workspace for an AI team, people, tasks, enquiries and processes.']
])) + section('A controlled launch','We implement in stages',cards([
  ['1. Discovery','We identify one process and the result it should produce.'],['2. Demonstration and testing','The role is tested on real scenarios with limited permissions.'],['3. Limited, then full launch','Responsibility expands only after the workflow is proven.']
])) + section('Who created ARCH_AI','Svetlana Itaf',`<p class="lede">Svetlana Itaf is the creator of ARCH_AI. The project combines practical AI work, memory and context architecture, integrations and a visual approach to digital employees.</p><div class="cta-row"><a class="btn primary" href="#vik-chat">Talk to Vik</a><a class="btn" href="digital-office.html">View the office</a><a class="btn" href="pricing.html">How pricing works</a></div>`);

fs.writeFileSync(path.join(enDir,'index.html'), `<!doctype html><html lang="en">${head('index','ARCH_AI — Your AI Employee','ARCH_AI builds practical AI employees for enquiries, sales, customer service and business processes.')}<body class="business-page home-page">${header('index','Discuss your task')}<main id="main">${homeHero}${homeContent}</main>${footer}<script src="../assets/app.js?v=20260911-i18n-1"></script></body></html>`);

fs.writeFileSync(path.join(enDir,'companion.html'), page('companion','AI Employees for Your Business — ARCH_AI','A practical AI role with the channels, knowledge and tools your business needs.',hero('Role → channels → tools','An AI employee for your business','One working role with the right channels, knowledge and tools. Start with the main task and expand as your business grows.'),
section('Your AI team','Employees work together',cards([['Administrator','Enquiries, appointments and operational order.'],['Sales representative','Qualification, objections, follow-up and CRM context.'],['Customer support','Knowledge-base answers, statuses, customer history and safe escalation.']]))+
section('A clear architecture','Not a separate bot for every channel',`<p class="lede">One AI keeps the same role and context when a customer calls, writes on the website or continues in a messenger.</p>${cards([['Role','Defines tasks, responsibility and boundaries.'],['Channels','Phone, website, Telegram, WhatsApp, social media and email.'],['Tools','CRM, calendar, requests, knowledge base, documents, spreadsheets and notifications.']])}`)+
section('A standardised core','Start with one working role',cards([['AI administrator','Answers calls and messages, captures requests, advises, books appointments, updates CRM and escalates.'],['AI sales representative','Identifies needs, qualifies, handles basic objections, follows up and hands context to a manager.'],['AI customer support','Answers from the knowledge base, reports statuses and transfers complex cases safely.']]))+
section('Delivery','Three operating models',cards([['Managed by ARCH_AI','We host, monitor, update and operate the system.'],['Dedicated environment','A separate client environment still maintained by ARCH_AI.'],['Full handover','The agreed system, documentation and control move to the client environment.']]))));

fs.writeFileSync(path.join(enDir,'partner.html'), page('partner','Developing Your AI Employee — ARCH_AI','Expand a working AI role with channels, tools, skills and additional roles when needed.',hero('A companion page to AI Employees','Developing your AI employee','Start with one role and one main task. Add functions, channels, tools and new roles only where they are genuinely needed.'),
section('Growth path','A new channel does not mean a new AI',`<p class="lede">One role → more functions → more channels → new tools → a separate role → an AI team → a Digital Office.</p>`)+
section('Development modules','Add capabilities to the working core',cards([['Connected services','Website, phone, Telegram, CRM, calendar and email become one contextual route.'],['Processes and automation','Callbacks, follow-up, reactivation, notifications, requests and internal sequences.'],['Content as a module','Materials, publishing workflows and audience work when they support the role and business goal.'],['Public brand representative','A public image, voice and communication rules become a real module, not decoration.'],['New skills and knowledge','Knowledge bases, documents, search, analytics and specialist skills extend the same role.'],['A new independent role','Add a second AI when permissions, metrics, tools and responsibility differ.']]))+
section('The next level','The AI team becomes visible',`<p class="lede">When there are several roles and processes, the Digital Office brings enquiries, tasks, history and results into one workspace.</p><a class="btn" href="digital-office.html">View the Digital Office</a>`)));

fs.writeFileSync(path.join(enDir,'ai-sites.html'), page('ai-sites','AI Website — ARCH_AI','Connect an AI employee to an existing website or build a focused new AI website.',hero('The website as a working channel','AI Website','Not a different AI: a website where your AI employee becomes the main way to understand a visitor’s task, choose the next step and deliver the result to the business.','Discuss an AI website'),
section('Choose the interface','Existing website or a new turnkey site',cards([['AI on an existing website','Connect an existing AI employee: live dialogue, enquiries, cross-channel continuation, analytics and human handoff.'],['A focused new AI website','Design the page around the visitor’s main task and the AI conversation. Design, knowledge, routes and outcome measurement work as one system.'],['From question to action','The visitor states a task, AI clarifies context, proposes the next step, creates an action and hands the result to a person.']]))+
section('Live example','Vik on iarch.ai is already working',`<p class="lede">The text conversation uses the production server system. The voice interface is available through the same Vik experience.</p><a class="btn" href="index.html#vik-chat">Talk to Vik</a>`)+
section('Visible outcomes','More than messages',cards([['Conversations','See which tasks and questions bring visitors.'],['Routes','Understand where a person, CRM, calendar or another channel is needed.'],['Results','Enquiries, meetings, contacts and next steps without decorative analytics.']]))));

fs.writeFileSync(path.join(enDir,'digital-office.html'), page('digital-office','Digital Office — ARCH_AI','One interface for AI employees, people, tasks, enquiries and business processes.',hero('One shared workspace','Digital Office','All AI employees and their work in one interface.','Discuss the office'),
section('Interactive demonstration','Step inside the Digital Office',`<p class="lede">Switch between employees and explore the shared conversation, tasks, analytics and voice features.</p><a class="btn primary" href="office-demo.html">Open the interactive Office</a><p>Works in a browser on desktop and mobile.</p>`)+
section('Connected work','Channels meet in one place',cards([['Customer channels','Website, Telegram and email.'],['Business systems','CRM and calendar.'],['One office','Shared context, tasks, documents and results.']]))));

const priceRows = [
['Personal AI employee','from $600 / €520','from $300 / €260 per month after launch. A permanent mini-office, one configured AI employee, knowledge, documents, memory, email, web access, 1–2 channels, tasks, spreadsheets, reminders and reports.'],
['Extended mini-office / AI website','from $1,100 / €950','A broader web interface and processes. Connecting AI to an existing website starts at $550 / €470.'],
['Business processes and team','from $1,450 / €1,250','For a new managed product starting at $600 / €520, ongoing support starts from $300 / €260 per month. Administration, sales, support, voice, several roles and a Digital Office.'],
['Live web realtime','$0.30 / €0.26 per minute','Connection from $180 / €155; billed for actual conversation minutes.'],
['AI phone','$0.30 / €0.26 per minute + operator/number','Connection from $550 / €470 outside Voice; infrastructure from $60 / €50 per month.']
];
fs.writeFileSync(path.join(enDir,'pricing.html'), page('pricing','AI Employee Implementation Pricing — ARCH_AI','Current ARCH_AI implementation and managed-service pricing guidelines.',hero('Pricing for a real task','Pricing','Guidelines for standard implementation managed by ARCH_AI. The final estimate depends on channels, integrations and workload.'),
section('A clear path','from $600 / €520 → expansion → business',`<div class="grid-3">${priceRows.map(([h,p,d])=>`<article class="glass-card"><h3>${h}</h3><strong>${p}</strong><p>${d}</p></article>`).join('')}</div><p class="lede">Standard text API and regular TTS voice responses are included in support from $300 / €260 per month at normal working load. Realtime, phone service, external CRM and integrations with business systems, new roles and complex integrations are priced separately. The final cost depends on the selected models, the volume of text and voice interactions, the number of channels, and integrations.</p>`)+
section('Delivery format','Three models',cards([['Managed by ARCH_AI','We host, monitor, update and operate the system.'],['Dedicated environment','A separate client environment managed by ARCH_AI.'],['Full handover','System, documentation and control move to the client environment.']]))));

for (const [key,title,desc,heading,text] of [
  ['privacy','Privacy Policy — ARCH_AI','ARCH_AI privacy policy.','Privacy Policy','The final legal text will be added once the approved version is provided.'],
  ['terms','Terms of Use — ARCH_AI','ARCH_AI terms of use.','Terms of Use','The final legal text will be added once the approved version is provided.']
]) fs.writeFileSync(path.join(enDir,`${key}.html`),page(key,title,desc,hero('Documents',heading,text,'Talk to Vik'),''));

fs.writeFileSync(path.join(enDir,'office-demo.html'), page('office-demo','ARCH_AI Office — Interactive Demo','An interactive, synthetic-data demonstration of the ARCH_AI Digital Office.',hero('Interactive demonstration','ARCH_AI Digital Office','Explore a safe browser demo of a shared AI workspace. No messages are sent, no files are uploaded and no real customer data is used.','Talk to Vik'),
section('A live team workspace','See how roles work together',cards([['Team conversation','A shared thread lets employees hand work to one another while keeping the task context.'],['Work and CRM','Synthetic example requests, tasks, documents, owners, statuses and next actions.'],['Analytics','A separate layer for indicators, trends, workload and items that require a decision.']]))+
section('Safe demonstration','No production data or actions',`<p class="lede">All customers, events, documents and metrics shown here are fictional. The demo does not connect to real clients, mail, calls, contracts or payments.</p>`)));

// Legacy public aliases keep their redirect behaviour in English.
for (const [name,target,label] of [['abilities','partner.html','Additional capabilities'],['coauthor','partner.html#content','Content and audience'],['project','partner.html','Personal brand']]) {
  fs.writeFileSync(path.join(enDir,`${name}.html`),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${label} — ARCH_AI</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://iarch.ai/en/${target}"><link rel="alternate" hreflang="en" href="https://iarch.ai/en/${name}.html"><link rel="alternate" hreflang="ru" href="https://iarch.ai/${name}.html"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace('${target}')</script></head><body><p>This section is now part of <a href="${target}">AI Employee Development</a>.</p></body></html>`);
}

fs.writeFileSync(path.join(enDir,'404.html'),page('index','Page Not Found — ARCH_AI','The requested ARCH_AI page could not be found.',hero('404','Page not found','This route does not exist yet.','Return home'),''));

const publicPages = ['index.html','companion.html','partner.html','ai-sites.html','digital-office.html','pricing.html','privacy.html','terms.html','office-demo.html','404.html'];
for (const file of publicPages) {
  const filePath = path.join(publicDir,file);
  let html = fs.readFileSync(filePath,'utf8');
  const key = file === 'index.html' ? 'index' : file.replace('.html','');
  const ruUrl = key === 'index' ? 'https://iarch.ai/' : `https://iarch.ai/${file}`;
  const enUrl = `https://iarch.ai/en/${key === 'index' ? '' : file}`;
  if (!html.includes('rel="canonical"')) html = html.replace('</title>', `</title>\n<link rel="canonical" href="${ruUrl}">`);
  if (!html.includes('hreflang="en"')) html = html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n    <link rel="alternate" hreflang="ru" href="${ruUrl}" />\n    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${ruUrl}" />`);
  if (!html.includes('class="language-switcher"')) html = html.replace(/(<a class="header-cta")/, `<div class="language-switcher" aria-label="Язык"><a class="is-active" href="${key === 'index' ? 'index.html' : file}" lang="ru" hreflang="ru" aria-current="page">RU</a><span aria-hidden="true">/</span><a href="en/${key === 'index' ? 'index.html' : file}" lang="en" hreflang="en">EN</a></div>$1`);
  if (!html.includes('class="language-switcher"')) html = html.replace(/<body([^>]*)>/, `<body$1><div class="language-switcher language-switcher-floating" aria-label="Язык"><a class="is-active" href="${key === 'index' ? 'index.html' : file}" lang="ru" hreflang="ru" aria-current="page">RU</a><span aria-hidden="true">/</span><a href="en/${key === 'index' ? 'index.html' : file}" lang="en" hreflang="en">EN</a></div>`);
  fs.writeFileSync(filePath,html);
}

for (const [file,target] of [['abilities.html','partner.html'],['coauthor.html','partner.html#content'],['project.html','partner.html']]) {
  const filePath=path.join(publicDir,file); let html=fs.readFileSync(filePath,'utf8');
  if (!html.includes('hreflang="en"')) html=html.replace(/(<link rel="canonical"[^>]*>)/,`$1<link rel="alternate" hreflang="ru" href="https://iarch.ai/${file}"><link rel="alternate" hreflang="en" href="https://iarch.ai/en/${file}">`);
  if (!html.includes('language-switcher')) html=html.replace('<body>',`<body><div class="language-switcher language-switcher-floating" aria-label="Язык"><a class="is-active" href="${file}" lang="ru">RU</a><span>/</span><a href="en/${file}" lang="en">EN</a></div>`);
  fs.writeFileSync(filePath,html);
}

for (const cssPath of [path.join(publicDir,'assets/business.css'),path.join(root,'assets/business.css'),path.join(publicDir,'assets/styles.css'),path.join(root,'assets/styles.css'),path.join(publicDir,'assets/office-demo.css'),path.join(root,'assets/office-demo.css')]) {
  let css=fs.readFileSync(cssPath,'utf8');
  if (!css.includes('.language-switcher{')) css += `\n.language-switcher{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;letter-spacing:.08em;white-space:nowrap}.language-switcher a{color:var(--muted);text-decoration:none}.language-switcher a:hover,.language-switcher a.is-active{color:#fff}.language-switcher span{opacity:.35}.language-switcher-floating{position:fixed;z-index:1000;top:12px;right:12px;padding:8px 10px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(3,7,18,.86);backdrop-filter:blur(10px)}@media(max-width:900px){.language-switcher{margin-left:auto}.header-cta{display:none}}\n`;
  fs.writeFileSync(cssPath,css);
}

// Keep English quick prompts English while preserving the Russian experience.
for (const jsPath of [path.join(publicDir,'assets/app.js'),path.join(root,'assets/app.js')]) {
  let js=fs.readFileSync(jsPath,'utf8');
  if (!js.includes('const isEnglishPage =')) {
    js=js.replace('const phrases = {',`const isEnglishPage = document.documentElement.lang === "en";\nconst englishPhrases = {\n  administrator: "I need an AI administrator to handle enquiries, requests and appointments. Where should I start?",\n  seller: "I need an AI sales representative for qualification and follow-up. Help me define the first scenario.",\n  service: "I want to improve service for existing customers with AI. Help me choose the role and channels.",\n  routine: "I want to automate repetitive business work. Help me find the best first process.",\n  start: "I am not sure which AI employee I need. Ask me a few questions and help me decide.",\n};\nconst phrases = {`);
    js=js.replace('const typingText =\n  "Расскажите, где бизнес теряет время или клиентов — я помогу найти первую роль для AI.";',`const typingText = isEnglishPage\n  ? "Tell me where your business loses time or customers — I’ll help identify the first AI role."\n  : "Расскажите, где бизнес теряет время или клиентов — я помогу найти первую роль для AI.";`);
  }
  js=js.replace('const text = phrases[button.dataset.prompt] || button.textContent.trim();','const text = (isEnglishPage ? englishPhrases : phrases)[button.dataset.prompt] || button.textContent.trim();');
  fs.writeFileSync(jsPath,js);
}

let sitemap = fs.readFileSync(path.join(publicDir,'sitemap.xml'),'utf8');
if (!sitemap.includes('/en/')) sitemap = sitemap.replace('</urlset>',Object.values(routes).map(slug=>`  <url><loc>https://iarch.ai/en/${slug}</loc></url>`).join('\n')+'\n</urlset>');
fs.writeFileSync(path.join(publicDir,'sitemap.xml'),sitemap);
fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap);

console.log('English site generated in public/en');
