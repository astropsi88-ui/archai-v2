const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const people = {
  svetochka: { name: "Svetochka", role: "ARCH_AI creator · fictional dialogue", initials: "S", image: "../assets/images/svetlana-itaf.jpg", quote: "«Let us make the example clear at a glance.»" },
  adam: { name: "Adam", role: "Coauthor · architect · fictional dialogue", initials: "A", quote: "«In this scenario, I connect the ideas into a coherent solution.»" },
  vik: { name: "Vik", role: "AI consultant · fictional dialogue", initials: "V", image: "../assets/video/vik-intro-4x5-poster.jpg", quote: "«In this scenario, I clarify the task and suggest suitable AI roles.»" },
  admin: { name: "Administrator", role: "Scheduling · organization", initials: "AD", quote: "«This example includes two fictional inquiries and a team question.»" },
  seller: { name: "Salesperson", role: "Leads · proposals", initials: "SA", quote: "«The fictional need is clear and a sample next step is set.»" },
  marketing: { name: "Marketer", role: "Strategy · review", initials: "M", quote: "«I would review the message, offer and campaign logic.»" },
  content: { name: "Content Agent", role: "Writing · video", initials: "C", quote: "«I would draft a video and posts, then return them for review.»" },
  analyst: { name: "Analyst", role: "Market · decisions", initials: "AN", quote: "«I would explain the sample figures and compare options.»" },
  finance: { name: "Finance + Accounting", role: "Finance · accounting", initials: "F", quote: "«The sample calculation lists costs and risks separately.»" },
  yur: { name: "Legal", role: "Agreements · review", initials: "L", quote: "«I reviewed the wording. Two clauses in the contract still need Svetochka’s decision.»" },
};

const teamLines = [
  { speaker: "svetochka", time: "14:20", text: "Let us plan a clear launch: what will we show people, and who is responsible for each part?" },
  { speaker: "adam", time: "14:20", text: "In this fictional scenario, a task enters once, passes between AI roles, and produces a shared result." },
  { speaker: "marketing", time: "14:21", text: "Then the central message is «your ready-to-work AI team». I will review the offer and campaign logic." },
  { speaker: "content", time: "14:21", text: "I will draft a short video and three posts around that message, then return them to the Marketer for review." },
  { speaker: "yur", time: "14:22", text: "I reviewed the wording. Two clauses in the contract still need Svetochka’s decision.", attachment: "contract" },
  { speaker: "vik", time: "14:23", text: "In this example, I would greet a visitor, clarify their task and introduce suitable AI roles, with a brief explanation." },
];

const personalLines = {
  svetochka: [
    { speaker: "svetochka", time: "demo time", text: "Give me a short sample summary: what is ready and what needs my decision?" },
    { speaker: "adam", time: "demo time", text: "The sample offer, content plan and agreement are ready. Legal flagged two clauses for your decision." },
  ],
  adam: [
    { speaker: "svetochka", time: "14:28", text: "Adam, connect this example into one clear product." },
    { speaker: "adam", time: "14:28", text: "In this scripted example: one task entry, clear handoffs between AI roles and a shared result in the workspace." },
  ],
  vik: [
    { speaker: "svetochka", time: "14:29", text: "Vik, how would you greet a visitor?" },
    { speaker: "vik", time: "14:29", text: "I would greet them, ask two short questions and suggest AI roles suited to their business." },
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
      fallback.textContent = image.alt === "Adam" ? "A" : (image.alt || "A").slice(0, 1);
      fallback.setAttribute("aria-label", image.alt || "Avatar");
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
  const attachment = line.attachment === "contract" ? `<button type="button" data-open-drawer="contract"><span aria-hidden="true">▤</span><span><b>Implementation agreement</b><small>2 comments · open</small></span><em>↗</em></button>` : "";
  const listen = line.speaker === "svetochka" ? "" : `<button class="listen-button" type="button" data-listen="${line.speaker}" aria-label="Simulate listening to ${person.name}" title="Simulate listening"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M17 9a4 4 0 010 6M19 6a8 8 0 010 12"/></svg><span>Simulate listening</span><i aria-hidden="true"><b></b><b></b><b></b></i></button>`;
  return `<article class="conversation-line${live ? " is-live" : ""}${attachment ? " with-attachment" : ""}" data-speaker="${line.speaker}">${avatarMarkup(line.speaker)}<div><header><strong>${person.name}</strong><time>${line.time}</time>${listen}${live ? "<em>demo speaker</em>" : ""}</header><p>${escapeHtml(line.text)}</p>${attachment}</div></article>`;
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
    if (active) header.insertAdjacentHTML("beforeend", "<em>demo speaker</em>");
  });
  $("[data-conversation-state]").textContent = `Demo speaker: ${person.name}`;
  $("[data-presence-title]").textContent = `${person.name} demo speaker`;
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
  $("[data-conversation-title]").textContent = "Shared workspace";
  $("[data-conversation-subtitle]").textContent = "Fictional people, statuses and dialogue. One Vik, one Adam; idle Adam is not woken. This is not the owner-private Office.";
  $("[data-flow-label]").textContent = "FICTIONAL TEAM CONVERSATION";
  $("[data-flow-title]").textContent = "Sample product launch discussion";
  $("[data-presence-note]").textContent = "Shared workspace";
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
  $("[data-conversation-title]").textContent = `Sample conversation · ${person.name}`;
  $("[data-conversation-subtitle]").textContent = `Fictional conversation with the role: ${person.role.toLowerCase()}.`;
  $("[data-flow-label]").textContent = "FICTIONAL CONVERSATION";
  $("[data-flow-title]").textContent = `${person.name} · sample task`;
  $("[data-presence-note]").textContent = "Fictional sample conversation";
  const lines = personalLines[key] || [
    { speaker: "svetochka", time: "demo time", text: `${person.name}, show the task in this fictional scenario.` },
    { speaker: key, time: "demo time", text: person.quote.replace(/[«»]/g, "") },
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
  contract: { type: "DOCUMENT · LEGAL", title: "Implementation agreement", heading: "AI employee implementation agreement", copy: "I reviewed the wording. Two clauses in the contract still need Svetochka’s decision." },
  brief: { type: "SAMPLE TEAM RESULTS", title: "Sample launch materials", heading: "Two sample results to explore", copy: "In this scenario, Legal reviewed the agreement; the Marketer and Content Agent drafted a video brief." },
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
      showToast("Local visual voice simulation only. No audio, microphone or connection is used.");
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
  showToast("Sample attachment selected. Nothing was uploaded.");
}));
$("[data-remove-chip]").addEventListener("click", () => { $("[data-chip]").hidden = true; showToast("Sample attachment removed."); });
document.addEventListener("click", (event) => { if (!event.target.closest(".attach-wrap")) closeAttach(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeAttach(); closeDrawer(); } });

