(()=>{
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact=matchMedia('(max-width: 760px)').matches;

  const revealItems=$$('[data-site-reveal]');
  if('IntersectionObserver'in window&&!reduced){
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }),{threshold:.12,rootMargin:'0px 0px -34px'});
    revealItems.forEach(item=>revealObserver.observe(item));
  }else revealItems.forEach(item=>item.classList.add('is-visible'));

  const analytics=$('[data-analytics]');
  let metricTimer=null,metricIndex=0;
  const metrics=$$('[data-metric]',analytics||document).map(item=>({item,values:(item.dataset.values||'').split(',')}));
  const updateMetrics=()=>{
    metricIndex+=1;
    metrics.forEach(({item,values})=>{if(values.length)item.textContent=values[metricIndex%values.length]});
  };
  const startMetrics=()=>{if(reduced||metricTimer||!metrics.length)return;metricTimer=setInterval(updateMetrics,2600)};
  const stopMetrics=()=>{clearInterval(metricTimer);metricTimer=null};
  if(analytics){
    if('IntersectionObserver'in window){
      new IntersectionObserver(([entry])=>{
        if(entry.isIntersecting){analytics.classList.add('is-active');startMetrics()}
        else stopMetrics();
      },{threshold:.22}).observe(analytics);
    }else{analytics.classList.add('is-active');startMetrics()}
  }

  if(reduced)$$('animateMotion').forEach(node=>node.remove());

  if(!reduced&&!compact&&matchMedia('(pointer:fine)').matches){
    $$('[data-parallax]').forEach(stage=>{
      stage.addEventListener('pointermove',event=>{
        const rect=stage.getBoundingClientRect();
        const x=(event.clientX-rect.left)/rect.width-.5;
        const y=(event.clientY-rect.top)/rect.height-.5;
        stage.style.setProperty('--parallax-x',`${x*7}deg`);
        stage.style.setProperty('--parallax-y',`${-y*5}deg`);
        stage.style.transform=`rotateX(${-y*1.4}deg) rotateY(${x*1.8}deg)`;
      });
      stage.addEventListener('pointerleave',()=>{stage.style.transform=''});
    });
  }

  const quickScenarios=$('[data-ai-scenarios]');
  if(quickScenarios){
    quickScenarios.addEventListener('click',event=>{
      const button=event.target.closest('[data-scenario]');
      if(!button)return;
      const form=$('[data-vik-site-form]');
      const field=$('[data-vik-message]',form||document);
      if(!form||!field)return;
      field.value=button.dataset.scenario;
      field.dispatchEvent(new Event('input',{bubbles:true}));
      quickScenarios.classList.add('is-used');
      form.requestSubmit();
    });
  }

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)stopMetrics();
    else if(analytics?.classList.contains('is-active'))startMetrics();
  });
})();
