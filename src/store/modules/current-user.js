/**
 * Created by Thierry on 2017/5/16.
 */
import * as types from '../mutation-types'
import storage from '@/utils/storage'

// initial state
const state = {
  user: {}
}

// getters
const getters = {
  currentUser: state => state.user
}

// actions
const actions = {
  createUser ({commit}, user) {
    commit(types.CREATE_USER, user)
  },

  fetchUser ({commit}) {
    commit(types.FETCH_USER)
  },

  deleteUser ({commit}) {
    commit(types.DELETE_USER)
  }
}

// mutations
const mutations = {
  [types.CREATE_USER] (state, user) {
    state.user = user
    storage.set('current_user', user)
  },

  [types.FETCH_USER] (state) {
    state.user = storage.get('current_user')
  },

  [types.DELETE_USER] (state) {
    storage.remove('current_user')
    state.user = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
