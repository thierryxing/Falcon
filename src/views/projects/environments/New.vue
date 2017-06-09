<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">New Environment</h3>
    </div>
    <form @submit.prevent="doCreate" accept-charset="UTF-8" method="post">
      <env-form :environment.sync="environment"></env-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Create">
      </div>
    </form>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import EnvForm from '@/components/projects/EnvForm'

  export default {
    components: {LoadingOverlay, EnvForm},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        showOverlay: false,
        environment: {}
      }
    },

    methods: {

      doCreate () {
        this.showLoading()
        NetWorking.doPost(API.environments,
          {
            id: this.project.id
          },
          this.environment,
          null,
          response => {
            this.environment = response.data
            this.$router.push({name: 'git_clone', params: {env_id: this.environment.id}})
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      showLoading () {
        this.showOverlay = true
      },

      hideLoading () {
        this.showOverlay = false
      }
    }
  }
</script>

