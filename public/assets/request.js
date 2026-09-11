(() => {
  const form = document.querySelector('[data-lead-form]');
  if (!form) return;
  const startedAt = Date.now();
  const contact = form.elements.contactMethod;
  const handleWrap = form.querySelector('[data-contact-handle]');
  const handle = form.elements.contactHandle;
  const status = form.querySelector('[data-lead-status]');
  const submit = form.querySelector('button[type="submit"]');
  const locale = form.dataset.locale;
  const copy = locale === 'ru' ? {
    wait:'Отправляем…', success:'Заявка получена. Ответ придёт на ваш рабочий email. Объём, договор и счёт согласуем вручную.', error:'Не удалось отправить заявку. Проверьте поля и попробуйте ещё раз.', rate:'Слишком много попыток. Пожалуйста, попробуйте позже.'
  } : {
    wait:'Sending…', success:'Request received. We will reply to your business email. Scope, contract and invoice are handled manually.', error:'We could not send the request. Check the fields and try again.', rate:'Too many attempts. Please try again later.'
  };
  const syncHandle = () => { const needed = contact.value !== 'email'; handleWrap.hidden = !needed; handle.required = needed; };
  contact.addEventListener('change', syncHandle); syncHandle();
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); status.classList.remove('is-error');
    if (!form.reportValidity()) return;
    submit.disabled = true; submit.textContent = copy.wait;
    const data = Object.fromEntries(new FormData(form));
    data.locale = locale; data.consent = form.elements.consent.checked; data.startedAt = startedAt;
    try {
      const response = await fetch('/api/vik-site/lead', { method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(response.status === 429 ? 'rate' : result.error || 'request');
      status.textContent = `${copy.success}${result.requestId ? ` ID: ${result.requestId}` : ''}`;
      form.reset(); syncHandle(); submit.hidden = true;
    } catch (error) { status.textContent = error.message === 'rate' ? copy.rate : copy.error; status.classList.add('is-error'); submit.disabled = false; submit.textContent = form.dataset.submitLabel; }
  });
})();
