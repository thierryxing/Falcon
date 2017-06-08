const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/projects/:id/environments/:env_id/configs': '/environments/:env_id/configs'
}))

// 支持加载多个db文件
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach(function (file) {
  _.extend(base, require(path.resolve(mockDir, file)))
})
const router = jsonServer.router(base)

// 处理登录逻辑
server.post('/account/login', function (req, res) {
  let db = router.db // lowdb instance
  let data = db.get('login').value()
  res.jsonp({
    data: data,
    status: 0,
    message: ''
  })
})
// 处理登出逻辑
server.post('/account/logout', function (req, res) {
  let db = router.db // lowdb instance
  let data = db.get('logout').value()
  res.jsonp({
    data: data,
    status: 0,
    message: ''
  })
})

server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    status: 0,
    message: ''
  })
}

server.listen(9090, () => {
  console.log('JSON Server is running')
})
