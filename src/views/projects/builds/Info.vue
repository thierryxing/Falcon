<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Build Info</h3>
    </div>
    <div class="box-body">
      <form @submit.prevent="doBuild" accept-charset="UTF-8" method="post">
        <div class="form-group">
          <label for="current_version">Current Version</label>
          <input name="current_version" id="current_version" :value="build.current_version" class="form-control" disabled>
        </div>
        <div class="form-group" v-show="isLib()">
          <label for="version">New Version</label>
          <input name="version" id="version" class="form-control" v-model="build.version">
        </div>
        <div class="form-group">
          <label for="notes">Release Notes</label>
          <textarea name="notes" id="notes" class="form-control" rows="10" v-model="build.notes" disabled></textarea>
        </div>
        <div class="box-footer">
          <button class="btn btn-primary">
            Build
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import NetWorking from '@/utils/networking'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import { mapGetters } from 'vuex'

  export default {
    components: {LoadingOverlay},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        build: {
          current_version: '',
          version: '',
          notes: ''
        },
        showOverlay: false,
        pathParams: {id: this.$route.params.project_id, env_id: this.$route.params.env_id}
      }
    },

    created () {
      this.fetchBuildInfo()
    },

    methods: {

      fetchBuildInfo () {
        this.showLoading()
        NetWorking
          .doGet(API.environmentBuildInfo, this.pathParams, this.build)
          .then(response => {
            this.build = response.data
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doBuild () {
        this.showLoading()
        NetWorking
          .doPost(API.environmentBuild, this.pathParams, this.build)
          .then(response => {
            this.$router.replace({name: 'build_detail', params: {'build_id': response.data.id}})
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      isLib () {
        return this.project.type === 'Lib'
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
