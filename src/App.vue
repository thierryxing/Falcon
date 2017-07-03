<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    created () {
      Vue.http.interceptors.push((request, next) => {
        next((response) => {
          this.handleResponse(response)
          return response
        })
      })
    },

    methods: {
      handleResponse (response) {
        this.$store.dispatch('deleteAlert')
        console.log(response)
        if (response.status >= 400) {
          if (response.status === 401) {
            this.handleUnauthorized()
          } else {
            this.handleServerError(response)
          }
        } else {
          if (response.data.status !== 0) {
            this.handleApiError(response)
          }
        }
      },

      handleServerError (response) {
        this._showAlert(response.statusText)
      },

      handleUnauthorized () {
        this.$router.replace({name: 'login'})
      },

      handleForbidden (response) {
        this._showAlert(response.data.message)
      },

      handleApiError (response) {
        this._showAlert(response.data.message)
      },

      _showAlert (message) {
        this.$store.dispatch('createAlert', {type: 'warning', message: message})
      }
    }
  }
</script>
