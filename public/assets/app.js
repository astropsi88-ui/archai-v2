const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const phrases={companion:'Хочу создать AI-компаньона, который будет рядом для жизни, дел и общей истории.',partner:'Хочу создать личного напарника для рабочих задач, проектов и процессов.',coauthor:'Хочу создать цифрового соавтора для текстов, сценариев и регулярного контента.',project:'Хочу создать цифровую личность проекта для Telegram и сайта.',start:'Не знаю, с чего начать. Помогите выбрать подходящую цифровую личность.'};
function typeLoop(el,text){
  if(!el)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=text;return}
  let i=0,mode='type',pause=0;
  setInterval(()=>{
    if(mode==='pause'){pause--;if(pause<=0)mode='erase';return}
    if(mode==='shortPause'){pause--;if(pause<=0)mode='type';return}
    el.textContent=text.slice(0,i);
    if(mode==='type'){
      if(i<text.length)i++;else{mode='pause';pause=16}
    }else if(i>0){i--}else{mode='shortPause';pause=5}
  },70);
}
typeLoop($('.typing'),'Напишите Вику своими словами, кого вы хотите создать…');
$$('.tag[data-prompt]').forEach(link=>link.addEventListener('click',()=>{sessionStorage.setItem('archaiPrompt',phrases[link.dataset.prompt]||link.textContent.trim())}));
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.18});
  $$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%7*70,420)}ms`;io.observe(el)});
}else{$$('.reveal,.card,.node,.price-card,.system-strip,.orbit-schema,.video-box').forEach(el=>el.classList.add('revealed'))}
$$('.card,.price-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--x',`${e.clientX-r.left}px`);el.style.setProperty('--y',`${e.clientY-r.top}px`)}));
const schemaNotes={memory:'Память — хранит контекст, материалы и общую историю владельца с цифровой личностью.',character:'Характер — задаёт роль, тон, ритм и узнаваемую манеру общения.',infra:'Инфраструктура — связывает личность с нужными каналами, файлами и рабочими средами.',server:'Сервер — даёт техническую основу для стабильной работы и развития.',backup:'Бэкапы — защищают историю, настройки и материалы от потери.',connection:'Связь — помогает жить в Telegram, на сайте и в других выбранных каналах.',abilities:'Способности — подключают задачи, действия, автоматизации и рабочие сценарии.',ownership:'Собственность — предусматривает передачу владельцу вместе с памятью и материалами.'};
function setSchemaNode(key){
  const root=$('[data-schema]'),note=$('#schema-note');
  if(!root||!schemaNotes[key])return;
  $$('.orbit-node',root).forEach(n=>n.classList.toggle('active',n.dataset.node===key));
  $$('.schema-lines path',root).forEach(line=>line.classList.toggle('active',line.dataset.line===key));
  if(note)note.textContent=schemaNotes[key];
}
$$('.orbit-node').forEach(node=>{
  node.addEventListener('pointerenter',()=>setSchemaNode(node.dataset.node));
  node.addEventListener('focus',()=>setSchemaNode(node.dataset.node));
  node.addEventListener('click',()=>setSchemaNode(node.dataset.node));
});
setSchemaNode('memory');
