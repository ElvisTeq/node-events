// importing events module
const EventEmitter = require("events");

const http = require("http");

// recommended => assign/copy EventEmitter to a class
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// Create Event Emitter so we can handle it
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: ELvis");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

// ---------------------------------------- .emit('eventToCreate', quantity)
// => creates the object we want to control using .on()

// --------------------------------------- .on('event', (handleTheEvent) => {})
// to eventListening .emit()
// .on => eventListening to something

///////////////////////////////////////////////////////////////

// Ex.2

// Handling a http server using .on()

// Create server
const server = http.createServer();

// server.on() => to handle events on server
server.on("request", (req, res) => {
  // request => what event to handle in server
  // (req, res) => {} => handling the request
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  res.end("Another request!!!!!");
});

// close => another event we can handle
server.on("close", () => {
  console.log("Server closed");
});

// Setting server online
server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request...");
});

// => 'Waiting for request'
// .on() will not run until we enter to the URL
// => because we using 'request' event in '.on()'
