"use strict";
const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

const cashier = {
  name: "Mango",
  customerMoney: 0,
  totalPrice: 0,
  change: 0,
  error: null,
  greet() {
    // let name = cashier.name;
    return console.log(`Добрый день, вас обслуживает ${cashier.name}`);
  },
  getCustomerMoney(value) {
    cashier.customerMoney = value;
    return cashier.customerMoney;
  },
  countTotalPrice(products, order) {
    const keys = Object.keys(order);
    for (const key of keys) {
      cashier.totalPrice += order[key] * products[key];
    }
    return cashier.totalPrice;
  },
  countChange() {
    cashier.change = cashier.customerMoney - cashier.totalPrice;
    return cashier.change;
  },
  onSuccess() {
    console.log(`Спасибо за покупку, ваша сдача ${cashier.change}!`);
  },
  onError() {
    console.log("Очень жаль, вам не хватает денег на покупки");
  },
  reset() {
    cashier.customerMoney = 0;
    cashier.totalPrice = 0;
    cashier.change = 0;
    cashier.error = null;
  }
};

console.log(cashier.name); // Mango
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null

cashier.greet(); // Добрый день, вас обслуживает Mango
// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая products - список всех продуктов и order - список покупок клиента
cashier.countTotalPrice(products, order);

// Проверям что посчитали
console.log(cashier.totalPrice); // 110

// Вызываем getCustomerMoney для запроса денег клиента
cashier.getCustomerMoney(300);

// Проверяем что в поле с деньгами клиента
console.log(cashier.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
cashier.countChange();

// Проверяем что нам вернул countChange
console.log(cashier.change); // 190

// Проверяем результат подсчета денег
if (cashier.change > 0) {
  // При успешном обслуживании вызываем метод onSuccess
  cashier.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  cashier.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
cashier.reset();

// Проверяем значения после reset
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null