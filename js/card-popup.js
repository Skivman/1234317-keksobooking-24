import {getMockAds} from './mock-data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const cardsList = document.querySelector('#map-canvas');

const similarOffers = getMockAds();

const cardsListFragment = document.createDocumentFragment();

similarOffers.forEach((offer) => {
  const offerElement = cardTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  switch (offer.offer.type) {
    case 'palace':
      offerElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      offerElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      offerElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      offerElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'hotel':
      offerElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }
  const getCorrectEndings = function (guests, rooms) {
    const guestsLastNumber = guests.toString().slice(-1);
    const roomsLastNumber = rooms.toString().slice(-1);
    let roomsString = '';
    let guestsString = '';
    switch (Number(roomsLastNumber)) {
      case 1:
        roomsString = `${rooms} комната`;
        break;
      case 2:
      case 3:
      case 4:
        roomsString = `${rooms} комнаты`;
        break;
      default:
        roomsString = `${rooms} комнат`;
        break;
    }
    switch (Number(guestsLastNumber)) {
      case 1:
        guestsString = ` для ${guests} гостя.`;
        break;
      default:
        guestsString = ` для ${guests} гостей.`;
        break;
    }
    return roomsString+guestsString;
  };
  offerElement.querySelector('.popup__text--capacity').textContent = getCorrectEndings(offer.offer.guests, offer.offer.rooms);
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд после ${offer.offer.checkout}.`;
  offerElement.querySelector('.popup__features').textContent = offer.offer.features;
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  offerElement.querySelector('.popup__photo').src = offer.offer.photos;
  offerElement.querySelector('.popup__avatar').src = offer.author;
  cardsListFragment.appendChild(offerElement);
});

cardsList.appendChild(cardsListFragment);

