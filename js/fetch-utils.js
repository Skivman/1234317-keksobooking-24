import {mapView, mainMarker, TOKIO, START_SCALE} from './map.js';

const adForm = document.querySelector('.ad-form');
const features = Array.from(adForm.querySelector('.features').children);
const resetButton = document.querySelector('.ad-form__reset');
const ROOMS_DEFAULT = '1';
const TIME_DEFAULT = '12:00';

//Функция очистки формы
const clearForm = () => {
  adForm.querySelector('#title').value = '';
  adForm.querySelector('#price').value = '';
  adForm.querySelector('#room_number').value = ROOMS_DEFAULT;
  adForm.querySelector('#capacity').value = ROOMS_DEFAULT;
  adForm.querySelector('#timein').value = TIME_DEFAULT;
  adForm.querySelector('#timeout').value = TIME_DEFAULT;
  features.forEach((element) => {
    if (element.checked) {
      element.checked = false;
    }
  });
  mapView.closePopup();
  mainMarker.setLatLng({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  });
  mapView.setView({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  }, START_SCALE);
};

//Обработчик добавления сообщения об успешной отправке и его снятия по клику или клавишей Esc
const getSuccessMessage = () =>{
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);
  successMessage.addEventListener('click', () => {
    successMessage.remove();
    clearForm();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
      clearForm();
    }
  });
};
//Вывод сообщения об ошибке отправки
const getErrorMessage = () => {
  const failTemplate = document.querySelector('#error').content.querySelector('.error');
  const failMessage = failTemplate.cloneNode(true);
  document.body.append(failMessage);
  failMessage.addEventListener('click', () => {
    failMessage.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      failMessage.remove();
    }
  });
};

//Обработчик кнопки "сбросить"
const resetForm = () => {
  resetButton.addEventListener('click', () => {
    clearForm();
  });
};

//Обработка отправки формы
const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        if (response.ok) {
          getSuccessMessage();
        } else {
          getErrorMessage();
        }
      })
      .catch(() => {
        getErrorMessage();
      });
  });
};

export {setFormSubmit, resetForm};
