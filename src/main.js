// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueResource from 'vue-resource'
import VueHighlightJS from 'vue-highlightjs'
import slimScroll from 'admin-lte/plugins/slimScroll/jquery.slimscroll'

import 'admin-lte/bootstrap/css/bootstrap.min.css'
import 'admin-lte/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'admin-lte/dist/js/app.min'
import 'font-awesome/css/font-awesome.min.css'
import '../static/css/application.css'
import '../static/css/railscasts.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueHighlightJS)

// Get User from local storage
store.dispatch('fetchUser')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

