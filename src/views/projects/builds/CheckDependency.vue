<template>
  <div class="box box-solid">
    <dependency></dependency>
    <button class="btn btn-block btn-primary" @click="doDeliver">Confrim Dependency and Deliver</button>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import NetWorking from '@/utils/networking'
  import Dependency from '@/components/projects/Dependency'

  export default {
    components: {Dependency},

    data () {
      return {
        showOverlay: false
      }
    },

    methods: {

      doDeliver () {
        NetWorking
          .doPost(API.buildApp, {id: this.$route.params.project_id, env_id: this.$route.params.env_id})
          .then(response => {
            this.$router.replace({name: 'build_detail', params: {'build_id': response.data.id}})
            this.hideLoading()
          })
      }

    }
  }
</script>
