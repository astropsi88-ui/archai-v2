const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const people = {
  svetochka: { name: "Светочка", role: "Создательница ARCH_AI", initials: "С", image: "assets/svetlana-itaf.jpg", quote: "«Соберём так, чтобы человеку всё стало понятно с первого взгляда.»" },
  adam: { name: "Адам", role: "Соавтор · архитектор", initials: "А", quote: "«Свяжу идеи команды в одно решение и сохраню общий замысел.»" },
  vik: { name: "Вик", role: "Живая личность · AI-консультант", initials: "В", image: "assets/vik-intro-4x5-poster.jpg", quote: "«Встречу человека, пойму задачу и подключу нужных сотрудников.»" },
  admin: { name: "Администратор", role: "Встречи · порядок", initials: "АД", quote: "«Есть две новые заявки и вопрос к общей команде.»" },
  seller: { name: "Продавец", role: "Лиды · сделки", initials: "ПР", quote: "«Потребность клиента понятна, следующий шаг уже назначен.»" },
  marketing: { name: "Маркетолог", role: "Стратегия · проверка", initials: "М", quote: "«Проверю смысл, оффер и рекламную логику.»" },
  content: { name: "Контент-агент", role: "Тексты · видео", initials: "К", quote: "«Соберу ролик и публикации, затем верну их на проверку.»" },
  analyst: { name: "Аналитик", role: "Рынок · решения", initials: "АН", quote: "«Покажу цифры и объясню, какое решение сейчас выгоднее.»" },
  finance: { name: "Финансист + бухгалтер", role: "Финансы · учёт", initials: "Ф", quote: "«Экономика сходится, расходы и риски отмечены отдельно.»" },
  yur: { name: "Юр", role: "Договоры · риски", initials: "Ю", quote: "«Два пункта требуют решения Светочки, остальное проверено.»" },
};

const teamLines = [
  { speaker: "svetochka", time: "14:20", text: "Давайте соберём понятный запуск: что именно покажем человеку и кто за что отвечает?" },
  { speaker: "adam", time: "14:20", text: "Покажем не набор ботов, а живую компанию: задача входит один раз, сотрудники передают работу друг другу, а в центре остаётся результат." },
  { speaker: "marketing", time: "14:21", text: "Тогда первый смысл — «ваша готовая AI-команда». Я проверю оффер и рекламную логику." },
  { speaker: "content", time: "14:21", text: "По этому смыслу соберу короткий ролик и три публикации. Перед выпуском верну Маркетологу на проверку." },
  { speaker: "yur", time: "14:22", text: "Формулировки проверил. В договоре отметил два пункта, где решение должна принять Светочка.", attachment: "contract" },
  { speaker: "vik", time: "14:23", text: "А я встречу человека на сайте, выясню его задачу и покажу подходящую команду — без лекции на сорок минут, обещаю." },
];

const personalLines = {
  svetochka: [
    { speaker: "svetochka", time: "сейчас", text: "Собери мне короткий итог: что готово и где нужно моё решение?" },
    { speaker: "adam", time: "сейчас", text: "Готовы оффер, контент-план и договор. В договоре Юр оставил два решения для тебя." },
  ],
  adam: [
    { speaker: "svetochka", time: "14:28", text: "Адам, свяжи всё в один понятный продукт." },
    { speaker: "adam", time: "14:28", text: "Уже связываю: один вход для задачи, прозрачная передача между сотрудниками и общий результат на рабочем столе." },
  ],
  vik: [
    { speaker: "svetochka", time: "14:29", text: "Вик, как встретишь нового человека?" },
    { speaker: "vik", time: "14:29", text: "Поздороваюсь, задам два коротких вопроса и покажу только тех сотрудников, которые действительно нужны его бизнесу." },
  ],
};

