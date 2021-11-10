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


//Переменные для полей "время заезда и выезда"
const arrivalField = document.querySelector('#timein');
const departureField = document.querySelector('#timeout');

//Константы для полей "Количество гостей/комнат"
const HUNDRED_ROOMS_VALUE = '100';
const NOT_FOR_GUESTS_VALUE = '0';


//Синхронизация полей "время заезда/выезда"
const switchArrivalDeparture = function (arrival, departure) {
  arrival.addEventListener('change', () => departure.value = arrival.value);
  departure.addEventListener('change', () => arrival.value = departure.value);
};

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

const changeCapacity = function (idOne, idTwo) {
  idOne.addEventListener('click', () => {
    const idOneElements = idOne.children;
    const idOneElementsArray = Array.from(idOneElements);
    const idTwoElements = idTwo.children;
    const idTwoElementsArray = Array.from(idTwoElements);
    idTwo.selectedIndex = -1;
    if (idOne.selectedIndex === idOneElementsArray.length - 1) {
      idTwoElementsArray.forEach((element) => {
        element.disabled = true;
        if (element.value === idTwoElementsArray[idTwoElementsArray.length - 1].value) {
          element.disabled = false;
        }
      });
    } else {
      idTwoElementsArray.forEach((element) => {
        if (Number(element.value) > Number(idOne.value)) {
          element.disabled = true;
        } else if (element.value === idTwoElementsArray[idTwoElementsArray.length - 1].value) {
          element.disabled = true;
        } else {
          element.disabled = false;
        }
      });
    }
  });
  idTwo.addEventListener('click', () => {
    if (Number(idTwo.value) > Number(idOne.value)) {
      idTwo.setCustomValidity('Количество гостей не может превышать количества комнат');
    } else {
      idTwo.setCustomValidity('');
    }
    idTwo.reportValidity();
  });
};


changeCapacity(roomQuantity, guestField);

switchArrivalDeparture(arrivalField, departureField);

