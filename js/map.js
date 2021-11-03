//Переменные для секции карты
const userForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

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
