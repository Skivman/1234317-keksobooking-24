import {setFormSubmit, onReset} from './fetch-utils.js';
import {getSecondaryMarkers} from './map.js';

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    getSecondaryMarkers(offers);
  })
  .catch(() => {
    alert('Извините, данные не удалось загрузить');
  });

setFormSubmit();
onReset();
