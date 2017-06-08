/**
 * Created by Thierry on 2017/5/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import currentUser from './modules/current-user'
import alert from './modules/alert'
import currentProject from './modules/current-project'
import currentPlatform from './modules/current-platform'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    currentUser,
    alert,
    currentProject,
    currentPlatform
  },
  strict: debug
})
