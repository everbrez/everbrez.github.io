const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve('./public')))

app.listen(8888)

console.log('listening on http://localhost:8888')