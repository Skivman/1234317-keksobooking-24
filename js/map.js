import {fillOfferTemplate} from './card-popup.js';
import {getMockAds} from './mock-data.js';

//Переменные для секции карты
const userForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const mainMapAddress = document.querySelector('#address');


//Функция, делающая страницу неактивной (вместе с картой)
const disableForm = () =>  {
  const arrayToDisable = [mapForm, userForm];
  arrayToDisable.forEach((container) => {
    container.classList.add(`${container.className}--disabled`);
  });
  const mapElements = Array.from(mapForm.children);
  mapElements.forEach((element) => {
    element.disabled = true;
  });
  const formElements = Array.from(userForm.children);
  formElements.forEach((element) => {
    element.disabled = true;
  });
};

disableForm();


const enableForm = () => {
  const mapOriginalClass = 'map__filters';
  const userFormOriginalClass = 'ad-form';
  mapForm.classList.remove(`${mapOriginalClass}--disabled`);
  userForm.classList.remove(`${userFormOriginalClass}--disabled`);
  const mapElements = Array.from(mapForm.children);
  mapElements.forEach((element) => {
    element.disabled = false;
  });
  const formElements = Array.from(userForm.children);
  formElements.forEach((element) => {
    element.disabled = false;
  });
};

const mapView = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView({
    lat: 35.6892,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapView);

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker({
  lat: 35.6892,
  lng: 139.692,
},
{
  draggable: true,
  icon: mainMarkerIcon,
});
mainMarker.addTo(mapView);

mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  mainMapAddress.value = currentCoordinates;
});

const secondaryMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getSecondaryMarkers = (quantity) => {
  getMockAds(quantity).forEach((element) => {
    const offerInPopup = fillOfferTemplate(element);
    const marker = L.marker({
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      draggable: true,
      icon: secondaryMarkerIcon,
    });
    marker.addTo(mapView)
      .bindPopup(offerInPopup);
  });
};

getSecondaryMarkers(7);
