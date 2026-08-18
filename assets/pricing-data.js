/* Единственная публичная точка подстановки цен. До утверждения цифр оставляем честные статусы. */
const ARCHAI_PUBLIC_PRICING={
  administrator:{implementation:'После диагностики',support:'Индивидуальный расчёт'},
  seller:{implementation:'После диагностики',support:'Индивидуальный расчёт'},
  service:{implementation:'После диагностики',support:'Индивидуальный расчёт'},
  office:{implementation:'Индивидуальный проект',support:'По составу системы'}
};
document.querySelectorAll('[data-price-key]').forEach(node=>{
  const [product,field]=node.dataset.priceKey.split('.');
  if(ARCHAI_PUBLIC_PRICING[product]?.[field])node.textContent=ARCHAI_PUBLIC_PRICING[product][field];
});