const workResults = {
  proposal: ["Proposal", "Fictional scenario: Vik and the Salesperson draft a proposal. Sample progress: 68%."],
  campaign: ["Launch campaign", "Fictional scenario: the Marketer reviews strategy; the Content Agent drafts three formats."],
  contract: ["Implementation agreement", "I reviewed the wording. Two clauses in the contract still need Svetochka’s decision."],
  research: ["Market overview", "Fictional scenario: the Analyst presents a synthetic sample report."],
  cashflow: ["Unit economics", "Fictional scenario: Finance and Accounting presents one sample spreadsheet."],
};
$$('[data-task]').forEach((card) => card.addEventListener("click", () => {
  $$('[data-task]').forEach((item) => item.classList.toggle("is-selected", item === card));
  const [title, note] = workResults[card.dataset.task];
  const preview = $("[data-work-preview]");
  $("small", preview).textContent = "SAMPLE TASK RESULT";
  $("strong", preview).textContent = title;
  $("p", preview).textContent = note;
}));

const rangeData = { 7: [38, 11, "19 h", 1], 30: [148, 36, "74 h", 2], 90: [432, 107, "219 h", 4] };
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
  if (!field.value.trim() && $("[data-chip]").hidden) { showToast("Type a fictional task or select a sample attachment."); return; }
  clearInterval(speakerTimer);
  clearReplyTimers();
  const message = field.value.trim() || "Review the selected sample";
  appendLine({ speaker: "svetochka", time: "demo time", text: message });
  historyToggle.querySelector("span:first-child").innerHTML = `<i class="transcript-speaker">S</i><strong>Svetochka:</strong> ${escapeHtml(message)}`;
  field.value = "";
  $("[data-chip]").hidden = true;
  if (conversationMode === "team") {
    const replies = [
      { delay: 700, line: { speaker: "adam", time: "demo time", text: "Scripted Adam reply: this example splits a task among roles and shows a shared result. No idle Adam is woken." } },
      { delay: 1400, line: { speaker: "marketing", time: "demo time", text: "Scripted reply: I would review the message and outline a direction for the Content Agent." } },
      { delay: 2100, line: { speaker: "vik", time: "demo time", text: "Scripted Vik reply: I would draft a short explanation. These replies are local simulation; no employees are running." } },
    ];
    replies.forEach(({ delay, line }, index) => replyTimers.push(setTimeout(() => { appendLine(line); if (index === replies.length - 1) startSpeakerCycle(); }, delay)));
  }
  showToast("Message shown locally in the demo. Nothing was sent to a server.");
});
$("[data-message]").addEventListener("keydown", (event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); $("[data-send]").click(); } });

$("[data-voice-demo]").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const active = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!active));
  button.classList.toggle("is-listening", !active);
  showToast("Local visual voice simulation only. No microphone, audio or network connection is used.");
  if (!active) setTimeout(() => { button.classList.remove("is-listening"); button.setAttribute("aria-pressed", "false"); }, 1700);
});

$$('[data-demo-action]').forEach((button) => button.addEventListener("click", () => showToast("This is a fictional sample preview. No real document or production action is opened.")));
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
