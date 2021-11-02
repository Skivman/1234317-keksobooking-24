//Переменные для полей тип жилья/цена
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
//Переменная для поля заголовка
const formTitle = document.querySelector('#title');
//Переменные для полей количества комнат/гостей
const roomQuantity = document.querySelector('#room_number');
const guestField = document.querySelector('#capacity');
const guestQuantity = document.querySelector('#capacity').children;
//Переменные для секции карты
const userForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
//Переменные для полей "время заезда и выезда"
const arrivalField = document.querySelector('#timein');
const departureField = document.querySelector('#timeout');

//Функция, делающая страницу неактивной (вместе с картой)
const disableForm = function (map, form)  {
  const arrayToDisable = [map, form];
  arrayToDisable.forEach((container) => {
    container.classList.add(`${container.className}--disabled`);
  });
  const mapElements = Array.from(map.children);
  mapElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  const formElements = Array.from(form.children);
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};
// disableForm(mapForm, userForm);

//Обработчик полей "тип/цена"
typeSelector.addEventListener('change', () => {
  priceInput.setAttribute('placeholder', typeMap[typeSelector.value]);
  priceInput.setAttribute('min', typeMap[typeSelector.value]);
  priceInput.value = '';
});

//Обработчик заголовка
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

//Валидация полей "кол-во комнат/гостей"
guestField.setAttribute('disabled', 'disabled');
roomQuantity.addEventListener('change', () => {
  guestField.removeAttribute('disabled');
	roomQuantity.value === '100' ? guestField.value = '0' : guestField.value = roomQuantity.value;
  if (roomQuantity.value === '100') {
    for (let i = 0; i <= guestQuantity.length - 1; i++) {
      guestQuantity[i].setAttribute('disabled', 'disabled');
      if (Number(guestQuantity[i].value) === 0) {
        guestQuantity[i].removeAttribute('disabled');
      }
    }
  } else {
    for (let i = 0; i <= guestQuantity.length - 1; i++) {
      if (Number(guestQuantity[i].value) > Number(roomQuantity.value)) {
        guestQuantity[i].setAttribute('disabled', 'disabled');
      } else if (Number(guestQuantity[i].value) === 0) {
        guestQuantity[i].setAttribute('disabled', 'disabled');
      } else {
        guestQuantity[i].removeAttribute('disabled');
      }
    }
  }
});

//Синхронизация полей "время заезда/выезда"
const switchArrivalDeparture = function (arrival, departure) {
  arrival.addEventListener('change', () => departure.value = arrival.value);
  departure.addEventListener('change', () => arrival.value = departure.value);
};

switchArrivalDeparture(arrivalField, departureField);

