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
const getRandomLengthArray = (arr) => arr.slice(0, Math.floor(Math.random() * arr.length));

export {getRandomNumber, getRandomFloatNumber, getRandomIndex, getRandomLengthArray};
