/**
 * Created by Thierry on 2017/5/16.
 */
import * as types from '../mutation-types'
import storage from '@/utils/storage'

// initial state
const state = {
  alert: null
}

// getters
const getters = {
  currentAlert: state => state.alert
}

// actions
const actions = {
  createAlert ({commit}, alert) {
    commit(types.CREATE_ALERT, alert)
  },

  deleteAlert ({commit}) {
    commit(types.DELETE_ALERT)
  }
}

// mutations
const mutations = {
  [types.CREATE_ALERT] (state, alert) {
    state.alert = alert
  },

  [types.DELETE_ALERT] (state) {
    state.alert = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
