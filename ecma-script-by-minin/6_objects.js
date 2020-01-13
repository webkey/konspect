// const job = 'Frontend';
//
// const person = {
//   age: 20,
//   name: 'Irina',
//   'country-live': 'Russian',
//   // job: job,
//   job,
//   toString() {
//     return Object
//         .keys(this)
//         .filter(key => key !== 'toString')
//         .map(key => this[key])
//         .join(' ');
//   }
// };
//
// console.log(person.job); // Frontend

// Methods

const obj = {a: 1, b: 2, c: 3};

console.log(Object.keys(obj)); // [ 'a', 'b', 'c' ]
console.log(Object.values(obj)); // [ 1, 2, 3 ]