const http = require('http')

http.createServer((req, res) => {
  res.statusCode = 206
  res.end('hello world!')
}).listen(8888, () => console.log('listen on localhost:8888'))
