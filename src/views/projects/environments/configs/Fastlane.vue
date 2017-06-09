<template>
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li :class="tabClass(file)" v-for="file in files">
        <a data-toggle="tab" :href="getAnchor(file)" @click="switchTab(file)">
          {{ file.name }}
        </a>
      </li>
      <li class="pull-right">
        <a class="text-muted" href="javascript:">
          <i class="fa fa-edit"></i>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" :class="tabClass(file)" :id="getPaneId(file)" v-for="file in files">
        <pre class="tab_pre" id="tab_pre_0" v-highlightjs>
          <code v-html="file.content" class="ruby"></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    name: '',
    data () {
      return {
        files: [],
        currentFile: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        NetWorking.doGet(API.environmentFastlane, {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }, null).then(response => {
          this.files = response.data
          this.currentFile = this.files[0]
        })
      },

      switchTab: function (file) {
        this.currentFile = file
      },

      tabClass: function (file) {
        if (this.currentFile.name === file.name) {
          return 'active'
        } else {
          return ''
        }
      },

      getAnchor: function (file) {
        return '#tab_' + file.name
      },

      getPaneId: function (file) {
        return 'tab_' + file.name
      },

      panelActive: function (file) {

      }
    }
  }
</script>

<style scoped>
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #232323;
    color: #e6e1dc;
  }
</style>
