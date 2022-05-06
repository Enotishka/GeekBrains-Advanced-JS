class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = {};
  }
  addTopping(topping) {
    this.toppings[topping.name] = topping;
  }
  removeTopping(toppingName) {
    delete this.toppings[toppingName];
  }
  getToppings() {
    return this.toppings;
  }
  getSize() {
    return this.size;
  }
  getStuffing() {
    return this.stuffing;
  }
  calculatePrice() {
    let price = 0;
    price += this.size.price;
    price += this.stuffing.price;
    price += Object.keys(this.toppings).reduce(
      (acc, toppingName) => acc + this.toppings[toppingName].price,
      0
    );
    return price;
  }

  calculateCalories() {
    let calories = 0;
    calories += this.size.calories;
    calories += this.stuffing.calories;
    calories += Object.keys(this.toppings).reduce(
      (acc, toppingName) => acc + this.toppings[toppingName].calories,
      0
    );
    return calories;
  }
}

class HamburgerSize {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

class Ingredient {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

const small = new HamburgerSize("Маленький", 50, 20);
const big = new HamburgerSize("Большой", 100, 40);

const cheese = new Ingredient("С сыром", 10, 20);
const salad = new Ingredient("С салатом", 20, 5);
const potato = new Ingredient("С картофелем", 15, 10);

const seasoning = new Ingredient("Приправа", 15, 0);
const mayo = new Ingredient("Майонез", 20, 5);

const hamburger1 = new Hamburger(small, cheese);
hamburger1.addTopping(seasoning);
console.log(hamburger1.calculatePrice());
console.log(hamburger1.calculateCalories());

const hamburger2 = new Hamburger(big, salad);
hamburger2.addTopping(seasoning);
hamburger2.addTopping(mayo);
console.log(hamburger2.calculatePrice());
console.log(hamburger2.calculateCalories());
