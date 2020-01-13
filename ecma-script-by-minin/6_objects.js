const phoneCode = '+3 (75)';

const person = {
  age: 20,
  name: 'Irina',
  'country-live': 'Russian',
  phone: () => phoneCode + ' 777-77-777',
  toString() {
    return Object
        .keys(this)
        .filter(key => key !== 'toString')
        .map(key => this[key])
        .join(' ');
  }
};

console.log(person.phone()); // +3 (75) 777-77-777