import { getSecondaryMarkers } from './map.js';


const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = [...filtersForm.querySelectorAll('[type="checkbox"]')];
const filtersFormElements = [...filtersForm.children];
const Default = {
  OFFER_TYPE: housingType.value,
  OFFER_PRICE: housingPrice.value,
  OFFER_ROOMS: housingRooms.value,
  OFFER_GUESTS: housingGuests.value,
  OFFER_FEATURES: housingFeatures.value,
}
const HOUSING_TYPE_VALUES = {
  'any': (value) => value,
  'bungalow': (value) => value === 'bungalow',
  'hotel': (value) => value === 'hotel',
  'house': (value) => value === 'house',
  'flat': (value) => value === 'flat',
  'palace': (value) => value === 'palace',
};
const PRICE_VALUES = {
  'any': (value) => value,
  'middle': (value) => value >= 10000 && value <= 50000,
  'low': (value) => value <= 10000,
  'high': (value) => value >= 50000,
};
const ROOMS_VALUES = {
  'any': (value) => value,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
  '3': (value) => value === 3,
};
const GUESTS_VALUES = {
  'any': (value) => value,
  '0': (value) => value === 0,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
};
const filterByHousingType = (sortItem) => {
  const type = sortItem.offer.type;
  return HOUSING_TYPE_VALUES[housingType.value](type);
};
const filterByPrice = (sortItem) => {
  const price = sortItem.offer.price;
  return PRICE_VALUES[housingPrice.value](price);
};
const filterByRooms = (sortItem) => {
  const rooms = sortItem.offer.rooms;
  return ROOMS_VALUES[housingRooms.value](rooms);
};
const filterByGuests = (sortItem) => {
  const guests = sortItem.offer.guests;
  return GUESTS_VALUES[housingGuests.value](guests);
};
const filterByFeatures = (sortItem) => {
  const features = sortItem.offer.features;
  const selectedFeatures = housingFeatures.filter((input) => input.checked);
  return selectedFeatures.every((feature) => features && features.includes(feature.value));
};

function getFiltersData(announcements) {
  return announcements.filter((announcement) => filterByHousingType(announcement) &&
      filterByPrice(announcement) &&
      filterByRooms(announcement) &&
      filterByGuests(announcement) &&
      filterByFeatures(announcement));
}

const changeFilter = (data) => {
  filtersFormElements.forEach((element) => {
    element.addEventListener('input', () => {
      console.log(getFiltersData(data));
    });
  });
};

const getOfferPriority = (offer) => {
  let priority = 0;
  if (offer.type === housingType || Default.OFFER_TYPE) {
    priority += 5;
  }
  if (offer.price === housingPrice || Default.OFFER_PRICE) {
    priority += 4;
  }
  if (offer.rooms === housingRooms || Default.OFFER_ROOMS) {
    priority += 3;
  }
  if (offer.guests === housingGuests || Default.OFFER_GUESTS) {
    priority += 2;
  }
  if (offer.features === housingFeatures || Default.OFFER_FEATURES) {
    priority += 1;
  }
  return priority;
};

const compareOffers = (offerA, offerB) => {
  const priorityA = getOfferPriority(offerA);
  const priorityB = getOfferPriority(offerB);

  return priorityB - priorityA;
};

export {getFiltersData, changeFilter, compareOffers, filtersForm};
