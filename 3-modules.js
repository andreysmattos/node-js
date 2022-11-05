const names = require('./names');
const sayHi = require('./3-second-module');
const data = require('./6-alternative-flavor');

require('./7-mind-granade');

sayHi('Andrey');
sayHi(names.john);
sayHi(names.petter);