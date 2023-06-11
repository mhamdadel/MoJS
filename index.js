const Encapsulation = require('./lib/encapsulation');
const encapsulation = new Encapsulation({
    name: 'Muhammed Adel',
    age: 30,
  }, {
    name: [
      function(value) {
        return value.toUpperCase();
      },
      function(value) {
        return value.trim();
      },
    ],
    age: function(value) {
      if (value < 0) {
        throw new Error('age cannot be negative');
      }
      return value;
    },
  }, {
    age: function(value) {
      return value + ' years old';
    },
  });
  const encapsulatedObj = encapsulation.encapsulate();
  console.log(encapsulatedObj.getName());
  console.log(encapsulatedObj.getAge()); 
  encapsulatedObj.setName('   Muhammed   ');
  encapsulatedObj.setAge(35);
  console.log(encapsulatedObj.getName());
  console.log(encapsulatedObj.getAge());