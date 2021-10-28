const MIN_TITLE_LENGHT = 30;
const MAX_TITLE_LENGTH = 100;
const typeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const typeMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

typeSelector.addEventListener('change', () => {
  priceInput.setAttribute('placeholder', typeMap[typeSelector.value]);
  priceInput.setAttribute('min', typeMap[typeSelector.value]);
  priceInput.setCustomValidity(`Минимальное значение - ${typeMap[typeSelector.value]} руб.`);
  priceInput.value = '';
  priceInput.reportValidity();
});

const formTitle = document.querySelector('#title');
formTitle.addEventListener('input', () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_TITLE_LENGHT) {
    formTitle.setCustomValidity(`Минимум ${MIN_TITLE_LENGHT - titleLength} символов`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH}`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
const roomQuantity = document.querySelector('#room_number');
const guestQuantity = document.querySelector('#capacity');

roomQuantity.addEventListener('change', () => {
  switch (roomQuantity.value) {
    case '1':
      return guestQuantity.setCustomValidity('Не более 1 гостя');
    case '2':
      return guestQuantity.setCustomValidity('Не более 2 гостей');
    case '3':
      return guestQuantity.setCustomValidity('Не более 3 гостей');
    default:
      return guestQuantity.setCustomValidity('Не для гостей');
  }
});
