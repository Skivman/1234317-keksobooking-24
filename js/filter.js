import { renderSecondaryMarkers, layerGroup } from './map.js';
import {debounce} from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = [...mapFilters.querySelectorAll('[type="checkbox"]')];
const MAX_OFFERS_PER_TIME = 10;
const DEBOUNCE_TIME = 500;
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

const getFiltersData = (announcements) => announcements.filter((announcement) => filterByHousingType(announcement) &&
      filterByPrice(announcement) &&
      filterByRooms(announcement) &&
      filterByGuests(announcement) &&
      filterByFeatures(announcement));

const getFiltered = (incoming) => {
  const clonedOffers = incoming.slice();
  renderSecondaryMarkers(clonedOffers.slice(0, MAX_OFFERS_PER_TIME));
  mapFilters.addEventListener('change', debounce(() => {
    layerGroup.clearLayers();
    renderSecondaryMarkers(getFiltersData(clonedOffers).slice(0, MAX_OFFERS_PER_TIME));
  }), DEBOUNCE_TIME);
};

export {getFiltered};
