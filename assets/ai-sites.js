(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems=[...document.querySelectorAll('[data-reveal]')];
  const journey=document.querySelector('[data-journey]');

  if('IntersectionObserver' in window&&!reduced){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    }),{threshold:.14,rootMargin:'0px 0px -40px'});
    revealItems.forEach(item=>observer.observe(item));
    if(journey)new IntersectionObserver(([entry],obs)=>{if(entry.isIntersecting){journey.classList.add('is-visible');obs.disconnect()}},{threshold:.35}).observe(journey);
  }else{
    revealItems.forEach(item=>item.classList.add('is-visible'));
    journey?.classList.add('is-visible');
  }

  const stage=document.querySelector('[data-tilt]');
  if(stage&&!reduced&&window.matchMedia('(pointer: fine)').matches){
    stage.addEventListener('pointermove',event=>{
      const rect=stage.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      stage.style.transform=`rotateX(${-y*3}deg) rotateY(${x*4}deg)`;
    });
    stage.addEventListener('pointerleave',()=>{stage.style.transform=''})
  }

  const scenarios={
    choose:{person:'«Не понимаю, какая услуга мне подходит».',ai:'Уточняет задачу, аудиторию и желаемый результат.',result:'Понятный вариант без изучения десятков страниц.'},
    product:{person:'«Чем ваш вариант отличается от обычного чат-бота?»',ai:'Использует реальные материалы проекта и объясняет разницу человеческим языком.',result:'Понимание ценности вместо набора рекламных фраз.'},
    price:{person:'«Сколько примерно стоит и сколько времени занимает?»',ai:'Уточняет объём, функции и каналы, даёт предварительный ориентир или передаёт вопрос в ArchAI.',result:'Обращение с необходимыми вводными для следующего разговора.'},
    telegram:{person:'Нажимает «Продолжить в Telegram».',ai:'Связывает текущую беседу с тем же посетителем в Telegram.',result:'Не нужно повторно рассказывать, кто он и что ему нужно.'}
  };
  const tabs=document.querySelector('[data-scenario-tabs]');
  if(tabs){
    const person=tabs.querySelector('[data-scenario-person]');
    const ai=tabs.querySelector('[data-scenario-ai]');
    const result=tabs.querySelector('[data-scenario-result]');
    tabs.addEventListener('click',event=>{
      const button=event.target.closest('[data-tab]');
      if(!button)return;
      tabs.querySelectorAll('[data-tab]').forEach(tab=>tab.setAttribute('aria-selected',String(tab===button)));
      const item=scenarios[button.dataset.tab];
      if(item){person.textContent=item.person;ai.textContent=item.ai;result.textContent=item.result}
    });
    tabs.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      const buttons=[...tabs.querySelectorAll('[data-tab]')];
      const current=buttons.indexOf(document.activeElement);
      if(current<0)return;
      event.preventDefault();
      buttons[(current+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length].focus();
    })
  }

  const quickScenarios=document.querySelector('[data-ai-scenarios]');
  if(quickScenarios){
    quickScenarios.addEventListener('click',event=>{
      const button=event.target.closest('[data-scenario]');
      if(!button)return;
      const form=document.querySelector('[data-vik-site-form]');
      const field=form?.querySelector('[data-vik-message]');
      if(!form||!field)return;
      field.value=button.dataset.scenario;
      field.dispatchEvent(new Event('input',{bubbles:true}));
      quickScenarios.classList.add('is-used');
      form.requestSubmit();
    })
  }
})();
