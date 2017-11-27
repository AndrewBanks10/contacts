const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
const port = 3004

router.render = function (req, res) {
  if (req.url === '/contacts') {
    console.log('status= ' + res.statusCode)
    res.jsonp({
      contacts: res.locals.data
    })
  } else if (req.url === '/contact') {
    res.jsonp({
      contact: res.locals.data
    })
  } else {
    res.jsonp(res.locals.data)
  }
}

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
