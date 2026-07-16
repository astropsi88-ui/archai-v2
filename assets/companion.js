(()=>{
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const abilities={
    personal:{you:'«Я запуталась и не понимаю, как поступить».',ai:'Помогает спокойно разобрать ситуацию, чувства, варианты и возможные последствия.',result:'Внимательный разговор и более ясный взгляд на происходящее.',note:'Психологическая и эмоциональная поддержка — не медицинское лечение и не экстренная помощь.'},
    voice:{you:'Отправляете голосовое сообщение в Telegram.',ai:'Понимает голосовую речь и отвечает текстом или голосом в настроенной под вас манере.',result:'Живое общение без необходимости всё печатать.',note:'В базовой версии настраиваются манера, ритм и формат голосовых ответов. Персональный премиальный голос, например через ElevenLabs, подключается отдельно.'},
    day:{you:'«Что у меня сегодня и что нельзя забыть?»',ai:'Проверяет контекст, напоминания и подключённый календарь.',result:'Понятный план дня и список важного.',note:''},
    file:{you:'Отправляете PDF, документ, таблицу, изображение или ссылку.',ai:'Читает материал, находит главное, сравнивает и отвечает на вопросы.',result:'Выводы, краткое содержание, таблица или готовый документ.',note:''},
    research:{you:'Просите найти информацию или сравнить варианты.',ai:'Собирает источники, проверяет факты и структурирует результат.',result:'Готовая сводка вместо десятков открытых вкладок.',note:''},
    material:{you:'Наговариваете идею или даёте черновик.',ai:'Превращает материал в письмо, пост, план, презентацию, таблицу или структурированный документ.',result:'Готовый материал для дальнейшей работы.',note:''},
    services:{you:'«Найди последнее письмо от…» или «Что у меня завтра?»',ai:'Обращается к подключённому сервису.',result:'Нужное письмо, расписание, краткий итог или созданное событие.',note:''},
    routine:{you:'Задаёте напоминание или повторяющийся сценарий.',ai:'Сам возвращается к задаче в нужное время или проверяет заданное условие.',result:'Напоминание, утренняя сводка, новости или результат наблюдения.',note:''}
  };
  const explorer=$('[data-ability-explorer]');
  function setAbility(key){if(!explorer||!abilities[key])return;const data=abilities[key];$$('[data-ability]',explorer).forEach(b=>b.setAttribute('aria-selected',String(b.dataset.ability===key)));$('[data-ability-you]',explorer).textContent=data.you;$('[data-ability-ai]',explorer).textContent=data.ai;$('[data-ability-result]',explorer).textContent=data.result;$('[data-ability-note]',explorer).textContent=data.note;const line=$('.ability-flow-line i',explorer);if(line){line.style.animation='none';requestAnimationFrame(()=>{line.style.animation=''})}}
  $$('[data-ability]',explorer).forEach((button,index)=>{button.addEventListener('click',()=>setAbility(button.dataset.ability));button.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const tabs=$$('[data-ability]',explorer),next=(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();setAbility(tabs[next].dataset.ability)})});

  const extensionCopy={posting:'Готовит и размещает согласованные публикации по заданному ритму и правилам проекта.',research:'Собирает большой массив источников, сопоставляет позиции и готовит проверяемый вывод.',clients:'Помогает вести обращения, сохранять контекст и подготавливать следующий шаг по каждому клиенту.',groups:'Собирает главное из нескольких чатов или командных потоков в одну понятную сводку.',voice:'Получает индивидуальный голос, визуальный образ и более выразительное публичное присутствие.',astro:'Использует профессиональные методы и материалы астропсихолога в специально настроенном контуре.',knowledge:'Работает с закрытыми отраслевыми материалами, архивами и структурированными знаниями.',workflows:'Выполняет цепочки действий в рабочих сервисах и возвращает готовый результат.',routes:'Одна задача и один контекст продолжаются между сайтом, Telegram, YouTube, каналами и другими подключёнными средами.'};
  const schema=$('[data-expansion]');
  function drawLines(){if(!schema)return;const svg=$('.expansion-lines',schema),core=$('.identity-core',schema);if(!svg||!core)return;const root=schema.getBoundingClientRect(),c=core.getBoundingClientRect(),cx=c.left-root.left+c.width/2,cy=c.top-root.top+c.height/2;svg.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);svg.innerHTML='';$$('[data-extension]',schema).forEach(node=>{const n=node.getBoundingClientRect(),x=n.left-root.left+n.width/2,y=n.top-root.top+n.height/2,line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',cx);line.setAttribute('y1',cy);line.setAttribute('x2',x);line.setAttribute('y2',y);line.dataset.line=node.dataset.extension;svg.append(line)})}
  function setExtension(key){if(!schema||!extensionCopy[key])return;$$('[data-extension]',schema).forEach(n=>n.classList.toggle('active',n.dataset.extension===key));$$('[data-line]',schema).forEach(n=>n.classList.toggle('active',n.dataset.line===key));const node=$(`[data-extension="${key}"]`,schema);$('[data-extension-label]',schema).textContent=node.textContent.trim();$('[data-extension-copy]',schema).textContent=extensionCopy[key]}
  $$('[data-extension]',schema).forEach(node=>{['click','pointerenter','focus'].forEach(event=>node.addEventListener(event,()=>setExtension(node.dataset.extension)))});setExtension('research');

  const process=$('[data-creation-process]');
  $$('[data-process-step]',process).forEach(step=>step.addEventListener('click',()=>{const index=Number(step.dataset.processStep);$$('[data-process-step]',process).forEach((item,i)=>item.classList.toggle('active',i<=index));const progress=$('.process-track i',process);if(innerWidth<=760)progress.style.height=`${Math.max(18,index/5*100)}%`;else progress.style.width=`${Math.max(18,index/5*100)}%`}));

  $$('[data-chat-focus]').forEach(link=>link.addEventListener('click',()=>requestAnimationFrame(()=>setTimeout(()=>{const field=$('[data-vik-message]');field?.focus();field?.setSelectionRange(field.value.length,field.value.length)},450))));
  $('[data-video-play]')?.addEventListener('click',()=>{const hint=$('[data-video-hint]');hint?.classList.add('is-active');if(hint)hint.textContent='Здесь будет настоящее видео Вика. Сейчас это честный визуальный макет будущего блока.'});

  $$('[data-wide-accordion]').forEach(group=>{
    const buttons=$$('.accordion-item>h3>button',group);
    const setOpen=(button,open)=>{const item=button.closest('.accordion-item'),panel=$(`#${button.getAttribute('aria-controls')}`);button.setAttribute('aria-expanded',String(open));item?.classList.toggle('is-open',open);panel?.setAttribute('aria-hidden',String(!open))};
    buttons.forEach((button,index)=>{
      button.addEventListener('click',()=>{const opening=button.getAttribute('aria-expanded')!=='true';buttons.forEach(other=>setOpen(other,false));if(opening)setOpen(button,true)});
      button.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus()});
    });
  });

  if('IntersectionObserver' in window&&!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});$$('[data-comp-reveal]').forEach(item=>observer.observe(item))}else{$$('[data-comp-reveal]').forEach(item=>item.classList.add('is-visible'))}
  const tilt=$('[data-comp-tilt] .video-frame');if(tilt&&!reduced&&matchMedia('(pointer: fine)').matches){tilt.parentElement.addEventListener('pointermove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateX(${-y*2.5}deg) rotateY(${x*3.5}deg)`});tilt.parentElement.addEventListener('pointerleave',()=>tilt.style.transform='')}
  let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(drawLines,80)});addEventListener('load',drawLines);if(document.readyState!=='loading')drawLines();
})();
