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
const fillOfferTemplate =  ({author, offer}) => {
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
    const popupFeatures = offerElement.querySelector('.popup__features');
    const featuresListItemsArray = Array.from(popupFeatures.children);
    featuresListItemsArray.forEach((item) => {
      const isNecessary = offer.features.some((feature) => item.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        item.remove();
      }
    });
  }
  if (offer.description) {
    offerElement.querySelector('.popup__description').textContent = offer.description || 'Нет описания';
  }
  if (offer.photos) {
    const popupPhotos = offerElement.querySelector('.popup__photos');
    offer.photos.forEach((photo) => {
      const newPhotoItem = document.createElement('img');
      newPhotoItem.src = `${photo}`;
      newPhotoItem.classList.add('popup__photo');
      newPhotoItem.width = '45';
      newPhotoItem.height = '40';
      newPhotoItem.alt = 'Фотография жилья';
      popupPhotos.appendChild(newPhotoItem);
    });
  }
  if (author.avatar) {
    offerElement.querySelector('.popup__avatar').src = author.avatar;
  }
  return offerElement;
};


export {fillOfferTemplate};

