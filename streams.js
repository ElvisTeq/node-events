const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 / not reccomended to use (too simple)
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //
  //
  // Solution 2 / Using Streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   // data => event from createReadStream
  //   res.write(chunk);
  //   // res => is a writeable stream, so we can use .write()
  //   // Streaming the chunk into the client
  // });
  // readable.on("end", () => {
  //   // end => event from createReadStream
  //   res.end();
  //   // to send and display the data every time we receive a 'chuck'
  //   // We are not passing any data into 'res.end()' because we already did with 'red.write(chunk)'
  // });
  // readable.on("error", (err) => {
  //   // error => event from createReadStream
  //   console.log(err);
  //   res.statusCode = 500;
  //   // Setting error code to 500
  //   res.end("File not found");
  // });

  // Solution 3 / Fixing Back-Pressure
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(WriteableDestination)
  // readableStream.pipe(WriteableDest)
  // automatically does everything in Solution 2, but the error hanmdling
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ...");
});
