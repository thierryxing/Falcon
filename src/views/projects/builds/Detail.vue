<template>
  <div class="box">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header" id="delivery_id">
      <h3 class="box-title">{{ buildId }}</h3>
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-lg-12">
          <pre class="bash" v-html="buildLog"></pre>
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
        buildId: this.$route.params.build_id,
        buildLog: '',
        offset: 0,
        shouldPoll: true,
        fetching: false,
        interval: null
      }
    },

    created () {
      this.pollLog()
    },

    methods: {
      fetchData () {
        if (this.offset === 0) {
          this.showLoading()
        }
        this.fetching = true
        NetWorking
          .doGet(API.buildLog, {id: this.$route.params.project_id, build_id: this.$route.params.build_id}, {params: {offset: this.offset}})
          .then(response => {
              this.buildLog = this.buildLog + response.data.log
              this.shouldPoll = response.data.should_poll
              this.offset = response.data.offset
              this.fetching = false
              this.hideLoading()
              this.scrollTop()
              if (!this.shouldPoll) {
                window.clearInterval(this.interval)
              }
            }, () => {
              this.hideLoading()
              this.fetching = false
              window.clearInterval(this.interval)
            }
          )
      },

      showLoading () {
        this.showOverlay = true
      },

      hideLoading () {
        this.showOverlay = false
      },

      pollLog () {
        this.interval = setInterval(function () {
          if (this.shouldPoll && !this.fetching) {
            this.fetchData()
          }
        }.bind(this), 1000)
      },

      scrollTop () {
        let container = this.$el.querySelector('html, body')
        container.scrollTop = container.scrollHeight
      }
    }
  }
</script>
