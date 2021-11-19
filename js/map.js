import {fillOfferTemplate} from './card-popup.js';

//Координаты Токио
const TOKIO = {
  lat: 35.65283,
  lng: 139.83947,
};

//Константа для ограничителя координат
const COORDINATES_LIMIT = 5;

//Константа начального масштаба карты
const START_SCALE = 10;

//Переменные для секции карты
const userForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const mainMapAddress = document.querySelector('#address');


//Функция, делающая страницу неактивной (вместе с картой)
const disableForm = () =>  {
  const formsToDisable = [mapForm, userForm];
  formsToDisable.forEach((container) => {
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
    mainMapAddress.value = `${TOKIO.lat}, ${TOKIO.lng}`;
  })
  .setView({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  }, START_SCALE);

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
  lat: TOKIO.lat,
  lng: TOKIO.lng,
},
{
  draggable: true,
  icon: mainMarkerIcon,
});
mainMarker.addTo(mapView);

mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  mainMapAddress.value = `${currentCoordinates.lat.toFixed(COORDINATES_LIMIT)}, ${currentCoordinates.lng.toFixed(COORDINATES_LIMIT)}`;
});

const secondaryMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const layerGroup = L.layerGroup().addTo(mapView);

const renderSecondaryMarkers = (data) => {
  data.forEach((element) => {
    const offerInPopup = fillOfferTemplate(element);
    const marker = L.marker({
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      icon: secondaryMarkerIcon,
    });
    marker.addTo(layerGroup)
      .bindPopup(offerInPopup);
  });
};

export {renderSecondaryMarkers, mapView, mainMarker, layerGroup, TOKIO, START_SCALE};

