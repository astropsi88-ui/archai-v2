const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const phrases={companion:'Хочу создать личного AI с характером, памятью и общей историей. Помоги понять, каким он должен быть.',partner:'Хочу развить моего AI для работы, проектов, документов и клиентов. Помоги продумать нужные подключения.',coauthor:'Хочу развить моего AI для творчества, контента, постинга и общения с аудиторией.',project:'Хочу создать личность проекта с собственным образом, голосом, памятью и публичной ролью.',start:'Я пока не знаю, какой вариант мне нужен. Задай мне несколько вопросов и помоги определиться.'};
const typingText='Расскажите, каким должен стать ваш AI — или выберите одну из ролей ниже.';
const vikConversationStorageKey='vikSiteConversationId';
function setChatActive(active=true){document.body.classList.toggle('chat-active',active)}
setChatActive(Boolean(sessionStorage.getItem(vikConversationStorageKey)));
const telegramContinueButtons=$$('[data-vik-telegram-continue]');
function setTelegramContinueVisible(visible){telegramContinueButtons.forEach(button=>{button.hidden=!visible})}
setTelegramContinueVisible(Boolean(sessionStorage.getItem(vikConversationStorageKey)));
const heroTitle=$('.home-page .hero h1');
if(heroTitle){heroTitle.textContent='AI с характером, памятью и общей историей';heroTitle.style.fontFamily='"Onest",Inter,system-ui,sans-serif'}
const heroEyebrow=$('.home-page .hero .eyebrow');
if(heroEyebrow){heroEyebrow.style.fontFamily='"Onest",Inter,system-ui,sans-serif';heroEyebrow.style.fontWeight='600';heroEyebrow.style.letterSpacing='.045em';heroEyebrow.style.textTransform='none'}
$$('.nav-more').forEach(item=>{item.innerHTML='<a href="abilities.html">Дополнительно</a>'});
const companionCardTitle=$('.product-card[href="companion.html"] h3');
if(companionCardTitle)companionCardTitle.textContent='Личный AI-компаньон';
const coauthorCardLast=$('.product-card[href="coauthor.html"] li:last-child');
if(coauthorCardLast)coauthorCardLast.textContent='планирует публикации, размещает материалы и помогает отвечать аудитории.';
function typeLoop(el,text){
  if(!el)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=text;return}
  let i=0;
  const tick=()=>{
    el.textContent=text.slice(0,i);
    if(i<text.length){i++;setTimeout(tick,58);return}
    setTimeout(()=>{el.textContent='';i=0;setTimeout(tick,360)},1750);
  };
  tick();
}
typeLoop($('.typing'),typingText);
$$('.typing').slice(1).forEach(el=>typeLoop(el,'Расскажите, каким должен быть ваш AI.'));
function sizeVikMessage(field){if(!field)return;field.style.height='auto';field.style.height=`${Math.min(field.scrollHeight,112)}px`}
const siteForms=$$('[data-vik-site-form]');
const vikChatMessages=$$('[data-vik-chat-messages]');
function setVikStatus(text){siteForms.forEach(form=>{const status=$('[data-vik-status]',form);if(status)status.textContent=text})}
function addChatMessage(role,text,{pending=false,error=false}={}){
  return vikChatMessages.map(container=>{const item=document.createElement('div');item.className=`vik-chat-message is-${role}${pending?' is-pending':''}${error?' is-error':''}`;item.textContent=text;container.append(item);container.scrollTop=container.scrollHeight;return item});
}
function updateChatMessages(items,text,{error=false}={}){items.forEach(item=>{item.classList.remove('is-pending');item.classList.toggle('is-error',error);item.textContent=text})}
function setChatDisabled(disabled){siteForms.forEach(form=>{const field=$('[data-vik-message]',form),button=$('.vik-send',form);if(field)field.disabled=disabled;if(button)button.disabled=disabled})}
function initVikSiteForm(form){
  const field=$('[data-vik-message]',form),compose=$('[data-vik-compose]',form);
  if(!field||!compose)return;
  const sync=()=>compose.classList.toggle('is-idle',!field.value&&document.activeElement!==field);
  field.addEventListener('input',()=>{sizeVikMessage(field);sync()});
  field.addEventListener('focus',sync);
  field.addEventListener('blur',sync);
  field.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const message=field.value.trim();
    if(!message){field.focus();return}
    setChatActive();
    const sensitiveCandidate=/(?:светочк|светлана\s+итаф|владель|секретн.{0,12}фраз)/iu.test(message.normalize('NFC'));
    const userItems=sensitiveCandidate?[]:addChatMessage('user',message);
    const pending=addChatMessage('assistant','Вик думает…',{pending:true});
    field.value='';sizeVikMessage(field);sync();
    setChatDisabled(true);setVikStatus('Вик готовит ответ.');
    try{
      const conversationId=sessionStorage.getItem(vikConversationStorageKey);
      const response=await fetch('/api/vik-site/chat',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,...(conversationId?{conversationId}:{})})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.error||`http_${response.status}`);
      if(data.inputConsumed)userItems.forEach(item=>item.remove());
      if(data.conversationId){sessionStorage.setItem(vikConversationStorageKey,data.conversationId);setTelegramContinueVisible(true)}
      updateChatMessages(pending,data.message?.content||'Я рядом. Попробуйте ещё раз.');
      setVikStatus('Ответ получен.');
    }catch(error){
      const text=error.message==='rate_limited'?'Слишком быстро 🙂 Дайте мне минутку и напишите ещё раз.':'Я споткнулся на ответе. Попробуйте ещё раз чуть позже.';
      updateChatMessages(pending,text,{error:true});setVikStatus('Не удалось получить ответ.');
    }finally{setChatDisabled(false);field.focus()}
  });
  sizeVikMessage(field);sync();
}
siteForms.forEach(initVikSiteForm);
function makeTelegramWebUrl(link){
  const url=new URL(link);
  if(!['t.me','www.t.me','telegram.me','www.telegram.me'].includes(url.hostname))throw new Error('invalid_telegram_link');
  const username=url.pathname.split('/').filter(Boolean)[0];
  if(!username||!/^[A-Za-z0-9_]+$/.test(username))throw new Error('invalid_telegram_username');
  const params=new URLSearchParams({domain:username});
  const start=url.searchParams.get('start');
  if(start)params.set('start',start);
  return `https://web.telegram.org/k/#?tgaddr=${encodeURIComponent(`tg://resolve?${params}`)}`;
}
telegramContinueButtons.forEach(button=>button.addEventListener('click',async()=>{
  const conversationId=sessionStorage.getItem(vikConversationStorageKey);
  if(!conversationId)return;
  telegramContinueButtons.forEach(item=>{item.disabled=true});
  setVikStatus('Создаю безопасный переход в Telegram.');
  try{
    const response=await fetch('/api/vik-site/telegram-link',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({conversationId})});
    const data=await response.json().catch(()=>({}));
    if(!response.ok||typeof data.url!=='string')throw new Error(data.error||`http_${response.status}`);
    const webLink=makeTelegramWebUrl(data.url);
    data.url=null;
    window.location.assign(webLink);
  }catch{
    setVikStatus('Не удалось создать переход. Попробуйте ещё раз.');
    telegramContinueButtons.forEach(item=>{item.disabled=false});
  }
}));
const vikMessage=$('[data-vik-message]',siteForms[0]);
const vikCompose=$('[data-vik-compose]',siteForms[0]);
function syncVikCompose(){if(vikMessage&&vikCompose)vikCompose.classList.toggle('is-idle',!vikMessage.value&&document.activeElement!==vikMessage)}
$$('.tag[data-prompt]').forEach(button=>button.addEventListener('click',()=>{const text=phrases[button.dataset.prompt]||button.textContent.trim();if(vikMessage){vikMessage.value=text;sizeVikMessage(vikMessage);syncVikCompose();vikMessage.focus();vikMessage.setSelectionRange(vikMessage.value.length,vikMessage.value.length)}sessionStorage.setItem('archaiPrompt',text)}));
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.18});
  $$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%7*70,420)}ms`;io.observe(el)});
}else{$$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach(el=>el.classList.add('revealed'))}
$$('.card,.price-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--x',`${e.clientX-r.left}px`);el.style.setProperty('--y',`${e.clientY-r.top}px`)}));
const schemaNotes={memory:'Супербаза — живая память о людях, событиях, разговорах, проектах и накопленном опыте.',character:'Характер — сохраняет узнаваемую манеру общения, ритм, привычки и отношение к владельцу.',infra:'Мозг — AI-модель, которая думает, анализирует, пишет, видит и использует инструменты. Её можно обновлять.',server:'Сервер — личное пространство, где работают память, подключения и выбранные открытые решения.',backup:'Капсула — сохраняет характер, ключевые знания, важную память и общую историю для продолжения.',connection:'Связь — позволяет вашему AI присутствовать в Telegram, на сайте и в других выбранных средах.',abilities:'Способности — почта, календарь, документы, поиск, изображения, видео и другие нужные действия.',ownership:'Собственность — основа вашего AI, память, материалы и настройки могут быть переданы владельцу.'};
function setSchemaNode(key){const root=$('[data-schema]'),note=$('#schema-note');if(!root||!schemaNotes[key])return;$$('.orbit-node',root).forEach(n=>n.classList.toggle('active',n.dataset.node===key));$$('.schema-lines path',root).forEach(line=>line.classList.toggle('active',line.dataset.line===key));if(note)note.textContent=schemaNotes[key]}
$$('.orbit-node').forEach(node=>{node.addEventListener('pointerenter',()=>setSchemaNode(node.dataset.node));node.addEventListener('focus',()=>setSchemaNode(node.dataset.node));node.addEventListener('click',()=>setSchemaNode(node.dataset.node))});
setSchemaNode('memory');
const siteHeader=$('.site-header'),menuToggle=$('.menu-toggle'),moreToggle=$('.nav-more-toggle'),moreMenu=$('.nav-more-menu');
function closeMore({restoreFocus=false}={}){moreToggle?.setAttribute('aria-expanded','false');moreMenu?.classList.remove('open');if(restoreFocus)moreToggle?.focus()}
function openMore(){moreToggle?.setAttribute('aria-expanded','true');moreMenu?.classList.add('open')}
moreToggle?.addEventListener('click',e=>{e.stopPropagation();moreToggle.getAttribute('aria-expanded')==='true'?closeMore():openMore()});
moreMenu?.addEventListener('keydown',e=>{const items=$$('a',moreMenu),i=items.indexOf(document.activeElement);if(e.key==='ArrowDown'){e.preventDefault();items[(i+1+items.length)%items.length]?.focus()}if(e.key==='ArrowUp'){e.preventDefault();items[(i-1+items.length)%items.length]?.focus()}});
function closeMenu({restoreFocus=false}={}){if(!siteHeader||!menuToggle)return;siteHeader.classList.remove('menu-open');menuToggle.setAttribute('aria-expanded','false');closeMore();if(restoreFocus)menuToggle.focus()}
function openMenu(){if(!siteHeader||!menuToggle)return;siteHeader.classList.add('menu-open');menuToggle.setAttribute('aria-expanded','true')}
menuToggle?.addEventListener('click',()=>siteHeader?.classList.contains('menu-open')?closeMenu():openMenu());
document.addEventListener('click',e=>{if(!e.target.closest('.nav-more'))closeMore()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(moreToggle?.getAttribute('aria-expanded')==='true')closeMore({restoreFocus:true});else if(siteHeader?.classList.contains('menu-open'))closeMenu({restoreFocus:true})}});
$$('.site-header a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
matchMedia('(min-width: 961px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
function initBrainVideoCore(){
  const core=$('#abilities .orbit-core');
  if(!core)return;
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  core.style.cssText='width:clamp(156px,32vw,280px);height:clamp(156px,32vw,280px);min-height:0;border:0;border-radius:0;background:transparent;box-shadow:none;padding:0;overflow:visible;display:grid;place-items:center';
  core.innerHTML=`<video class="brain-video-core" ${reduceMotion?'':'autoplay'} muted loop playsinline preload="metadata" poster="https://iarch.ai/archai-assets/archai-brain-grok-square-loop-20260712.webp" aria-label="Живое ядро ArchAI" style="display:block;width:100%;height:100%;object-fit:cover;border:0;background:transparent;mix-blend-mode:screen;filter:drop-shadow(0 0 18px rgba(104,199,255,.55)) drop-shadow(0 0 38px rgba(154,92,255,.32));-webkit-mask-image:radial-gradient(ellipse at center,#000 58%,transparent 84%);mask-image:radial-gradient(ellipse at center,#000 58%,transparent 84%)"><source src="https://iarch.ai/archai-assets/archai-brain-grok-square-loop-20260712.webm" type="video/webm"><source src="https://iarch.ai/archai-assets/archai-brain-grok-square-loop-20260712-silent.mp4" type="video/mp4"></video>`;
  const video=$('.brain-video-core',core);
  if(reduceMotion)video?.pause();
}
initBrainVideoCore();
function updateSchemaGeometry(){const root=$('[data-schema]'),core=$('.orbit-core'),svg=$('.schema-lines');if(!root||!core||!svg)return;const rootBox=root.getBoundingClientRect();const centerOf=el=>{const r=el.getBoundingClientRect();return{x:r.left-rootBox.left+r.width/2,y:r.top-rootBox.top+r.height/2}};const corePoint=centerOf(core);const width=Math.max(root.clientWidth,1),height=Math.max(root.clientHeight,1);svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('width',width);svg.setAttribute('height',height);$$('.orbit-node',root).forEach(node=>{const line=$(`.schema-lines [data-line="${node.dataset.node}"]`,root);if(!line)return;const p=centerOf(node);const dx=p.x-corePoint.x,dy=p.y-corePoint.y,len=Math.hypot(dx,dy)||1,coreRadius=Math.min(core.offsetWidth||0,core.offsetHeight||0)*.42,start={x:corePoint.x+dx/len*coreRadius,y:corePoint.y+dy/len*coreRadius};line.setAttribute('d',`M${start.x.toFixed(1)} ${start.y.toFixed(1)} L${p.x.toFixed(1)} ${p.y.toFixed(1)}`)});const cross=$$('.schema-lines .cross',root),nodes=$$('.orbit-node',root);if(cross[0]&&nodes[7]&&nodes[1]){const a=centerOf(nodes[7]),b=centerOf(nodes[1]);cross[0].setAttribute('d',`M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${(a.x+90).toFixed(1)} ${(a.y+35).toFixed(1)} ${(b.x-90).toFixed(1)} ${(b.y+35).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`)}if(cross[1]&&nodes[5]&&nodes[3]){const a=centerOf(nodes[5]),b=centerOf(nodes[3]);cross[1].setAttribute('d',`M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${(a.x+90).toFixed(1)} ${(a.y-35).toFixed(1)} ${(b.x-90).toFixed(1)} ${(b.y-35).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`)}}
window.addEventListener('DOMContentLoaded',()=>{updateSchemaGeometry();sizeVikMessage(vikMessage);syncVikCompose()});window.addEventListener('resize',updateSchemaGeometry);window.addEventListener('orientationchange',()=>setTimeout(updateSchemaGeometry,120));if(document.readyState!=='loading'){updateSchemaGeometry();sizeVikMessage(vikMessage);syncVikCompose()}

function initProductCardTouchGlow(){
  const cards=$$('.home-page .product-grid .product-card');
  if(!cards.length)return;
  let glowTimer;
  const clearGlow=()=>cards.forEach(card=>card.classList.remove('is-touch-glow'));
  const scheduleClear=()=>{clearTimeout(glowTimer);glowTimer=setTimeout(clearGlow,180)};
  cards.forEach(card=>{
    card.addEventListener('touchstart',()=>{clearTimeout(glowTimer);cards.forEach(other=>{if(other!==card)other.classList.remove('is-touch-glow')});card.classList.add('is-touch-glow')},{passive:true});
    card.addEventListener('touchend',scheduleClear,{passive:true});
    card.addEventListener('touchcancel',scheduleClear,{passive:true});
  });
  window.addEventListener('pageshow',clearGlow);
  window.addEventListener('blur',clearGlow);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearGlow()});
}
initProductCardTouchGlow();

function initVikIntroVideo(){
  const media=$('[data-vik-intro-media]');
  if(!media)return;
  const video=$('[data-vik-intro-video]',media);
  if(!video)return;
  let started=false;
  const sync=()=>{
    media.classList.toggle('is-started',started);
    media.classList.toggle('is-playing',!video.paused&&!video.ended);
    media.setAttribute('aria-label',video.paused?'Воспроизвести видео с Виком':'Поставить видео с Виком на паузу');
  };
  const toggle=async()=>{
    if(!video.paused){video.pause();return}
    if(!started||video.ended)video.currentTime=0;
    video.muted=false;
    video.volume=1;
    try{await video.play();started=true;sync()}catch{started=false;sync()}
  };
  media.addEventListener('click',toggle);
  media.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle()}});
  video.addEventListener('play',()=>{started=true;sync()});
  video.addEventListener('pause',sync);
  video.addEventListener('ended',()=>{started=false;sync()});
  sync();
}
initVikIntroVideo();
