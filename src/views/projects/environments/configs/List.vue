<template>
  <section class="content">
    <div class="box box-success">
      <loading-overlay v-show="showOverlay"></loading-overlay>
      <div class="box-header with-border">
        <h3 class="box-title">
          {{ currentConfig.name }}
        </h3>
      </div>
      <div class="box-body">
        <div class="row">
          <a href="javascript:" class="col-md-4 col-sm-6 col-xs-12" v-for="(config, index) in configs" @click="navigateToConfig(config)">
            <div class="info-box bg-gray" :class="bgClass(config.id)">
              <span class="info-box-icon">
                <i class="fa" :class="statusClass(config.finished)"></i>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">
                  {{ config.name }}
                </span>
                <span class="info-box-number">{{ index + 1 }}</span>
                <div class="progress">
                  <div class="progress-bar" style="width: 100%"></div>
                </div>
                <span class="progress-description">
                  {{ config.desc }}
                </span>
              </div>
            </div>
          </a>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </section>
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
        configs: [],
        currentConfig: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        NetWorking.doGet(API.environmentConfigs, {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }, null).then(
          response => {
            this.configs = response.data
            this.navigateToConfig(this.configs[0])
          }
        )
      },

      navigateToConfig: function (config) {
        this.currentConfig = config
        this.$router.replace({name: config.id})
      },

      statusClass: function (finished) {
        if (finished) {
          return 'fa-check-circle'
        } else {
          return 'fa-circle-thin'
        }
      },

      bgClass: function (configId) {
        if (configId === this.$route.name) {
          return 'bg-green'
        } else {
          return ''
        }
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
