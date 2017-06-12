<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Build Info</h3>
    </div>
    <div class="box-body">
      <form @submit.prevent="doBuildLib" accept-charset="UTF-8" method="post">
        <div class="form-group">
          <label for="current_version">Current Version</label>
          <input type="text" name="current_version" id="current_version" :value="project.version" class="form-control" disabled="disabled">
        </div>
        <div class="form-group">
          <label for="version">New Version</label>
          <input type="text" name="version" id="version" class="form-control" v-model="build.version">
        </div>
        <div class="form-group">
          <label for="snapshot">Snapshot</label>
          <input type="checkbox" name="snapshot" id="snapshot" value="1" v-model="build.snapshot">
        </div>
        <div class="form-group">
          <label for="note">Release Notes</label>
          <textarea name="note" id="note" class="form-control" rows="10" v-model="build.note"></textarea>
        </div>
        <div class="box-footer">
          <button class="btn btn-primary" type="submit">
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
  import { mapGetters } from 'vuex'
  import LoadingOverlay from '@/components/global/LoadingOverlay'

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
          version: '',
          snapshot: '1',
          note: ''
        },
        showOverlay: false
      }
    },

    created () {
      this.fetchGitLog()
    },

    methods: {

      fetchGitLog () {
        this.showLoading()
        NetWorking
          .doGet(API.latestGitLog, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, this.build)
          .then(response => {
            this.build.note = response.data.note
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doBuildLib () {
        this.showLoading()
        NetWorking
          .doPost(API.buildLib, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, this.build, null)
          .then(response => {
            this.$router.replace({name: 'build_detail', params: {'build_id': response.data.id}})
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
