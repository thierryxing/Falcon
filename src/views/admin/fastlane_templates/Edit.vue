<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Edit Fastlane Template</h3>
    </div>
    <form @submit.prevent="doUpdate" accept-charset="UTF-8" method="post">
      <template-form :template.sync="template"></template-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Update">
      </div>
    </form>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import TemplateForm from '@/components/admin/TemplateForm'

  export default {
    components: {LoadingOverlay, TemplateForm},

    data () {
      return {
        id: this.$route.params.id,
        showOverlay: false,
        template: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {

      fetchData () {
        this.showLoading()
        NetWorking
          .doGet(API.fastlaneTemplate, {id: this.id})
          .then(response => {
            this.template = response.data
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doUpdate () {
        this.showLoading()
        NetWorking
          .doPut(API.fastlaneTemplate, {id: this.id}, this.template)
          .then(() => {
            this.$router.replace({name: 'fastlane_templates'})
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

