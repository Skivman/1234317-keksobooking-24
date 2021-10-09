import {TYPES, CHECK_IN_OUT, FEATURES, PHOTOS, OFFER_TITLES, OFFER_DESCRIPTIONS} from './constants.js';
import {getRandomNumber, getRandomFloatNumber, getRandomIndex, getRandomLengthArray} from './util.js';

//Случайный аватар
const getNewUser = () => {
  const number = getRandomNumber(1, 10);
  const avatarNumber = number < 10 ? `0${number}` : number;
  return {
    avatar: `/img/avatars/user${avatarNumber}.png`,
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

export {getNewUser, getNewLocation, getNewOffer};
