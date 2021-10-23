//Возвращение случайного целого числа. Решение взято с MDN Web Docs.
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
}

//Возвращение случайного числа с плавающей точкой и выбранным количеством знаков после запятой(для keksobooking'a). Метод .toFixed() подглядел на StackOverflow.
function getRandomFloatNumber (min, max, numberLeft) {
  return Math.abs((Math.random() * (max - min) + min).toFixed(numberLeft));
}

//Функция случайного индекса из массива
const getRandomIndex = (arr) => arr[(Math.floor(Math.random() * arr.length))];

//Функция для создания массива случайной длины
const getRandomLengthArray = (arr) => arr.slice(0, Math.floor(Math.random() * arr.length + 1));

//Функция для правильных окончаний в строке описания количества комнат
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

export {getRandomNumber, getRandomFloatNumber, getRandomIndex, getRandomLengthArray, getCorrectEndings};
