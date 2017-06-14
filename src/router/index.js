import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routes.js'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // if user not exist, then go to login
  if (to.name !== 'login') {
    let user = store.getters.currentUser
    if (user === null || user.id === null) {
      router.replace({name: 'login'})
    }
  }
  next()
})

export default router
