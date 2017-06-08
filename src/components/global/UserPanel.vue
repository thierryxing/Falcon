<template>
  <div class="user-panel">
    <div class="pull-left image">
      <img alt="User Image" class="img-circle" :src="currentUser.avatar_url">
    </div>
    <div class="pull-left info">
      <p>
        {{ currentUser.name }}
      </p>
      <a href="#">
        <i class="fa fa-circle text-success"></i>
        Online
      </a>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    data () {
      return {
        currentUser: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function (type) {
        let user = this.$store.getters.currentUser
        if (user.id === null) {
          this.$router.replace({name: 'login'})
        } else {
          this.currentUser = user
        }
      }
    }
  }
</script>
