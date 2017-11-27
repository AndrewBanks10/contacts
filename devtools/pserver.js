/* eslint no-console: 0 */
const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3002
const host = process.env.HOST || 'localhost'

const rootPath = path.join(process.cwd(), 'dist')

// root
app.get('/', function (req, res) {
  res.sendFile('index.html', {root: rootPath})
})

// scripts
app.use('/scripts', express.static(path.join(rootPath, 'scripts')))

try {
  app.listen(port, host, function () {
    console.log(`Listening at http://${host}:${port}.`)
  })

// opn(`http://${host}:${port}`).then(() => {})
} catch (ex) {
  console.log(`Server error ${ex}.`)
}

process.on('uncaughtException', function (err) {
  console.log(`Server exception: ${err}.`)
})
