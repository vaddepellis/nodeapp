const http = require('http');

const hostname = 'https://sk-nodeapp.herokuapp.com';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}`);
//   console.log(`Server running at http://${hostname}:${port}/`);
});