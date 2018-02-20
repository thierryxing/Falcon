<!--顶部导航栏-->
<template>
  <header class="main-header">
    <a class="logo" href="/">
    <span class="logo-lg">
      <b>Jaguar</b>
    </span>
    </a>
    <nav class="navbar navbar-static-top">
      <a class="sidebar-toggle" data-toggle="push-menu">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav navbar-right" style="margin-right:0">
          <li class="dropdown user user-menu">
            <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="#">
              <img alt="User Image" class="user-image" :src="currentUser.avatar_url">
              <span class="hidden-xs">{{ currentUser.name }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img alt="User Image" class="img-circle" :src="currentUser.avatar_url">
                <p>
                  {{ currentUser.name }} - {{ currentUser.username }}
                  <small>{{ currentUser.created_at }}</small>
                </p>
              </li>
              <li class="user-footer">
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" href="javascript:" @click="signOut()">Sign Out</a>
                </div>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="#">
              Platform:
              {{ platform }}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <a href="javascript:" @click="changePlatform('ios')">iOS</a>
              </li>
              <li>
                <a href="javascript:" @click="changePlatform('android')">Android</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" @click="jumpToAdmin()" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'

  export default {

    computed: {
      ...mapGetters({
        platform: 'currentPlatform',
        currentUser: 'currentUser'
      })
    },

    created () {
      this.$store.dispatch('fetchPlatform')
    },

    methods: {
      signOut () {
        NetWorking.doGet(API.logout).then(() => {
          this.$store.dispatch('deleteUser')
          this.$router.replace({name: 'login'})
        })
      },

      changePlatform (platform) {
        NetWorking
          .doGet(API.setPlatform, {id: this.currentUser.id, platform: platform})
          .then(response => {
            this.$store.dispatch('setPlatform', response.data.platform)
            this.$router.replace({name: 'root', force: true})
            window.location.reload()
          })
      },

      jumpToAdmin () {
        this.$router.replace({name: 'admin'})
      }
    }
  }
</script>
