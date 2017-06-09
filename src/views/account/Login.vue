<template>
  <div class="login-box">
    <div class="login-logo">
      <b>
        Jaguar
      </b>
    </div>
    <div class="login-box-body box-body">
      <p class="login-box-msg">
        Sign in with your Gitlab Account
      </p>
      <form role="form" action="" accept-charset="UTF-8" method="post" @submit.prevent="doLogin">
        <div class="box-body">
          <div class="form-group has-feedback">
            <input type="email" name="email" id="email" class="form-control" placeholder="Email" v-model="user.email">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="user.password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
          </div>
          <div class="row">
            <div class="col-xs-8"></div>
            <div class="col-xs-4">
              <input class="btn btn-primary btn-block btn-flat" type="submit" value="Sign In" :disabled="buttonDisabled">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {

    data () {
      return {
        user: {
          email: '',
          password: ''
        },
        buttonDisabled: false
      }
    },

    created () {
    },

    methods: {

      doLogin: function () {
        this.showLoading()
        NetWorking.doPost(API.login, null, this.user, null).then(response => {
          let status = response.status
          if (status === 0) {
            let user = response.data
            this.$store.dispatch('createUser', user)
            this.$store.dispatch('setPlatform', response.data.platform)
            this.$router.push({name: 'dashboard'})
          } else {
            window.alert(response.message)
          }
          this.hideLoading()
        })
      },

      showLoading: function () {
        this.buttonDisabled = true
      },

      hideLoading: function () {
        this.buttonDisabled = false
      }

    }
  }
</script>

<style>
  body {
    background-color: #d2d6de !important;
  }
</style>
