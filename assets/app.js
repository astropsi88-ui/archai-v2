const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const phrases={companion:'Хочу создать своего AI-компаньона. Помоги понять, каким он должен быть и что сможет делать.',partner:'Мне нужен личный AI-напарник для работы, задач и процессов. Помоги продумать его возможности.',coauthor:'Хочу создать цифрового соавтора, который понимает мои идеи, материалы и авторский голос.',project:'Хочу создать цифрового представителя проекта с собственным образом, голосом и характером.',start:'Я пока не знаю, какой вариант мне нужен. Задай мне несколько вопросов и помоги определиться.'};
const typingText='Напишите Вику, кого вы хотите создать — или выберите один из вариантов ниже.';
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
function sizeVikMessage(){const field=$('[data-vik-message]');if(!field)return;field.style.height='auto';field.style.height=`${Math.min(field.scrollHeight,112)}px`}
async function sendToVik(message){
  sessionStorage.setItem('archaiPendingMessage',message);
  const telegramWindow=window.open('https://t.me/AI_VIK_dialog','_blank','noopener');
  if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(message)}catch(e){}}
  return {popupOpened:Boolean(telegramWindow)};
}
const vikForm=$('[data-vik-form]'),vikMessage=$('[data-vik-message]'),vikStatus=$('[data-vik-status]'),vikCompose=$('[data-vik-compose]');
function setVikStatus(text){if(vikStatus)vikStatus.textContent=text}
function syncVikCompose(){if(!vikMessage||!vikCompose)return;vikCompose.classList.toggle('is-idle',!vikMessage.value&&!document.activeElement.isSameNode(vikMessage))}
vikMessage?.addEventListener('input',()=>{sizeVikMessage();syncVikCompose()});
vikMessage?.addEventListener('focus',syncVikCompose);
vikMessage?.addEventListener('blur',syncVikCompose);
vikMessage?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();vikForm?.requestSubmit()}});
vikForm?.addEventListener('submit',async e=>{e.preventDefault();const message=vikMessage?.value.trim();if(!message){vikMessage?.focus();return}const result=await sendToVik(message);setVikStatus(result.popupOpened?'Сообщение сохранено. Отправьте его Вику в Telegram.':'Сообщение сохранено. Откройте Telegram Вика и вставьте его в чат.')});
$$('.tag[data-prompt]').forEach(button=>button.addEventListener('click',()=>{const text=phrases[button.dataset.prompt]||button.textContent.trim();if(vikMessage){vikMessage.value=text;sizeVikMessage();syncVikCompose();vikMessage.focus();vikMessage.setSelectionRange(vikMessage.value.length,vikMessage.value.length)}sessionStorage.setItem('archaiPrompt',text)}));
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.18});
  $$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%7*70,420)}ms`;io.observe(el)});
}else{$$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach(el=>el.classList.add('revealed'))}
$$('.card,.price-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--x',`${e.clientX-r.left}px`);el.style.setProperty('--y',`${e.clientY-r.top}px`)}));
const schemaNotes={memory:'Память — хранит контекст, материалы и общую историю владельца с цифровой личностью.',character:'Характер — задаёт роль, тон, ритм и узнаваемую манеру общения.',infra:'Инфраструктура — связывает личность с нужными каналами, файлами и рабочими средами.',server:'Сервер — даёт техническую основу для стабильной работы и развития.',backup:'Бэкапы — защищают историю, настройки и материалы от потери.',connection:'Связь — помогает жить в Telegram, на сайте и в других выбранных каналах.',abilities:'Способности — подключают задачи, действия, автоматизации и рабочие сценарии.',ownership:'Собственность — предусматривает передачу владельцу вместе с памятью и материалами.'};
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
function updateSchemaGeometry(){const root=$('[data-schema]'),core=$('.orbit-core'),svg=$('.schema-lines');if(!root||!core||!svg)return;const rootBox=root.getBoundingClientRect();const centerOf=el=>{const r=el.getBoundingClientRect();return{x:r.left-rootBox.left+r.width/2,y:r.top-rootBox.top+r.height/2}};const corePoint=centerOf(core);const width=Math.max(root.clientWidth,1),height=Math.max(root.clientHeight,1);svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('width',width);svg.setAttribute('height',height);$$('.orbit-node',root).forEach(node=>{const line=$(`.schema-lines [data-line="${node.dataset.node}"]`,root);if(!line)return;const p=centerOf(node);line.setAttribute('d',`M${corePoint.x.toFixed(1)} ${corePoint.y.toFixed(1)} L${p.x.toFixed(1)} ${p.y.toFixed(1)}`)});const cross=$$('.schema-lines .cross',root),nodes=$$('.orbit-node',root);if(cross[0]&&nodes[7]&&nodes[1]){const a=centerOf(nodes[7]),b=centerOf(nodes[1]);cross[0].setAttribute('d',`M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${(a.x+90).toFixed(1)} ${(a.y+35).toFixed(1)} ${(b.x-90).toFixed(1)} ${(b.y+35).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`)}if(cross[1]&&nodes[5]&&nodes[3]){const a=centerOf(nodes[5]),b=centerOf(nodes[3]);cross[1].setAttribute('d',`M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${(a.x+90).toFixed(1)} ${(a.y-35).toFixed(1)} ${(b.x-90).toFixed(1)} ${(b.y-35).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`)}}
window.addEventListener('DOMContentLoaded',()=>{updateSchemaGeometry();sizeVikMessage();syncVikCompose()});window.addEventListener('resize',updateSchemaGeometry);window.addEventListener('orientationchange',()=>setTimeout(updateSchemaGeometry,120));if(document.readyState!=='loading'){updateSchemaGeometry();sizeVikMessage();syncVikCompose()}
