import {mapView, mainMarker} from './map.js';

const adForm = document.querySelector('.ad-form');
const features = Array.from(adForm.querySelector('.features').children);
const resetButton = document.querySelector('.ad-form__reset');

//Функция очистки формы
const clearForm = () => {
  adForm.querySelector('#title').value = '';
  adForm.querySelector('#price').value = '';
  adForm.querySelector('#room_number').value = '1';
  adForm.querySelector('#capacity').value = '1';
  adForm.querySelector('#timein').value = '12:00';
  adForm.querySelector('#timeout').value = '12:00';
  features.forEach((element) => {
    if (element.checked) {
      element.checked = false;
    }
  });
  mapView.closePopup();
  mainMarker.setLatLng({
    lat: 35.6892,
    lng: 139.692,
  });
  mapView.setView({
    lat: 35.6892,
    lng: 139.692,
  }, 10);
};

//Обработчик добавления сообщения об успешной отправке и его снятия по клику или клавишей Esc
const onSuccess = () =>{
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
const onError = () => {
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
const onReset = () => {
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
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      });
  });
};

export {setFormSubmit, onReset};
