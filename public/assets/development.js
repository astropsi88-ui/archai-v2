(()=>{
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact=matchMedia('(max-width: 800px)').matches;
  const heroVideo=$('[data-hero-video]'),soundToggle=$('[data-sound-toggle]'),heroMedia=$('[data-hero-media]');
  if(heroVideo&&soundToggle){
    const setSoundState=enabled=>{
      heroVideo.muted=!enabled;
      soundToggle.setAttribute('aria-pressed',String(enabled));
      soundToggle.setAttribute('aria-label',enabled?'Выключить звук':'Включить звук');
    };
    setSoundState(false);
    soundToggle.addEventListener('click',()=>{
      const enable=heroVideo.muted;
      setSoundState(enable);
      if(heroVideo.paused&&!reduced)heroVideo.play().catch(()=>setSoundState(false));
    });
    if(reduced){heroVideo.pause();heroMedia?.classList.add('is-reduced-motion')}
    else heroVideo.play().catch(()=>{});
    if(!reduced&&'IntersectionObserver'in window){
      const videoObserver=new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting)heroVideo.play().catch(()=>{});
        else heroVideo.pause();
      },{threshold:.05});
      videoObserver.observe(heroMedia||heroVideo);
    }
  }
  const copy={
    work:{
      clients:['Клиенты и обращения','Сохраняет контекст общения, помогает разбирать запросы и подготавливает следующий шаг.'],
      services:['Рабочие сервисы','Подключается к нужным системам, документам, хранилищам, CRM и другим рабочим инструментам.'],
      knowledge:['Профессиональные базы','Работает с методиками, архивами, внутренними знаниями и специализированными материалами владельца.'],
      research:['Глубокие исследования','Собирает большой массив источников, сопоставляет данные и готовит проверяемые выводы.'],
      automation:['Автоматизация','Запускает действия по команде, событию, расписанию или заданному условию.'],
      summaries:['Сводки и контроль','Собирает главное из рабочих потоков и показывает текущее состояние процессов.'],
      monitoring:['Мониторинг','Проверяет изменения, события и заданные условия и возвращается с результатом.'],
      modules:['Профессиональные модули','Получает специальные способности под конкретную деятельность, включая нестандартные цепочки и звонки.']
    },
    content:{
      texts:['Тексты','Готовит содержательные материалы на основе идей, знаний, записей и материалов владельца.'],
      images:['Изображения','Помогает создавать и подбирать визуальные материалы под конкретную задачу и площадку.'],
      audio:['Аудиоматериалы','Создаёт голосовые и аудиоформаты, когда они входят в согласованную конфигурацию.'],
      video:['Видеоматериалы','Помогает создавать сценарии, видеоматериалы и производные форматы для публикации.'],
      adaptation:['Адаптация контента','Перерабатывает один исходный материал под разные форматы, длину и площадки.'],
      publishing:['Публикации','Готовит и размещает согласованные материалы в выбранных каналах.'],
      audience:['Ответы аудитории','Помогает разбирать реакции, готовить ответы и продолжать разговор после публикации.'],
      'content-routines':['Контентные сценарии','Выполняет повторяющиеся циклы подготовки, проверки и публикации материалов.']
    },
    brand:{
      gallery:['Галерея образов','Позволяет выбрать подходящее направление внешности, возраста, типажа, настроения и визуального характера цифровой личности.'],
      references:['Образ по референсам','Внешность и стилистика собираются по выбранным владельцем референсам.'],
      'premium-voice':['Индивидуальный голос','Подключается специально выбранный или созданный премиальный голос, максимально соответствующий публичному образу.'],
      'talking-head':['Говорящая голова','Цифровой образ может использоваться в видеоматериалах и публичных обращениях.'],
      'video-addresses':['Видеообращения','Создаются ролики и сообщения с участием выбранного образа цифровой личности.'],
      'telegram-circles':['Telegram-кружочки','Выбранный образ может появляться в коротких видеоформатах Telegram.'],
      'public-channels':['Сайт и социальные сети','Образ используется на сайте, в социальных сетях и других публичных материалах.'],
      'brand-audience':['Общение с аудиторией','Цифровая личность помогает отвечать людям и поддерживать продолжение диалога.'],
      'brand-story':['История и позиция бренда','Знает материалы, идеи, взгляды, прошлые публикации и важные этапы развития владельца или проекта.']
    }
  };

  const schemas=$$('[data-schema-section]').map(section=>({
    section,map:$('[data-ability-map]',section),key:section.dataset.schemaSection,index:0,pauseUntil:0,timer:null,visible:false
  }));

  function drawLines(schema){
    if(!schema.map)return;
    const svg=$('.map-lines',schema.map),core=$('[data-map-core]',schema.map);
    if(!svg||!core)return;
    const root=schema.map.getBoundingClientRect(),center=core.getBoundingClientRect();
    const cx=center.left-root.left+center.width/2,cy=center.top-root.top+center.height/2;
    svg.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);svg.innerHTML='';
    $$('.map-node',schema.map).forEach(node=>{
      const box=node.getBoundingClientRect(),x2=box.left-root.left+box.width/2,y2=box.top-root.top+box.height/2;
      ['channel-base','channel-pulse'].forEach(className=>{
        const line=document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1',cx);line.setAttribute('y1',cy);line.setAttribute('x2',x2);line.setAttribute('y2',y2);line.setAttribute('pathLength','100');
        line.classList.add(className);line.dataset.line=node.dataset.node;svg.append(line);
      });
    });
  }
  function select(schema,index,{manual=false}={}){
    const nodes=$$('.map-node',schema.map);if(!nodes.length)return;
    schema.index=(index+nodes.length)%nodes.length;const node=nodes[schema.index],entry=copy[schema.key][node.dataset.node];
    nodes.forEach((item,i)=>item.setAttribute('aria-selected',String(i===schema.index)));
    $$('.map-lines line',schema.map).forEach(line=>line.classList.toggle('is-active',line.dataset.line===node.dataset.node));
    $('[data-note-title]',schema.map).textContent=entry[0];$('[data-note-copy]',schema.map).textContent=entry[1];
    schema.map.classList.toggle('is-gallery',schema.key==='brand'&&node.dataset.node==='gallery');
    if(manual)schema.pauseUntil=Date.now()+9000;
  }
  schemas.forEach(schema=>{
    const nodes=$$('.map-node',schema.map);
    nodes.forEach((node,index)=>{
      const choose=()=>select(schema,index,{manual:true});node.addEventListener('click',choose);node.addEventListener('pointerenter',choose);node.addEventListener('focus',choose);
      node.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='Home')next=0;else if(event.key==='End')next=nodes.length-1;else next=(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)+nodes.length)%nodes.length;nodes[next].focus()});
    });
    select(schema,0);drawLines(schema);
  });

  const routeSection=$('[data-route-section]'),routeItems=$$('.service-route li');let routeIndex=1,routeTimer=null,routeVisible=false;
  function tickRoute(){routeItems.forEach((item,index)=>item.classList.toggle('is-active',index===routeIndex));routeIndex=(routeIndex+1)%routeItems.length}
  function startCycles(){
    if(reduced||compact||document.hidden)return;
    if(routeVisible&&!routeTimer){routeSection.classList.add('is-running');routeTimer=setInterval(tickRoute,2200)}
    schemas.forEach(schema=>{if(schema.visible&&!schema.timer){schema.section.classList.add('is-running');schema.timer=setInterval(()=>{if(Date.now()>=schema.pauseUntil)select(schema,schema.index+1)},4300)}});
  }
  function stopRoute(){clearInterval(routeTimer);routeTimer=null;routeSection?.classList.remove('is-running')}
  function stopSchema(schema){clearInterval(schema.timer);schema.timer=null;schema.section.classList.remove('is-running')}
  if(!reduced&&!compact&&'IntersectionObserver'in window){
    const cycleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.target===routeSection){routeVisible=entry.isIntersecting;if(!routeVisible)stopRoute()}else{const schema=schemas.find(item=>item.section===entry.target);if(schema){schema.visible=entry.isIntersecting;if(!schema.visible)stopSchema(schema)}}startCycles()}),{threshold:.16});
    if(routeSection)cycleObserver.observe(routeSection);schemas.forEach(schema=>cycleObserver.observe(schema.section));
    document.addEventListener('visibilitychange',()=>{if(document.hidden){stopRoute();schemas.forEach(stopSchema)}else startCycles()});
  }
  if('IntersectionObserver'in window&&!reduced){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});$$('[data-dev-reveal]').forEach(item=>revealObserver.observe(item))}else{$$('[data-dev-reveal]').forEach(item=>item.classList.add('is-visible'))}
  let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>schemas.forEach(drawLines),100)});addEventListener('load',()=>schemas.forEach(drawLines));
})();
