import {getNewUser, getNewLocation, getNewOffer} from './random-objects';

const getOffer = () => ({
  author: getNewUser(),
  location: getNewLocation(),
  offer: getNewOffer(),
});

const getMockAds = () => new Array(10).fill('').map(getOffer);

getMockAds();
