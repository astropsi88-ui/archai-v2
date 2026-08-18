/* Публичная стартовая ценовая сетка ARCH_AI — ориентиры v1, 2026-08-18. */
const ARCHAI_PUBLIC_PRICING = {
  administrator: {
    implementation: "от 120 000 ₽",
    support: "от 19 900 ₽/мес",
    expenses: "голос и телефония — по факту",
  },
  seller: {
    implementation: "от 150 000 ₽",
    support: "от 24 900 ₽/мес",
    expenses: "API и каналы — по факту",
  },
  service: {
    implementation: "от 120 000 ₽",
    support: "от 19 900 ₽/мес",
    expenses: "API и каналы — по факту",
  },
  site: {
    existing: "от 45 000 ₽",
    new: "от 90 000 ₽",
    support: "по необходимости",
    expenses: "нестандартные сервисы — отдельно",
  },
  office: {
    implementation: "от 350 000 ₽",
    support: "от 49 900 ₽/мес",
    expenses: "инфраструктура и API — по составу",
  },
  exampleAdministrator: {
    implementation: "от 160 000 ₽",
    support: "от 24 900 ₽/мес",
    expenses: "голос и телефония — по факту",
  },
  exampleSeller: {
    implementation: "от 190 000 ₽",
    support: "от 29 900 ₽/мес",
    expenses: "API и каналы — по факту",
  },
  exampleOffice: {
    implementation: "от 450 000 ₽",
    support: "от 59 900 ₽/мес",
    expenses: "инфраструктура и API — по составу",
  },
};
document.querySelectorAll("[data-price-key]").forEach((node) => {
  const [product, field] = node.dataset.priceKey.split(".");
  if (ARCHAI_PUBLIC_PRICING[product]?.[field]) {
    node.textContent = ARCHAI_PUBLIC_PRICING[product][field];
  }
});
