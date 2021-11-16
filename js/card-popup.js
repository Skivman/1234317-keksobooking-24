import {getCorrectEndings} from './util.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const typeTranslation = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
//Заполнение шаблона
const fillOfferTemplate = function ({author, offer}) {
  const offerElement = cardTemplate.cloneNode(true);
  if (offer.title) {
    offerElement.querySelector('.popup__title').textContent = offer.title || 'Нет описания';
  }
  if(offer.address) {
    offerElement.querySelector('.popup__text--address').textContent = offer.address;
  }
  if (offer.price) {
    offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  if (offer.type) {
    offerElement.querySelector('.popup__type').textContent = typeTranslation[offer.type];
  }
  if (offer.guests && offer.rooms) {
    offerElement.querySelector('.popup__text--capacity').textContent = getCorrectEndings(offer.guests, offer.rooms);
  }
  if (offer.checkin && offer.checkout) {
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд после ${offer.checkout}.`;
  }
  if (offer.features) {
    offerElement.querySelector('.popup__features').innerHTML = offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('') || 'Нет удобств';
  }
  if (offer.description) {
    offerElement.querySelector('.popup__description').textContent = offer.description || 'Нет описания';
  }
  if (offer.photos) {
    offerElement.querySelector('.popup__photos').innerHTML = offer.photos.map((photoUrl) => `<img src='${photoUrl}' class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`).join('') || 'Нет фотографий';
  }
  if (author.avatar) {
    offerElement.querySelector('.popup__avatar').src = author.avatar;
  }
  return offerElement;
};
  
//Функция отрисовки DOM-элемента
export function drawOffers(data) {
  const cardsList = document.querySelector('#map-canvas');
  const cardsListFragment = document.createDocumentFragment();
  data.forEach((offer) => {
    cardsListFragment.appendChild(fillOfferTemplate(offer));
    cardsList.appendChild(cardsListFragment);
  });
}

export {fillOfferTemplate};

