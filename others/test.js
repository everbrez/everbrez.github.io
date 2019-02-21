const http = require('http')

let num = 0
http.createServer((req, res) => {
  console.log(++num)
}).listen(8888)