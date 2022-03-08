// #1
// Node, V8, Libuv and C++

// Node => relies in V8, Libuv

// V8 => converts JS code into machine code that our computer can understand
// => written in C++

// Libuv => Open source library, gives sources to the underlying computer operating system file system, networking, and more
// => has Event Loop & Thread Pool
// => written in C++

// Node => can convert V8, Libuv into JS for us to use

//////////////////////////////////////////////////////////////////////

// #2
// Processes, Threads and the Thread Pool

// Node was written in C++
// Node is run in Single Thread (Sequence of instructions)

// When loading heavy tasks that takes long, Node will automatically offload data in the Thread Pool, so is not blocking our code

//////////////////////////////////////////////////////////////////////

// #3
// The Node.js Event Loop

// Tips for to not block Event loop

// => Don't use sync versions of functions on fs, crypto and zlib modules in your callback functions

// => Don't perform complez calculations ( loops inside loops )

// => Be caferful with JSON in large objects
// Might be a large file that can take a long time to load

// => Don't use too complex regular expressions ( nested quantifiers )

///////////////////////////////////////////////////////////////////

// #4
// The event loop in practice .33

// Order of Thread-Pool code in "event-loops.js"

// ******** First
// => Initialize program
// => Execute "top-level" code
// => Require modules
// => Register event callbacks
// => START EVENT LOOP

// ******** Then
// => Expired timer callbacks
// => I/O Polling and callbacks
// => setImmediate callbacks
// => Close callbacks
// => Check if there's any more timer callback left, if do, start from top
// => if not, Exit program

// I/O => input/Output

// setImmediate() & process.nextTick() work the opposite way
// process.nextTick() => will run first in the event-loop

// Use setImmediate if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use process.nextTick to effectively queue the function at the head of the event queue so that it executes immediately after the current function completes.

// ---------------------------------------- process.nextTick(() => {})
// Every time the event loop takes a full trip, we call it a tick.
// Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.

// ---------------------------------------- process.env.UV_THREADPOOL_SIZE = 1
// to set the ammount of threadpool
// ammount of slots for code to run in the back, default is 4
// => npm init, to create package.json, to add a npm script entry for the threadpool

// Sync code will not be run by the thread pool
// => will block our code, forcing the code to finish in order to continue

////////////////////////////////////////////////////////////////////////

// #5
// Events in practice

// resume => EventListening the server/http/URL
// => do something when we get in the URL using '.on()'

// events.js => file created

// ------------------------------------------- require('events');
// module for events handling

// ------------------------------------------- .on('typeOfEvent', (req, res) => {})
// => to handle servers using .on()
// .on() => it takes a type of event, and then we can handle it

////////////////////////////////////////////////////////////////////////

// #6
// Streams

// Used to process (read and write) data piece by piece, without completing the whole read or write operation, and therefore without keeping all the data in memory
// ex => newflix, youtube
// is a more efficient way to handle data without saving the data, and we don't have to wait until all the data is available

// **** Fundamental Type of Streams ****

// Streams are instances of the EventEmitter class

// ......Readable Streams
// => Streams from which we can read (consume) data
// ex => http request, file system(fs) read streams
// has 'data' and 'end' event to handle
// pipe() => function
// read() => function

// ......Writable Streams
// => Stream to which we can write data
// ex => http request, file system(fs) write streams
// has "drain" and "finish" event
// write() => function
// and() => function

// ......Duplex Streams
// Streams that are both readable and writable
// ex => new web socket

// ......Transform Streams
// Duplex streams that transform data as it is written on read
// ex => zlib Gzip creation

////////////////////////////////////////////////////////////////////////

// #7
// Streams in Practice

// streams.js => File created

// ------------------------------------ fs.createReadStream("test-file.txt");
// => save it to a const
// => to create a readable stream
// => To receive the data live, instead of waiting for it to finish first

// ----------------------------------- res.statusCode = 'errCode'
// To handle the error code

// ***** Back Pressure *****
// => When response cannot send the data nearly as fast as receiving it from the file

// ----------------------------------- .pipe(res)
// => to handle back Pressure
// Easiest way of consuming and writting streams
// By using 'readable.pipe(res)' in out code it automatically .write(), and .end() our data
// If we need to costumize our stream, we need to use Solution 2

////////////////////////////////////////////////////////////////////////

// #8
// How requiring Modules Really Works
