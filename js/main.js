//Возвращение случайного целого числа. Решение взято с MDN Web Docs.
function getRandFrom (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min) {
    return 'Максимальное значение должно быть больше минимального';
  }
  return Math.floor(Math.random() * (max - min) + min);
}
  
getRandFrom(2, 4);
  
//Возвращение случайного числа с плавающей точкой и выбранным количеством знаков после запятой(для keksobooking'a). Метод .toFixed() подглядел на StackOverflow.
function getRandFloat (min, max, numberLeft) {
  if (max <= min) {
    return 'Максимальное значение должно быть больше минимального';
  }
  return (Math.random() * (max - min) + min).toFixed(numberLeft);
}
  
getRandFloat(2, 34, 4);
  