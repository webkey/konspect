// Rest
// function average(a, ...arr) {
//   return arr.reduce((acc, i) => acc += i, 0) / arr.length;
// }
//
// console.log(average(10, 20, 30, 40)); // [20, 30, 40] => 30

// Spread

// const array = [1, 2, 3, 5, 8, 13];

// Клонирование массива array в новый массив fib
// const fib = [1, ...array];
//
// console.log(fib); // [ 1, 1, 2, 3, 5, 8, 13 ]

// Destructuring

// const array = [1, 2, 3, 5, 8, 13];

//
// const [a,, c] = array;
//
// console.log(a); // 1
// console.log(c); // 3

const address = {
  country: 'Russia',
  city: 'Moscow',
  street: 'Lenina',
  concat: function () {
    return `${this.country}, ${this.city}, ${this.street}`;
  }
};

const newAddress = {...address, postCode: 123};

console.log(newAddress.postCode); // 123