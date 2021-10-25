const MIN_TITLE_LENGHT = 30;
const MAX_TITLE_LENGTH = 100;
const selectType = document.querySelector('#type');
const priceInput = document.querySelector('#price');

selectType.addEventListener('change', () => {
  switch (selectType.value) {
    case 'bungalow':
      priceInput.setAttribute('placeholder', '0');
      priceInput.setAttribute('min', '0');
      break;
    case 'flat':
      priceInput.setAttribute('placeholder', '1000');
      priceInput.setAttribute('min', '1000');
      break;
    case 'hotel':
      priceInput.setAttribute('placeholder', '3000');
      priceInput.setAttribute('min', '3000');
      break;
    case 'house':
      priceInput.setAttribute('placeholder', '5000');
      priceInput.setAttribute('min', '5000');
      break;
    case 'palace':
      priceInput.setAttribute('placeholder', '10000');
      priceInput.setAttribute('min', '10000');
      break;
  }
});

const formTitle = document.querySelector('#title');
formTitle.addEventListener('input', () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_TITLE_LENGHT) {
    formTitle.setCustomValidity (`Ещё ${MIN_TITLE_LENGHT - titleLength} символов`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH}`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});
