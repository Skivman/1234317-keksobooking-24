//Возвращение случайного целого числа. Решение взято с MDN Web Docs.
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
}
getRandomNumber(2, 4);
//Возвращение случайного числа с плавающей точкой и выбранным количеством знаков после запятой(для keksobooking'a). Метод .toFixed() подглядел на StackOverflow.
function getRandomFloatNumber (min, max, numberLeft) {
  return Math.abs((Math.random() * (max - min) + min).toFixed(numberLeft));
}
getRandomFloatNumber(2, 34, 4);

//Функция для случайного аватара
const getRandomAvatar = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max); 
  const result = Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
  return result < 10 ? '0' + result : result;
};

//Функция случайного индекса из массива
const getRandomIndex = (arr) => {
  return arr[(Math.floor(Math.random() * arr.length - 1))];
}

//Функция для создания массива случайной длины
const getRandomLengthArray = (arr) => {
  return arr.slice(0, Math.floor(Math.random() * arr.length - 1))
};

//=======ПОСТОЯННЫЕ=========

// Типы сдаваемой жилплощади
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

//Время въезда/выезда
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

//Удобства
const FEATURES = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//Фото
const PHOTOES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


//=========ОБЪЕКТЫ=============
  //Случайный аватар
  const getNewUser = () => {
    return {
  avatar: '/img/avatars/user'+getRandomAvatar(1, 10)+'.png'
  }
}; 
  
  //Случайное местоположение
  const getNewLocation =  () => {
  return {
  lat: getRandomFloatNumber(35.65000, 35.70000, 5),
  lng: getRandomFloatNumber(139.70000, 139.80000, 5)
  }
};
 
  //Случайное предложение
  const getNewOffer = () => {
    return {
  title: 'We are happy to syggest you!',
  address: getRandomFloatNumber(1, 50, 5) + ', '+getRandomFloatNumber(1, 50, 5),
  price: getRandomNumber(10000, 50000), 
  type: getRandomIndex(TYPES),
  rooms: Math.ceil(Math.random() * 10),
  guests: Math.ceil(Math.random() * 100),
  checkin: getRandomIndex(CHECK_IN_OUT),
  checkout: getRandomIndex(CHECK_IN_OUT),
  features: getRandomLengthArray(FEATURES),
  description: 'Description text',
  photoes: getRandomLengthArray(PHOTOES),
  }
};


const getOffer = () => {
  return {
    author: getNewUser(),
    location: getNewLocation(),
    offer: getNewOffer()
  }
};

const severalAps = Array.from({length: 10}, getOffer);

const getSeveralAps = () => {
  return severalAps;
}
