/**
 * Created by Thierry on 2017/5/16.
 */
import * as types from '../mutation-types'
import storage from '@/utils/storage'

// initial state
const state = {
  project: {
    guardian: {}
  }
}

// getters
const getters = {
  currentProject: state => state.project
}

// actions
const actions = {
  setProject ({commit}, project) {
    commit(types.SET_PROJECT, project)
  }
}

// mutations
const mutations = {
  [types.SET_PROJECT] (state, project) {
    state.project = project
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
