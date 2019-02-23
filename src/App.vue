<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'

  export default {
    created() {
      NetWorking.instance.interceptors.response.use((response) => {
        this.handleResponse(response)
        return response
      }, (error => {
        this.handleError(error.response)
      }))
    },

    methods: {
      handleResponse(response) {
        if (response.data.status !== 0) {
          this.handleApiError(response)
        }
      },

      handleError(response) {
        switch (response.status) {
          case 401:
            this.handleUnauthorized(response)
            break
          case 403:
            this.handleForbidden(response)
            break
          case 404:
            this.handleNotFound(response)
            break
          default:
            this.handleServerError(response)
            break
        }
      },

      /**
       * 处理服务器Http请求异常
       * @param response
       */
      handleServerError(response) {
        this._showAlert(response.statusText)
      },

      /**
       * 处理服务器Http 401未登录异常
       */
      handleUnauthorized() {
        this.$router.replace({ name: 'login' })
      },

      /**
       * 处理服务器Http 403无权限异常
       * @param response
       */
      handleForbidden(response) {
        this._showAlert(response.data.message)
      },

      /**
       * 处理服务器API业务异常
       * @param response
       */
      handleApiError(response) {
        this._showAlert(response.data.message)
      },

      /**
       * 处理 404 异常
       * @param response
       */
      handleNotFound(response) {
        this._showAlert(response.data.message)
      },

      /**
       * 向Store中分发需要弹出的消息
       * @param message
       * @private
       */
      _showAlert(message) {
        this.$store.dispatch('deleteAlert')
        this.$store.dispatch('createAlert', { type: 'warning', message: message })
      }
    }
  }
</script>
