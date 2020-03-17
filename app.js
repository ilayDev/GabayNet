const http = require('http');
const SeferTora = require('./SeferTora');

const hostname = '127.0.0.1';
const port = 3000;

var sefer  = new SeferTora("levi", {month: 1 , day: 3});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
res.end(sefer.name)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});