<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">New Project</h3>
    </div>
    <form @submit.prevent="doCreate" accept-charset="UTF-8" method="post">
      <project-form :project.sync="project"></project-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import ProjectForm from '@/components/projects/Form'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'

  export default {
    components: {ProjectForm, LoadingOverlay},

    data () {
      return {
        showOverlay: false,
        project: {
          type: 'App',
          guardian: {}
        }
      }
    },

    methods: {

      doCreate: function () {
        this.showLoading()
        NetWorking.doPost(API.projects, null, {project: this.project}, null,
          response => {
            this.project = response.data
            this.$router.push({name: 'environments', params: {'project_id': this.project.id}})
            this.hideLoading()
          },
          () => {
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