const tabs = $$(".main-tab");
function setView(view, focus = false) {
  tabs.forEach((tab) => {
    const active = tab.dataset.view === view;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.toggleAttribute("aria-current", active);
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  $$('[data-panel]').forEach((panel) => {
    const active = panel.dataset.panel === view;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
}
tabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
$(".main-tabs").addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
  setView(tabs[next].dataset.view, true);
});

const workTabs = $$('[data-work-mode]');
function setWorkMode(mode, focus = false) {
  workTabs.forEach((tab) => {
    const active = tab.dataset.workMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.toggleAttribute("aria-current", active);
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  $$('[data-work-panel]').forEach((panel) => {
    const active = panel.dataset.workPanel === mode;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
}
workTabs.forEach((tab) => tab.addEventListener("click", () => setWorkMode(tab.dataset.workMode)));
$(".work-subtabs")?.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const current = workTabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  const next = event.key === "Home" ? 0 : event.key === "End" ? workTabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + workTabs.length) % workTabs.length;
  setWorkMode(workTabs[next].dataset.workMode, true);
});
setWorkMode(workTabs.find((tab) => tab.classList.contains("is-active"))?.dataset.workMode || "tasks");

function installImageFallbacks(root = document) {
  $$("img", root).forEach((image) => {
    const replace = () => {
      if (!image.isConnected) return;
      const fallback = document.createElement("span");
      fallback.className = "image-fallback";
      fallback.textContent = image.alt === "Адам" ? "А" : (image.alt || "А").slice(0, 1);
      fallback.setAttribute("aria-label", image.alt || "Аватар");
      image.replaceWith(fallback);
    };
    if (image.complete && image.naturalWidth === 0) replace();
    else image.addEventListener("error", replace, { once: true });
  });
}
installImageFallbacks();

let conversationMode = "team";
let speakerTimer;
let replyTimers = [];

function avatarMarkup(key, className = "line-avatar") {
  const person = people[key];
  if (person.image) return `<span class="${className} photo"><img src="${person.image}" alt="" /></span>`;
  const tone = { marketing: "avatar-violet", content: "avatar-pink", yur: "avatar-slate", analyst: "avatar-cyan", finance: "avatar-green", seller: "avatar-gold", admin: "avatar-blue" }[key] || "";
  return `<span class="${className} ${tone}">${person.initials}</span>`;
}

function lineMarkup(line, live = false) {
  const person = people[line.speaker];
  const attachment = line.attachment === "contract" ? `<button type="button" data-open-drawer="contract"><span aria-hidden="true">▤</span><span><b>Договор на внедрение</b><small>2 замечания · открыть</small></span><em>↗</em></button>` : "";
  const listen = line.speaker === "svetochka" ? "" : `<button class="listen-button" type="button" data-listen="${line.speaker}" aria-label="Прослушать ответ сотрудника ${person.name}" title="Прослушать"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M17 9a4 4 0 010 6M19 6a8 8 0 010 12"/></svg><span>Прослушать</span><i aria-hidden="true"><b></b><b></b><b></b></i></button>`;
  return `<article class="conversation-line${live ? " is-live" : ""}${attachment ? " with-attachment" : ""}" data-speaker="${line.speaker}">${avatarMarkup(line.speaker)}<div><header><strong>${person.name}</strong><time>${line.time}</time>${listen}${live ? "<em>говорит сейчас</em>" : ""}</header><p>${escapeHtml(line.text)}</p>${attachment}</div></article>`;
}

function setSpeaker(key) {
  const person = people[key];
  if (!person) return;
  $$('[data-person], [data-member]').forEach((button) => {
    const active = button.dataset.person === key || button.dataset.member === key;
    button.classList.toggle("is-speaking", active);
  });
  $$('.conversation-line').forEach((line) => {
    const active = line.dataset.speaker === key;
    line.classList.toggle("is-live", active);
    const header = $("header", line);
    const old = $("em", header);
    if (old) old.remove();
    if (active) header.insertAdjacentHTML("beforeend", "<em>говорит сейчас</em>");
  });
  $("[data-conversation-state]").textContent = `Сейчас говорит ${person.name}`;
  $("[data-presence-title]").textContent = `${person.name} говорит`;
  $("[data-speaker-name]").textContent = person.name;
  $("[data-speaker-role]").textContent = person.role;
  $("[data-speaker-quote]").textContent = person.quote;
  const portrait = $(".speaker-portrait");
  portrait.innerHTML = `${person.image ? `<img src="${person.image}" alt="${person.name}" />` : `<span class="image-fallback" aria-label="${person.name}">${person.initials}</span>`}<span class="voice-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;
  installImageFallbacks(portrait);
}

function clearReplyTimers() { replyTimers.forEach(clearTimeout); replyTimers = []; }
function startSpeakerCycle() {
  clearInterval(speakerTimer);
  if (conversationMode !== "team" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let index = 0;
  speakerTimer = setInterval(() => {
    const lines = $$('.conversation-line');
    if (!lines.length || conversationMode !== "team") return;
    index = (index + 1) % lines.length;
    setSpeaker(lines[index].dataset.speaker);
  }, 3600);
}

function updateSelection(key) {
  $$('[data-person]').forEach((button) => {
    const active = button.dataset.person === key;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $$('[data-member]').forEach((button) => {
    const active = button.dataset.member === key;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $$('[data-show-team]').forEach((button) => {
    const active = key === "team";
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function showTeam() {
  conversationMode = "team";
  clearReplyTimers();
  updateSelection("team");
  $("[data-conversation-title]").textContent = "Общий рабочий стол";
  $("[data-conversation-subtitle]").textContent = "Все участники слышат разговор и дополняют друг друга.";
  $("[data-flow-label]").textContent = "ОБЩИЙ РАЗГОВОР";
  $("[data-flow-title]").textContent = "Команда собирает запуск нового продукта";
  $("[data-presence-note]").textContent = "Общий рабочий стол";
  $("[data-conversation-feed]").innerHTML = teamLines.map((line, index) => lineMarkup(line, index === 0)).join("");
  installImageFallbacks($("[data-conversation-feed]"));
  bindDrawerButtons();
  bindListenButtons();
  setSpeaker("svetochka");
  startSpeakerCycle();
}

function showPerson(key) {
  const person = people[key];
  if (!person) return;
  conversationMode = key;
  clearInterval(speakerTimer);
  clearReplyTimers();
  updateSelection(key);
  $("[data-conversation-title]").textContent = `Личный разговор · ${person.name}`;
  $("[data-conversation-subtitle]").textContent = `Приватный рабочий поток со специалистом: ${person.role.toLowerCase()}.`;
  $("[data-flow-label]").textContent = "ЛИЧНЫЙ РАЗГОВОР";
  $("[data-flow-title]").textContent = `${person.name} · текущая задача`;
  $("[data-presence-note]").textContent = "Личный рабочий поток";
  const lines = personalLines[key] || [
    { speaker: "svetochka", time: "сейчас", text: `${person.name}, покажи, над чем ты сейчас работаешь.` },
    { speaker: key, time: "сейчас", text: person.quote.replace(/[«»]/g, "") },
  ];
  $("[data-conversation-feed]").innerHTML = lines.map((line, index) => lineMarkup(line, index === lines.length - 1)).join("");
  installImageFallbacks($("[data-conversation-feed]"));
  bindDrawerButtons();
  bindListenButtons();
  setSpeaker(lines.at(-1).speaker);
}

$$('[data-person]').forEach((button) => button.addEventListener("click", () => showPerson(button.dataset.person)));
$$('[data-member]').forEach((button) => button.addEventListener("click", () => showPerson(button.dataset.member)));
$$('[data-show-team]').forEach((button) => button.addEventListener("click", showTeam));
$$('[data-member-jump]').forEach((button) => button.addEventListener("click", () => { setView("team"); showPerson(button.dataset.memberJump); }));

const drawerData = {
  contract: { type: "ДОКУМЕНТ · ЮР", title: "Договор на внедрение", heading: "Договор на внедрение AI-сотрудника", copy: "Два пункта требуют решения Светочки. Остальные формулировки проверены." },
  brief: { type: "РЕЗУЛЬТАТЫ · КОМАНДА", title: "Материалы к запуску", heading: "Два результата уже на столе", copy: "Договор проверен Юром, а Маркетолог и Контент-агент подготовили бриф будущего ролика." },
};
function openDrawer(kind) {
  const data = drawerData[kind] || drawerData.brief;
  $("[data-drawer-type]").textContent = data.type;
  $("[data-drawer-title]").textContent = data.title;
  $("[data-drawer-heading]").textContent = data.heading;
  $("[data-drawer-copy]").textContent = data.copy;
  $("[data-result-drawer]").hidden = false;
  $("[data-close-drawer]").focus();
}
function closeDrawer() { $("[data-result-drawer]").hidden = true; }
function bindDrawerButtons() { $$('[data-open-drawer]').forEach((button) => { if (!button.dataset.bound) { button.dataset.bound = "true"; button.addEventListener("click", () => openDrawer(button.dataset.openDrawer)); } }); }
bindDrawerButtons();
$("[data-close-drawer]").addEventListener("click", closeDrawer);

let voiceDemoTimer;
function bindListenButtons() {
  $$('[data-listen]').forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      clearTimeout(voiceDemoTimer);
      $$('[data-listen]').forEach((item) => { item.classList.remove("is-playing"); item.setAttribute("aria-pressed", "false"); });
      button.classList.add("is-playing");
      button.setAttribute("aria-pressed", "true");
      setSpeaker(button.dataset.listen);
      showToast("В закрытом Office голос будет доступен. Сейчас это визуальная демонстрация.");
      voiceDemoTimer = setTimeout(() => { button.classList.remove("is-playing"); button.setAttribute("aria-pressed", "false"); }, 1700);
    });
  });
}
bindListenButtons();

const historyToggle = $("[data-history-toggle]");
historyToggle.addEventListener("click", () => {
  const expanded = historyToggle.getAttribute("aria-expanded") !== "true";
  historyToggle.setAttribute("aria-expanded", String(expanded));
  $("#history-panel").hidden = !expanded;
});

const attachButton = $("[data-attach]");
const attachMenu = $("#attach-menu");
function closeAttach() { attachButton.setAttribute("aria-expanded", "false"); attachMenu.hidden = true; }
attachButton.addEventListener("click", () => {
  const open = attachMenu.hidden;
  attachButton.setAttribute("aria-expanded", String(open));
  attachMenu.hidden = !open;
  if (open) $("[data-demo-file]", attachMenu).focus();
});
$$('[data-demo-file]').forEach((button) => button.addEventListener("click", () => {
  $("[data-chip-name]").textContent = button.querySelector("b").textContent;
  $("[data-chip]").hidden = false;
  closeAttach();
  $("[data-message]").focus();
  showToast("Выбран демонстрационный файл. Ничего не загружено.");
}));
$("[data-remove-chip]").addEventListener("click", () => { $("[data-chip]").hidden = true; showToast("Демонстрационный файл убран."); });
document.addEventListener("click", (event) => { if (!event.target.closest(".attach-wrap")) closeAttach(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeAttach(); closeDrawer(); } });

const workResults = {
  proposal: ["Коммерческое предложение", "Вик и Продавец собирают финальную версию. Готовность — 68%."],
  campaign: ["Кампания запуска", "Маркетолог проверяет стратегию, Контент-агент готовит три формата."],
  contract: ["Договор на внедрение", "Юр отметил два пункта, которые должен решить человек."],
  research: ["Обзор рынка", "Аналитик подготовил проверяемый демонстрационный отчёт."],
  cashflow: ["Юнит-экономика", "Финансист и бухгалтер собрали расчёт в одной таблице."],
};
$$('[data-task]').forEach((card) => card.addEventListener("click", () => {
  $$('[data-task]').forEach((item) => item.classList.toggle("is-selected", item === card));
  const [title, note] = workResults[card.dataset.task];
  const preview = $("[data-work-preview]");
  $("small", preview).textContent = "РЕЗУЛЬТАТ ЗАДАЧИ";
  $("strong", preview).textContent = title;
  $("p", preview).textContent = note;
}));

const rangeData = { 7: [38, 11, "19 ч", 1], 30: [148, 36, "74 ч", 2], 90: [432, 107, "219 ч", 4] };
$$('[data-range]').forEach((button) => button.addEventListener("click", () => {
  $$('[data-range]').forEach((item) => item.classList.toggle("is-active", item === button));
  const values = rangeData[button.dataset.range];
  $("[data-kpi='leads']").textContent = values[0];
  $("[data-kpi='results']").textContent = values[1];
  $("[data-kpi='hours']").textContent = values[2];
  $("[data-kpi='review']").textContent = values[3];
}));

function appendLine(line, live = true) {
  const feed = $("[data-conversation-feed]");
  feed.insertAdjacentHTML("beforeend", lineMarkup(line, live));
  installImageFallbacks(feed.lastElementChild);
  bindListenButtons();
  setSpeaker(line.speaker);
  feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
}

$("[data-send]").addEventListener("click", () => {
  const field = $("[data-message]");
  if (!field.value.trim() && $("[data-chip]").hidden) { showToast("Напишите демонстрационную задачу или выберите пример файла."); return; }
  clearInterval(speakerTimer);
  clearReplyTimers();
  const message = field.value.trim() || "Проверьте прикреплённый пример";
  appendLine({ speaker: "svetochka", time: "сейчас", text: message });
  historyToggle.querySelector("span:first-child").innerHTML = `<i class="transcript-speaker">С</i><strong>Светочка:</strong> ${escapeHtml(message)}`;
  field.value = "";
  $("[data-chip]").hidden = true;
  if (conversationMode === "team") {
    const replies = [
      { delay: 700, line: { speaker: "adam", time: "сейчас", text: "Принял. Разложу задачу по ролям и соберу общий результат здесь." } },
      { delay: 1400, line: { speaker: "marketing", time: "сейчас", text: "Проверю смысл и передам Контент-агенту точное направление." } },
      { delay: 2100, line: { speaker: "vik", time: "сейчас", text: "А я подготовлю короткое объяснение для клиента. Команда уже в работе." } },
    ];
    replies.forEach(({ delay, line }, index) => replyTimers.push(setTimeout(() => { appendLine(line); if (index === replies.length - 1) startSpeakerCycle(); }, delay)));
  }
  showToast("Реплика появилась на общем столе. На сервер ничего не отправлено.");
});
$("[data-message]").addEventListener("keydown", (event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); $("[data-send]").click(); } });

$("[data-voice-demo]").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const active = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!active));
  button.classList.toggle("is-listening", !active);
  showToast("В закрытом Office голос будет доступен. Микрофон сейчас не включается.");
  if (!active) setTimeout(() => { button.classList.remove("is-listening"); button.setAttribute("aria-pressed", "false"); }, 1700);
});

$$('[data-demo-action]').forEach((button) => button.addEventListener("click", () => showToast("В полной версии здесь откроется настоящий результат. Сейчас это безопасный макет.")));
$("[data-select-result]").addEventListener("click", () => { setView("team"); showTeam(); openDrawer("brief"); });

let toastTimer;
function showToast(message) {
  const toast = $("[data-toast]");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  toastTimer = setTimeout(() => { toast.classList.remove("is-visible"); setTimeout(() => { toast.hidden = true; }, 220); }, 2600);
}
function escapeHtml(value) { const span = document.createElement("span"); span.textContent = value; return span.innerHTML; }

showTeam();

