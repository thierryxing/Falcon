<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Clone Environment</h3>
    </div>
    <form @submit.prevent="doClone" accept-charset="UTF-8" method="post">
      <env-form :environment.sync="environment"></env-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Clone">
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

    data () {
      return {
        project_id: null,
        env_id: null,
        showOverlay: false,
        environment: {}
      }
    },

    created () {
      this.project_id = this.$route.params.project_id
      this.env_id = this.$route.params.env_id
      this.fetchData()
    },

    methods: {
      fetchData () {
        this.showLoading()
        NetWorking
          .doGet(API.environment, {id: this.project_id, env_id: this.env_id})
          .then(response => {
            this.environment = response.data
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doClone () {
        this.showLoading()
        NetWorking
          .doPost(API.environmentClone, {id: this.project_id, env_id: this.env_id}, this.environment)
          .then(() => {
            this.$router.replace({name: 'environments', params: {project_id: this.project_id}})
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

