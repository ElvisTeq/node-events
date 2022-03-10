// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
//const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");
// => destructuring
console.log(multiply(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
// () => to inmediatelly call the function in module 3
