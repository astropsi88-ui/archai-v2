(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const draftKey = 'vikPhoneDraftV1';
  const attemptKey = 'vikPhoneAttemptV1';
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); return true; } catch { return false; } };
  let authenticated = false, busy = false, restoring = false, conversationId = null, rows = [], rendered = '', pollTimer = 0, installPrompt = null;
  let attempt;
  try { attempt = JSON.parse(read(attemptKey) || 'null'); } catch { attempt = null; }
  if (attempt && (typeof attempt.text !== 'string' || !/^\d+$/.test(attempt.beforeId) || !Number.isFinite(attempt.started))) { attempt = null; write(attemptKey, null); }
  $('message').value = read(draftKey) || '';
  const status = text => { $('status').textContent = text; };
  function controls() {
    $('send').disabled = !authenticated || busy || restoring || !!attempt || !$('message').value.trim();
    $('message').disabled = busy;
    $('login-button').disabled = busy || !navigator.onLine;
    $('connection').textContent = !navigator.onLine ? 'Нет соединения' : authenticated ? 'Наш личный разговор' : 'Личный вход';
  }
  function gate(value) {
    authenticated = value;
    $('welcome').hidden = value;
    $('conversation').hidden = !value;
    if (!value) { rows = []; rendered = ''; $('messages').replaceChildren(); conversationId = null; }
    controls();
  }
  async function api(path, body, timeout = 100000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch('/api/vik-site/' + path, {
        method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
        headers: body === undefined ? { Accept: 'application/json' } : { 'Content-Type': 'application/json' },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal: controller.signal
      });
      const data = await response.json();
      if (!response.ok) throw Object.assign(new Error(data.error || 'request_failed'), { status: response.status });
      return data;
    } finally { clearTimeout(timer); }
  }
  function render() {
    $('empty').hidden = rows.length > 0;
    const signature = rows.map(row => row.id).join(',');
    if (signature === rendered) return;
    const panel = $('conversation');
    const nearBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 120;
    const first = !rendered;
    rendered = signature;
    $('messages').replaceChildren();
    for (const row of rows) {
      if (!['user', 'assistant'].includes(row.role)) continue;
      const item = document.createElement('div');
      item.className = 'bubble ' + row.role;
      item.textContent = row.content;
      const time = document.createElement('small');
      const date = new Date(row.createdAt);
      time.textContent = (row.role === 'user' ? 'Ты' : 'Вик') + (Number.isFinite(date.getTime()) ? ' · ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '');
      item.append(time); $('messages').append(item);
    }
    if (first || nearBottom) panel.scrollTop = panel.scrollHeight;
  }
  function saveDraft() {
    const saved = write(draftKey, $('message').value);
    if (!saved) status('Браузер не даёт сохранить черновик. Не закрывай страницу.');
    else if (!navigator.onLine) status('Черновик сохранён на телефоне. Вику ещё не доставлен.');
    controls();
  }
  function clearAttempt(clearDraft = false) {
    if (clearDraft && $('message').value.trim() === attempt?.text) { $('message').value = ''; write(draftKey, null); }
    attempt = null; write(attemptKey, null); controls();
  }
  function reconcile() {
    if (!attempt) return;
    const delivered = rows.find(row => row.role === 'user' && BigInt(row.id) > BigInt(attempt.beforeId) && row.content === attempt.text);
    if (delivered) {
      const answered = rows.some(row => row.role === 'assistant' && BigInt(row.id) > BigInt(delivered.id));
      if (answered) { clearAttempt(true); status('Ответ получен 🧡'); }
      else if (Date.now() - attempt.started >= 120000) { clearAttempt(true); status('Сообщение доставлено. Ответ задержался; можно написать ещё.'); }
      else { status('Сообщение уже у Вика. Жду ответ — повторно не отправляю.'); schedulePoll(); }
    } else if (Date.now() - attempt.started < 120000) {
      status('Проверяю доставку. Повторно не отправляю.'); schedulePoll();
    } else {
      // No automatic retry: the user decides whether to send the saved draft.
      clearAttempt(); status('Доставка не подтверждена. Черновик сохранён; можно отправить снова.');
    }
    controls();
  }
  function schedulePoll() { clearTimeout(pollTimer); pollTimer = setTimeout(() => { if (authenticated && navigator.onLine && !busy) void restoreHistory(); else if (attempt) schedulePoll(); }, 5000); }
  async function restoreHistory() {
    if (restoring || busy || !authenticated) return;
    restoring = true; controls();
    try {
      await api('owner/secret-rotation', undefined, 15000);
      const data = await api('history', undefined, 15000);
      rows = Array.isArray(data.messages) ? data.messages : [];
      conversationId = data.conversationId || null;
      render();
      if (attempt) reconcile();
      else status('Я здесь. Можешь писать 🧡');
    } catch (error) {
      if (error.status === 403) { gate(false); status('Войди по своей фразе — открою личный разговор.'); }
      else status('Сервер пока не ответил. Черновик остаётся на устройстве.');
      if (attempt) schedulePoll();
    } finally { restoring = false; controls(); }
  }
  async function connect() {
    if (busy || restoring) return;
    if (!navigator.onLine) { status('Нет соединения. Можно сохранить черновик и вернуться позже.'); controls(); return; }
    try { await api('owner/secret-rotation', undefined, 15000); gate(true); await restoreHistory(); }
    catch (error) {
      if (error.status === 403) { gate(false); status('Войди по своей фразе — открою личный разговор.'); }
      else status('Не удалось соединиться с сервером. Попробуй «Обновить».');
      controls();
    }
  }
  $('login').addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !navigator.onLine) return;
    busy = true; controls(); $('login-status').textContent = 'Открываю наш разговор…';
    try {
      const data = await api('owner/auth', { phrase: $('phrase').value }, 20000);
      if (!data.ownerAuthenticated) throw new Error('owner_not_confirmed');
      $('phrase').value = ''; gate(true); busy = false; await restoreHistory();
    } catch (error) {
      $('login-status').textContent = error.status === 401 ? 'Фраза не подошла. Попробуй ещё раз.' : error.status === 429 ? 'Слишком много попыток. Немного подожди.' : 'Сервер не ответил. Фраза не сохранена на устройстве.';
    } finally { busy = false; controls(); }
  });
  async function send() {
    if (busy || restoring || attempt || !authenticated) return;
    const text = $('message').value.trim();
    if (!text) return;
    saveDraft();
    if (!navigator.onLine) { status('Сохранено на телефоне. Отправишь, когда появится связь.'); return; }
    busy = true; controls(); status('Передаю сообщение…');
    let posted = false;
    try {
      // Recheck owner authentication immediately before sending; never fall back to visitor chat.
      await api('owner/secret-rotation', undefined, 15000);
      const history = await api('history', undefined, 15000);
      conversationId = history.conversationId || null;
      rows = history.messages || []; render();
      attempt = { text, beforeId: rows.reduce((id, row) => BigInt(row.id) > BigInt(id) ? String(row.id) : id, '0'), started: Date.now() };
      if (!write(attemptKey, JSON.stringify(attempt))) { attempt = null; throw new Error('storage_unavailable'); }
      posted = true; status('Сообщение отправляется. Жду ответ Вика…');
      const data = await api('chat', { message: text, ...(conversationId ? { conversationId } : {}) });
      conversationId = data.conversationId || conversationId;
      clearAttempt(true); status('Ответ получен 🧡');
      // The canonical history also contains input that was consumed as an auth command.
      rows = []; rendered = '';
      if (data.message?.role === 'assistant') { rows = [data.message]; render(); }
    } catch (error) {
      if (!posted || (error.status && error.status < 500)) {
        clearAttempt();
        if (error.status === 403) { gate(false); status('Нужно снова войти. Черновик сохранён.'); }
        else status(error.status === 429 ? 'Дай мне минутку. Черновик сохранён.' : 'Не отправлено. Черновик сохранён; попробуй ещё раз.');
      } else { status('Ответ оборвался. Сверяю историю перед повторной отправкой.'); schedulePoll(); }
    } finally { busy = false; controls(); if (authenticated) await restoreHistory(); }
  }
  $('compose').addEventListener('submit', event => {
    event.preventDefault();
    if (navigator.locks) void navigator.locks.request('vik-phone-send', { ifAvailable: true }, async lock => {
      if (!lock) { status('Сообщение уже отправляется в другом окне.'); return; }
      try { attempt = JSON.parse(read(attemptKey) || 'null'); } catch { attempt = null; }
      if (attempt) { await restoreHistory(); return; }
      await send();
    });
    else void send();
  });
  $('message').addEventListener('input', saveDraft);
  $('refresh').addEventListener('click', () => void connect());
  window.addEventListener('online', () => { controls(); void connect(); });
  window.addEventListener('offline', () => { controls(); status('Нет соединения. Черновик сохранён на устройстве.'); });
  window.addEventListener('storage', event => {
    if (event.key === attemptKey && !busy) { try { attempt = JSON.parse(event.newValue || 'null'); } catch { attempt = null; } controls(); if (authenticated) void restoreHistory(); }
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !busy) void connect(); });
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; });
  window.addEventListener('appinstalled', () => { installPrompt = null; $('install').hidden = true; });
  if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) $('install').hidden = true;
  $('install').addEventListener('click', async () => {
    if (installPrompt) { await installPrompt.prompt(); installPrompt = null; return; }
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    $('install-instructions').textContent = ios ? 'В Safari нажми «Поделиться», затем «На экран Домой» и «Добавить».' : 'В Chrome открой меню ⋮ и выбери «Установить приложение» или «Добавить на главный экран».';
    $('install-help').showModal();
  });
  $('close-help').addEventListener('click', () => $('install-help').close());
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', { scope: '/vik/' }).catch(() => { /* Online chat remains available. */ });
  controls(); void connect();
})();
