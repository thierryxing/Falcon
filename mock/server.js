const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/projects/:id/environments/:env_id/configs': '/environments/:env_id/configs',
  '/projects/:id/environments/:env_id/latest_git_log': '/environments/:env_id/latest_git_log',
  '/dashboard/weekly_data': '/weekly_data'
}))

// 支持加载多个db文件
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach((file) => {
  _.extend(base, require(path.resolve(mockDir, file)))
})
const router = jsonServer.router(base)

// 处理登录逻辑
server.post('/account/login', (req, res) => {
  let db = router.db // lowdb instance
  let data = db.get('login').value()
  res.jsonp({
    data: data,
    status: 0,
    message: ''
  })
})
// 处理登出逻辑
server.post('/account/logout', (req, res) => {
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
  let data = {}
  let blackList = ['/dashboard', '/dashboard/weekly_data']
  let localData = res.locals.data
  if (localData instanceof Array && !blackList.includes(req.originalUrl)) {
    data = {
      list: localData,
      total: 20
    }
  } else {
    data = localData
  }
  res.jsonp({
    data: data,
    status: 0,
    message: ''
  })
}

server.listen(9090, () => {
  console.log('JSON Server is running')
})
