"use strict";

let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt("Введите любое число");
  if (Number.isNaN(Number(userInput))) {
    alert("Было введено не число, попробуйте еще раз");
  } else {
    userInput = Number(userInput);

    numbers.push(userInput);
  }
} while (userInput !== 0);

for (const number of numbers) {
  total = total + number;
}
if (numbers.length > 0) {
  alert(`Общая сумма чисел равна: ${total}`);
}
