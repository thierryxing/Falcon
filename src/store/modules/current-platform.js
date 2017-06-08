/**
 * Created by Thierry on 2017/5/16.
 */
import * as types from '../mutation-types'
import storage from '@/utils/storage'

// initial state
const state = {
  platform: {}
}

// getters
const getters = {
  currentPlatform: state => state.platform
}

// actions
const actions = {
  setPlatform ({commit}, platform) {
    commit(types.SET_PLATFORM, platform)
  },

  fetchPlatform ({commit}) {
    commit(types.FETCH_PLATFORM)
  }
}

// mutations
const mutations = {
  [types.SET_PLATFORM] (state, platform) {
    state.platform = platform
    storage.set('current_platform', platform)
  },

  [types.FETCH_PLATFORM] (state) {
    state.platform = storage.get('current_platform')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
