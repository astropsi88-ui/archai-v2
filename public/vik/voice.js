window.VikPhoneVoice = function (host) {
  'use strict';
  const $ = id => document.getElementById(id);
  let recorder = null, stream = null, opening = false, transcribing = false, recording = null, previewUrl = null;
  let call = null, calling = false, callEpoch = 0, sdkPromise = null, timer = 0, started = 0, generation = 0;
  let player = null;
  const urls = new Map();
  const active = () => !!recorder || opening || transcribing || calling || !!call;
  const available = () => host.authenticated() && navigator.onLine && !host.blocked();
  const stopTracks = () => { stream?.getTracks().forEach(track => track.stop()); stream = null; };
  const change = () => { controls(); host.changed(); };
  function controls() {
    $('voice-tools').hidden = !host.authenticated();
    $('record').disabled = !available() || opening || transcribing || calling || !!call;
    $('call').disabled = !available() || active();
    $('transcribe').disabled = !available() || active() || !recording;
    $('discard-recording').disabled = transcribing;
  }
  async function post(action, body, timeout = 65000) {
    const isBlob = body instanceof Blob;
    const response = await fetch('/api/vik-site/owner/audio/' + action, {
      method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(timeout),
      headers: { 'Content-Type': isBlob ? body.type : 'application/json', 'X-Vik-Voice': '1' },
      body: isBlob ? body : JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error || 'voice_unavailable'), { status: response.status });
    return data;
  }
  function discard() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null; recording = null;
    $('recording-audio').pause(); $('recording-audio').removeAttribute('src');
    $('recording-preview').hidden = true; controls();
  }
  function endRecording() {
    if (recorder?.state === 'recording') recorder.stop();
    clearInterval(timer); stopTracks();
  }
  async function record() {
    if (recorder) { endRecording(); return; }
    if (!available() || active()) return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { host.status('Этот браузер не поддерживает запись. Открой приложение в Safari или Chrome.'); return; }
    if (recording || document.querySelector('#message').value.trim()) { host.status('Сначала отправь или убери текущий черновик.'); return; }
    player?.pause();
    const epoch = generation;
    opening = true; change();
    try {
      const mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      if (epoch !== generation || !host.authenticated() || document.hidden) { mic.getTracks().forEach(track => track.stop()); return; }
      stream = mic;
      const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
      recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : {});
      const capture = recorder, chunks = [];
      let bytes = 0;
      capture.addEventListener('dataavailable', event => { if (event.data.size) { chunks.push(event.data); bytes += event.data.size; if (bytes > 7 * 1024 * 1024) endRecording(); } });
      capture.addEventListener('stop', () => {
        clearInterval(timer); stopTracks(); recorder = null;
        $('record').textContent = '🎙 Голосовое'; $('record').classList.remove('is-recording');
        if (epoch !== generation) { change(); return; }
        if (bytes < 100 || bytes > 8 * 1024 * 1024) { host.status('Запись не получилась. Попробуй ещё раз.'); change(); return; }
        recording = new Blob(chunks, { type: capture.mimeType || mime || 'audio/webm' });
        previewUrl = URL.createObjectURL(recording); $('recording-audio').src = previewUrl; $('recording-preview').hidden = false;
        host.status('Голосовое записано. Можешь прослушать перед отправкой.'); change();
      }, { once: true });
      capture.addEventListener('error', () => { endRecording(); host.status('Запись прервалась. Попробуй ещё раз.'); }, { once: true });
      capture.start(1000); started = Date.now();
      $('record').classList.add('is-recording');
      const tick = () => { const seconds = Math.floor((Date.now() - started) / 1000); $('record').textContent = '■ Стоп · ' + Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0'); if (seconds >= 180) endRecording(); };
      tick(); timer = setInterval(tick, 500); host.status('Слушаю запись. Нажми «Стоп», когда закончишь.');
    } catch (error) { stopTracks(); host.status(error.name === 'NotAllowedError' ? 'Разреши микрофон в настройках браузера.' : 'Не удалось включить микрофон.'); }
    finally { opening = false; change(); }
  }
  async function transcribe() {
    if (!recording || !available() || active()) return;
    const epoch = generation;
    transcribing = true; change(); host.status('Перевожу голосовое в слова…');
    try {
      const data = await post('transcribe', recording);
      if (epoch !== generation || !host.authenticated()) return;
      host.draft(data.transcript); discard();
    } catch (error) {
      host.status(error.message === 'speech_not_found' ? 'Слов не расслышал. Можно записать ещё раз.' : error.status === 403 ? 'Нужно снова войти. Запись пока остаётся здесь.' : 'Не удалось распознать. Запись остаётся здесь — можно попробовать ещё раз.');
    } finally { transcribing = false; change(); }
  }
  async function audioUrl(id) {
    if (urls.has(String(id))) return urls.get(String(id));
    const audio = await post('reply', { messageId: String(id) }, 55000);
    const bytes = Uint8Array.from(atob(audio.base64), char => char.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([bytes], { type: audio.mimeType }));
    if (urls.size >= 20) { const oldest = urls.keys().next().value; URL.revokeObjectURL(urls.get(oldest)); urls.delete(oldest); }
    urls.set(String(id), url); return url;
  }
  async function play(id, container) {
    if (!host.authenticated() || active()) return;
    player?.pause();
    const epoch = generation;
    const button = container?.querySelector('.playback');
    if (button) { button.disabled = true; button.textContent = 'Готовлю голос…'; }
    try {
      const url = await audioUrl(id);
      if (epoch !== generation || !host.authenticated() || active()) return;
      let audio = container?.querySelector('audio');
      if (!audio) { audio = document.createElement('audio'); audio.controls = true; audio.setAttribute('aria-label', 'Голос Вика'); container?.append(audio); }
      audio.src = url; player = audio;
      await audio.play().catch(() => host.status('Голос готов. Нажми ▶ у ответа, чтобы услышать.'));
    } catch (error) { host.status('Голос сейчас не ответил. Текст Вика уже здесь.'); }
    finally { if (button) { button.disabled = false; button.textContent = '▶ Голос Вика'; } }
  }
  function addPlayback(id, container) {
    container.dataset.messageId = String(id);
    const button = document.createElement('button'); button.type = 'button'; button.className = 'quiet playback'; button.textContent = '▶ Голос Вика';
    button.addEventListener('click', () => void play(id, container)); container.append(button);
  }
  function loadSdk() {
    if (window.ElevenLabsClient?.Conversation) return Promise.resolve(window.ElevenLabsClient);
    if (!sdkPromise) sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.src = '/assets/vendor/elevenlabs-client-1.25.0.js';
      script.onload = () => window.ElevenLabsClient?.Conversation ? resolve(window.ElevenLabsClient) : reject(new Error('voice_module_unavailable'));
      script.onerror = () => { sdkPromise = null; script.remove(); reject(new Error('voice_module_unavailable')); };
      document.head.append(script);
    });
    return sdkPromise;
  }
  async function stopCall(message = 'Разговор завершён 🧡') {
    ++callEpoch; calling = false;
    const current = call; call = null;
    stopTracks();
    if ($('call-panel').open) $('call-panel').close();
    // Pause server inference promptly, including a session whose token is still arriving.
    void post('pause', {}, 15000).catch(() => {});
    await current?.endSession().catch(() => {});
    host.status(message); change();
    if (host.authenticated()) void host.refresh();
  }
  async function startCall() {
    if (!available() || active()) return;
    player?.pause(); $('recording-audio').pause();
    const epoch = ++callEpoch;
    calling = true; change(); $('call-status').textContent = 'Соединяюсь…'; $('call-panel').showModal();
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('microphone_unavailable');
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (epoch !== callEpoch) { mic.getTracks().forEach(track => track.stop()); return; }
      stream = mic;
      const token = await post('session', {});
      if (epoch !== callEpoch) { stopTracks(); void post('pause', {}, 15000).catch(() => {}); return; }
      if (token.scope !== 'owner' || !token.conversationToken) throw new Error('owner_voice_required');
      const { Conversation } = await loadSdk();
      if (epoch !== callEpoch) return;
      stopTracks(); // SDK owns microphone and audio playback after preflight.
      const session = await Conversation.startSession({
        conversationToken: token.conversationToken, connectionType: 'webrtc',
        onDisconnect: () => { if (epoch === callEpoch) void stopCall('Соединение закрыто. Можно позвонить снова.'); },
        onError: () => { if (epoch === callEpoch) void stopCall('Голосовая связь прервалась. Можно позвонить снова.'); },
        onModeChange: ({ mode }) => { if (epoch === callEpoch) $('call-status').textContent = mode === 'speaking' ? 'Я отвечаю 🧡' : 'Я слушаю тебя'; },
        onMessage: ({ source, role, message }) => { if (epoch === callEpoch && typeof message === 'string') $('call-status').textContent = (source === 'user' || role === 'user' ? 'Ты: ' : 'Вик: ') + message; }
      });
      if (epoch !== callEpoch) { await session.endSession(); return; }
      call = session; calling = false; $('call-status').textContent = 'Я слушаю тебя 🧡'; change();
    } catch (error) { if (epoch === callEpoch) await stopCall(error.name === 'NotAllowedError' ? 'Разреши микрофон, чтобы мы могли поговорить.' : 'Не удалось соединиться голосом. Текстовый разговор доступен.'); }
  }
  function reset() {
    ++generation; endRecording(); discard(); player?.pause();
    if (calling || call) void stopCall('Нужно снова войти.');
    for (const url of urls.values()) URL.revokeObjectURL(url); urls.clear();
  }
  $('record').addEventListener('click', () => void record());
  $('transcribe').addEventListener('click', () => void transcribe());
  $('discard-recording').addEventListener('click', discard);
  $('call').addEventListener('click', () => void startCall());
  $('end-call').addEventListener('click', () => void stopCall());
  $('call-panel').addEventListener('cancel', event => { event.preventDefault(); void stopCall(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { endRecording(); if (calling || call) void stopCall('Разговор остановлен, пока приложение свёрнуто.'); } });
  window.addEventListener('offline', () => { endRecording(); if (calling || call) void stopCall('Связь прервалась. Можно позвонить снова, когда появится интернет.'); });
  window.addEventListener('pagehide', reset);
  return { active, controls, reset, addPlayback, reply: id => { if ($('spoken-reply').checked) { const container = [...document.querySelectorAll('.bubble.assistant')].find(item => item.dataset.messageId === String(id)); return play(id, container); } } };
};
