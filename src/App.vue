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
          this.$store.dispatch('deleteAlert')
          if (response.status >= 400) {
            if (response.status === 401) {
              this.$router.replace({name: 'login'})
            } else {
              this.$store.dispatch('createAlert', {type: 'warning', message: response.statusText})
            }
          } else {
            if (response.data.status !== 0) {
              this.$store.dispatch('createAlert', {type: 'info', message: response.data.message})
            }
          }
          return response
        })
      })
    }
  }
</script>
