import {getRandomNumber, getRandomFloatNumber, getRandomIndex, getRandomLengthArray} from'./util.js';
// Типы сдаваемой жилплощади
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

//Карта значений типов жилплощади


//Время въезда/выезда
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

//Удобства
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//Фото
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//Массив с заголовками объявлений
const OFFER_TITLES = ['Предлагаю для сдачи', 'Аренда', 'Лучшая цена'];

//Массив с описанием объявления
const OFFER_DESCRIPTIONS = ['Рядом с центром', 'Необходимая инфраструктура', 'Тихий район', 'Рядом с парком'];

//Случайный аватар
const getNewUser = () => {
  const number = getRandomNumber(1, 10);
  const avatarNumber = number < 10 ? `0${number}` : number;
  return {
    avatar: `img/avatars/user${avatarNumber}.png`,
  };
};

//Случайное местоположение
const getNewLocation =  () => ({
  lat: getRandomFloatNumber(35.65000, 35.70000, 5),
  lng: getRandomFloatNumber(139.70000, 139.80000, 5),
});

//Случайное предложение
const getNewOffer = () => ({
  title: `${getRandomIndex(OFFER_TITLES)}`,
  address: `${getRandomFloatNumber(1, 50, 5)} ${getRandomFloatNumber(1, 50, 5)}`,
  price: getRandomNumber(10000, 50000),
  type: getRandomIndex(TYPES),
  rooms: Math.ceil(Math.random() * 10),
  guests: Math.ceil(Math.random() * 100),
  checkin: getRandomIndex(CHECK_IN_OUT),
  checkout: getRandomIndex(CHECK_IN_OUT),
  features: getRandomLengthArray(FEATURES),
  description: `${OFFER_DESCRIPTIONS.slice(0, Math.floor(Math.random() * OFFER_DESCRIPTIONS.length)).join('.')}`,
  photos: getRandomLengthArray(PHOTOS),
});

const getOffer = () => ({
  author: getNewUser(),
  location: getNewLocation(),
  offer: getNewOffer(),
});

const getMockAds = (quantity) => new Array(quantity).fill('').map(getOffer);

export {getMockAds};
