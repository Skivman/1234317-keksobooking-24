import {setFormSubmit, onReset} from './fetch-utils.js';
import {getFiltered} from './filter.js'
import {debounce} from './utils/debounce.js'

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
      getFiltered(offers)
  })
  .catch(() => {
    alert('Извините, данные не удалось загрузить');
  });

setFormSubmit();
onReset();
