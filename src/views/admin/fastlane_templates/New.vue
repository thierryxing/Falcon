<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">New Fastlane Template</h3>
    </div>
    <form @submit.prevent="doCreate" accept-charset="UTF-8" method="post">
      <template-form :template.sync="template"></template-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Create">
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
        showOverlay: false,
        template: {}
      }
    },

    methods: {

      doCreate () {
        this.showLoading()
        NetWorking
          .doPost(API.fastlaneTemplates, null, this.template)
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

