/* Публичная ценовая архитектура ARCH_AI — CURRENT, утверждена 2026-08-31. */
const ARCHAI_PUBLIC_PRICING = {
  trial: { implementation: "0 ₽", support: "—" },
  personal: { implementation: "от 50 000 ₽", support: "24 900 ₽/мес после запуска" },
  expanded: { implementation: "от 90 000 ₽", support: "по составу проекта" },
  business: { implementation: "от 120 000 ₽", support: "от 19 900 ₽/мес по составу" },
  administrator: { implementation: "от 120 000 ₽", support: "от 19 900 ₽/мес" },
  service: { implementation: "от 120 000 ₽", support: "от 19 900 ₽/мес" },
  seller: { implementation: "от 150 000 ₽", support: "от 24 900 ₽/мес" },
  office: { implementation: "от 350 000 ₽", support: "от 49 900 ₽/мес" },
  exampleAdministrator: { implementation: "от 160 000 ₽", support: "от 24 900 ₽/мес" },
  exampleSeller: { implementation: "от 190 000 ₽", support: "от 29 900 ₽/мес" },
  exampleOffice: { implementation: "от 450 000 ₽", support: "от 59 900 ₽/мес" },
  text: { included: "входит в 24 900 ₽/мес" },
  tts: { included: "входят в 24 900 ₽/мес" },
  realtime: { usage: "25 ₽/мин", setup: "от 15 000 ₽" },
  phone: { usage: "25 ₽/мин" },
  research: { usage: "от 300 ₽/задача" },
  image: { usage: "от 100 ₽/успешную генерацию" },
  video: { usage: "от 50 ₽/сек" },
  avatarVideo: { usage: "от 80 ₽/сек" },
};
document.querySelectorAll("[data-price-key]").forEach((node) => {
  const [product, field] = node.dataset.priceKey.split(".");
  if (ARCHAI_PUBLIC_PRICING[product]?.[field]) {
    node.textContent = ARCHAI_PUBLIC_PRICING[product][field];
  }
});

