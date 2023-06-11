# MoJS liberary give you some future to work easily with javascript objects
# Encapsulation Class
 - you can now make Encapsulation properties in object
 - getter and setter with name convination
 - add middleware for each getter and setter
 - accept array of middleware and only one function as middleware

 
Encapsulation (
    properties: object,
    setterMiddlewares: {propertyName: function || Array(functions)},
    getterMiddlewares: {propertyName: function || Array(functions)}
)

const {Encapsulation} = require('@muhammedadel/mojs');
const Person = new Encapsulation(
    {name: 'muhammed adel', age: 23},
    {
        name: [
            function (value) {
                return value.toUpperCase();
            },
            function (value) {
                if (typeof value === 'string' && value.length > 5) {
                    return value;
                } else {
                    throw new Error('Name must be at least 5 characters');
                }
            }
        ]
    }
).encapsulate();


console.log(Person.getName());
console.log(Person.getAge());

# freeze & unFreeze 
 - you can now freeze and unFreeze your object to set all properties are static
