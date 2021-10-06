//=======ПОСТОЯННЫЕ=========

// Типы сдаваемой жилплощади
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

//Время въезда/выезда
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

//Удобства
const FEATURES = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//Фото
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//Массив с заголовками объявлений
const OFFER_TITLES = ['Предлагаю для сдачи', 'Аренда', 'Лучшая цена'];

//Массив с описанием объявления
const OFFER_DESCRIPTIONS = ['Рядом с центром', 'Необходимая инфраструктура', 'Тихий район', 'Рядом с парком'];

//==========ФУНКЦИИ====================

//Возвращение случайного целого числа. Решение взято с MDN Web Docs.
function getRandomNumber (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
};

//Возвращение случайного числа с плавающей точкой и выбранным количеством знаков после запятой(для keksobooking'a). Метод .toFixed() подглядел на StackOverflow.
function getRandomFloatNumber (min, max, numberLeft) {
	return Math.abs((Math.random() * (max - min) + min).toFixed(numberLeft));
};

//Функция случайного индекса из массива
const getRandomIndex = (arr) => {
	return arr[(Math.floor(Math.random() * arr.length))];
};

//Функция для создания массива случайной длины
const getRandomLengthArray = (arr) => {
	return arr.slice(0, Math.floor(Math.random() * arr.length))
};

//Функция, создающая случайный заголовок
const getRandomTitle = (arr) => {
	return `${getRandomIndex(arr)}`
};

//Функция, создающая случайное описание
const getRandomDescription = (arr) => {
	return getRandomLengthArray(arr).join('.')
};

//=========ОБЪЕКТЫ=============
//Случайный аватар
const getNewUser = () => {
		const number = getRandomNumber(1, 10);
		const avatarNumber = number < 10 ? `0${number}` : number;
	return {
	avatar: `/img/avatars/user${avatarNumber}.png`
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
	title: getRandomTitle(OFFER_TITLES),
	address: `${getRandomFloatNumber(1, 50, 5)} ${getRandomFloatNumber(1, 50, 5)}`,
	price: getRandomNumber(10000, 50000), 
	type: getRandomIndex(TYPES),
	rooms: Math.ceil(Math.random() * 10),
	guests: Math.ceil(Math.random() * 100),
	checkin: getRandomIndex(CHECK_IN_OUT),
	checkout: getRandomIndex(CHECK_IN_OUT),
	features: getRandomLengthArray(FEATURES),
	description: getRandomDescription(OFFER_DESCRIPTIONS),
	photos: getRandomLengthArray(PHOTOS),
	}
};


const getOffer = () => {
	return {
		author: getNewUser(),
		location: getNewLocation(),
		offer: getNewOffer()
	}
};

const getMockAds = () => {
	return new Array(10).fill('').map(getOffer);
};
