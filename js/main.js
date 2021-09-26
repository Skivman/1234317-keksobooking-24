//Возвращение случайного целого числа. Решение взято с MDN Web Docs.
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.abs(Math.floor(Math.random() * (max - min) + min));
}
getRandomNumber(2, 4);
//Возвращение случайного числа с плавающей точкой и выбранным количеством знаков после запятой(для keksobooking'a). Метод .toFixed() подглядел на StackOverflow.
function getRandomFloatNumber (min, max, numberLeft) {
  return Math.abs((Math.random() * (max - min) + min).toFixed(numberLeft));
}
getRandomFloatNumber(2, 34, 4);
