<template>
  <div class="col-xs-12">
    <div class="box">
      <loading-overlay v-show="showOverlay"></loading-overlay>
      <div class="box-header" data-id="2491" data-offset="4975" data-pid="78" data-polling="0" id="delivery_id">
        <h3 class="box-title">{{ build_id }}</h3>
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-lg-12">
            <pre class="bash" v-html="build_log"></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'

  export default {
    components: {LoadingOverlay},

    data () {
      return {
        showOverlay: false,
        build_id: this.$route.params.build_id,
        build_log: ''
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        this.showLoading()
        NetWorking
          .doGet(API.buildLog, {id: this.$route.params.project_id, build_id: this.$route.params.build_id}, null)
          .then(response => {
              this.build_log = response.data.log
              this.hideLoading()
            }, () => {
              this.hideLoading()
            }
          )
      },

      showLoading: function () {
        this.showOverlay = true
      },

      hideLoading: function () {
        this.showOverlay = false
      }
    }
  }
</script>
