const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

// Callbacks #2
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

// _______________________________________________________
// Event-Loop
fs.readFile("test-file.txt", () => {
  // This goes after the code outside, because 'fs.readFile()' takes more time to run
  console.log("I/O finished");
  console.log("-------------");

  // Order of code
  setTimeout(() => console.log("Timer 2 finished"), 0);
  // 3
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  // After 3 Sec
  setImmediate(() => console.log("Immediate 2 finished"));
  // 2
  process.nextTick(() => console.log("process.nextTick"));
  // 1

  // to the Threadpool, will return when finished
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encypted");
  });
});
// ________________________________________________________

// Top level code #1
console.log("Hello from the top-level code");
