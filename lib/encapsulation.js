module.exports = class Encapsulation {
    constructor(properties, propertiesSetterMiddlewares, propertiesGetterMiddlewares) {
      this.properties = properties;
      this.propertiesSetterMiddlewares = propertiesSetterMiddlewares;
      this.propertiesGetterMiddlewares = propertiesGetterMiddlewares;
      this.keys = Object.keys(properties);
    }
  
    // capitalize first character
    cFC(str) {
      return (str.charAt(0).toUpperCase() + str.slice(1));
    }
  
    encapsulate() {
      const { keys, properties } = this;
      const getters = {};
      const setters = {};
  
      // Generate getters and setters for each property
      keys.forEach(key => {
        const cFCKey = this.cFC(key);
        const getterName = 'get' + cFCKey;
        const setterName = 'set' + cFCKey;
  
        // Set up setter with middleware
        const setterMid = this.propertiesSetterMiddlewares[key];
        if (Array.isArray(setterMid)) {
          setterMid.forEach(m => {
            if (typeof m !== 'function') {
              throw new Error('middlewares must be functions');
            }
          });
          setters[setterName] = function(value) {
            let newValue = value;
            setterMid.forEach(m => {
              newValue = m(newValue);
            });
            this.properties[key] = newValue;
          }.bind(this);
        } else if (typeof setterMid === 'function') {
          setters[setterName] = setterMid.bind(this);
        } else if (typeof setterMid !== 'undefined') {
          throw new Error('middlewares must be function');
        } else {
          setters[setterName] = function(value) {
            this.properties[key] = value;
          }.bind(this);
        }
  
        // Set up getter with middleware
        const getterMid = this.propertiesGetterMiddlewares[key];
        if (Array.isArray(getterMid)) {
          getterMid.forEach(m => {
            if (typeof m !== 'function') {
              throw new Error('middlewares must be functions');
            }
          });
          getters[getterName] = function() {
            let value = this[key];
            getterMid.forEach(m => {
              value = m(value);
            });
            return value;
          }.bind(properties);
        } else if (typeof getterMid === 'function') {
          getters[getterName] = getterMid.bind(this);
        } else if (typeof getterMid !== 'undefined') {
          throw new Error('middlewares must be function');
        } else {
          getters[getterName] = function() {
            return this[key];
          }.bind(properties);
        }
      });
  
      const encapsulatedObj = function () {
        return {...getters,...setters};
      }.bind(properties)();
  
      return encapsulatedObj;
    }
  }