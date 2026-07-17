(()=>{
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const companionTyping=$('[data-companion-typing]');
  if(companionTyping){
    companionTyping.classList.add('typing');
    const text='Напишите Вику';
    if(reduced)companionTyping.textContent=text;
    else (async()=>{while(companionTyping.isConnected){companionTyping.textContent='';for(const char of text){companionTyping.textContent+=char;await new Promise(resolve=>setTimeout(resolve,44))}await new Promise(resolve=>setTimeout(resolve,1400));for(let i=text.length;i>=0;i--){companionTyping.textContent=text.slice(0,i);await new Promise(resolve=>setTimeout(resolve,22))}await new Promise(resolve=>setTimeout(resolve,700))}})();
  }

  const foundationCopy={
    memory:'Сохраняет индивидуальную манеру общения, важный контекст и накопленную историю отношений с владельцем.',
    support:'Помогает проговорить личную ситуацию, разобраться в чувствах и повторяющихся реакциях, увидеть возможные варианты и найти внутреннюю опору.',
    voice:'Принимает текстовые и голосовые сообщения и отвечает текстом или голосом в настроенной манере.',
    space:'Работает с подключёнными документами, облачными файлами, Google Workspace и другими сервисами, которыми пользуется владелец.',
    analysis:'Ищет информацию, сопоставляет источники, разбирает материалы и готовит понятные выводы.',
    creation:'Создаёт тексты, документы, таблицы, планы, презентации и другие готовые материалы.',
    routine:'Самостоятельно выполняет повторяющиеся задачи, готовит сводки, проверяет условия и возвращается с результатом.',
    environment:'Работает в отдельной серверной среде, размещённой на аккаунте владельца или в инфраструктуре ArchAI.',
    transfer:'Личность, память, настройки и конфигурация способностей регулярно сохраняются и могут быть перенесены на другую инфраструктуру.'
  };
  const foundation=$('[data-foundation-map]');let foundationIndex=0,foundationPauseUntil=0;
  function drawFoundationLines(){if(!foundation||innerWidth<=760)return;const svg=$('.foundation-lines',foundation),core=$('.foundation-core',foundation);if(!svg||!core)return;const root=foundation.getBoundingClientRect(),c=core.getBoundingClientRect(),cx=c.left-root.left+c.width/2,cy=c.top-root.top+c.height/2;svg.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);svg.innerHTML='';$$('[data-foundation]',foundation).forEach(node=>{const n=node.getBoundingClientRect(),line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',cx);line.setAttribute('y1',cy);line.setAttribute('x2',n.left-root.left+n.width/2);line.setAttribute('y2',n.top-root.top+n.height/2);line.dataset.foundationLine=node.dataset.foundation;svg.append(line)})}
  function setFoundation(key,{manual=false}={}){if(!foundation||!foundationCopy[key])return;const nodes=$$('[data-foundation]',foundation);foundationIndex=Math.max(0,nodes.findIndex(node=>node.dataset.foundation===key));nodes.forEach(node=>node.setAttribute('aria-selected',String(node.dataset.foundation===key)));$$('[data-foundation-line]',foundation).forEach(line=>{const active=line.dataset.foundationLine===key;line.classList.toggle('active',active);line.classList.toggle('pulse',active)});const node=$(`[data-foundation="${key}"]`,foundation);$('[data-foundation-label]',foundation).textContent=node.textContent.trim();$('[data-foundation-copy]',foundation).textContent=foundationCopy[key];if(manual)foundationPauseUntil=Date.now()+9000}
  $$('[data-foundation]',foundation).forEach((node,index)=>{node.addEventListener('click',()=>setFoundation(node.dataset.foundation,{manual:true}));node.addEventListener('pointerenter',()=>setFoundation(node.dataset.foundation,{manual:true}));node.addEventListener('focus',()=>setFoundation(node.dataset.foundation,{manual:true}));node.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();const nodes=$$('[data-foundation]',foundation),delta=['ArrowRight','ArrowDown'].includes(event.key)?1:-1,next=(index+delta+nodes.length)%nodes.length;nodes[next].focus()})});

  const process=$('[data-creation-process]');let processIndex=0,processPauseUntil=0;
  function setProcess(index,{manual=false}={}){if(!process)return;processIndex=index;$$('[data-process-step]',process).forEach((item,i)=>{item.classList.toggle('active',i<=index);item.classList.toggle('auto-active',i===index)});const progress=$('.process-track i',process);if(innerWidth<=760)progress.style.height=`${Math.max(18,index/5*100)}%`;else progress.style.width=`${Math.max(18,index/5*100)}%`;if(manual)processPauseUntil=Date.now()+9000}
  $$('[data-process-step]',process).forEach(step=>step.addEventListener('click',()=>setProcess(Number(step.dataset.processStep),{manual:true})));

  $$('[data-chat-focus]').forEach(link=>link.addEventListener('click',()=>requestAnimationFrame(()=>setTimeout(()=>{const field=$('[data-vik-message]');field?.focus();field?.setSelectionRange(field.value.length,field.value.length)},450))));
  const introMedia=$('[data-companion-intro-media]'),introVideo=$('[data-companion-intro-video]',introMedia);
  if(introMedia&&introVideo){
    let started=false;
    const syncIntroVideo=()=>{const playing=!introVideo.paused&&!introVideo.ended;introMedia.classList.toggle('is-started',started);introMedia.classList.toggle('is-playing',playing);introMedia.setAttribute('aria-label',playing?'Поставить видео с Виком на паузу':introVideo.ended?'Запустить видео с Виком снова':'Воспроизвести видео с Виком')};
    const toggleIntroVideo=async()=>{if(!introVideo.paused){introVideo.pause();return}if(!started||introVideo.ended)introVideo.currentTime=0;introVideo.muted=false;introVideo.volume=1;try{await introVideo.play();started=true;syncIntroVideo()}catch{syncIntroVideo()}};
    introMedia.addEventListener('click',toggleIntroVideo);
    introMedia.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleIntroVideo()}});
    introVideo.addEventListener('play',()=>{started=true;syncIntroVideo()});introVideo.addEventListener('pause',syncIntroVideo);introVideo.addEventListener('ended',()=>{started=false;syncIntroVideo()});syncIntroVideo();
  }

  $$('[data-wide-accordion]').forEach(group=>{
    const buttons=$$('.accordion-item>h3>button',group);
    const setOpen=(button,open)=>{const item=button.closest('.accordion-item'),panel=$(`#${button.getAttribute('aria-controls')}`);button.setAttribute('aria-expanded',String(open));item?.classList.toggle('is-open',open);panel?.setAttribute('aria-hidden',String(!open))};
    buttons.forEach((button,index)=>{
      button.addEventListener('click',()=>{const opening=button.getAttribute('aria-expanded')!=='true';buttons.forEach(other=>setOpen(other,false));if(opening)setOpen(button,true)});
      button.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus()});
    });
  });

  if('IntersectionObserver' in window&&!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});$$('[data-comp-reveal]').forEach(item=>observer.observe(item))}else{$$('[data-comp-reveal]').forEach(item=>item.classList.add('is-visible'))}
  if(!reduced&&'IntersectionObserver' in window){
    const cycles=[
      {root:foundation,delay:4500,tick:()=>{if(Date.now()<foundationPauseUntil)return;const nodes=$$('[data-foundation]',foundation);if(nodes.length){foundationIndex=(foundationIndex+1)%nodes.length;setFoundation(nodes[foundationIndex].dataset.foundation)}}},
      {root:process,delay:2800,tick:()=>{if(Date.now()<processPauseUntil)return;setProcess((processIndex+1)%6)}}
    ];
    const cycleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{const cycle=cycles.find(item=>item.root===entry.target);if(!cycle)return;if(entry.isIntersecting&&!document.hidden&&!cycle.timer)cycle.timer=setInterval(cycle.tick,cycle.delay);else if(!entry.isIntersecting&&cycle.timer){clearInterval(cycle.timer);cycle.timer=null}}),{threshold:.18});
    cycles.forEach(cycle=>cycle.root&&cycleObserver.observe(cycle.root));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cycles.forEach(cycle=>{clearInterval(cycle.timer);cycle.timer=null})});
  }
  const tilt=$('[data-comp-tilt] .video-frame');if(tilt&&!reduced&&matchMedia('(pointer: fine)').matches){tilt.parentElement.addEventListener('pointermove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateX(${-y*2.5}deg) rotateY(${x*3.5}deg)`});tilt.parentElement.addEventListener('pointerleave',()=>tilt.style.transform='')}
  setFoundation('memory');setProcess(0);
  let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{drawFoundationLines();setFoundation($('[data-foundation][aria-selected="true"]',foundation)?.dataset.foundation||'memory')},80)});addEventListener('load',drawFoundationLines);if(document.readyState!=='loading')drawFoundationLines();
})();
