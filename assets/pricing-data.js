/* Единственная публичная точка подстановки цен. До утверждения цифр оставляем честные статусы. */
const ARCHAI_PUBLIC_PRICING = {
  administrator: {
    implementation: "от — ₽",
    support: "— ₽/мес",
    expenses: "по факту",
  },
  seller: {
    implementation: "от — ₽",
    support: "— ₽/мес",
    expenses: "по факту",
  },
  service: {
    implementation: "от — ₽",
    support: "— ₽/мес",
    expenses: "по факту",
  },
  office: {
    implementation: "от — ₽",
    support: "— ₽/мес",
    expenses: "по составу системы",
  },
};
document.querySelectorAll("[data-price-key]").forEach((node) => {
  const [product, field] = node.dataset.priceKey.split(".");
  if (ARCHAI_PUBLIC_PRICING[product]?.[field])
    node.textContent = ARCHAI_PUBLIC_PRICING[product][field];
});
