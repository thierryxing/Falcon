<template>
  <div class="box box-solid">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li :class="tabClass(file)" v-for="file in files">
          <a data-toggle="tab" :href="getAnchor(file)" @click="switchTab(file)">
            {{ file.name }}
          </a>
        </li>
        <li class="pull-right">
          <a class="text-muted" href="javascript:" @click="showEdit=true">
            <i class="fa fa-edit"></i>
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" :class="tabClass(file)" :id="getPaneId(file)" v-for="file in files">
        <pre class="tab_pre" id="tab_pre_0" v-highlightjs v-show="!showEdit">
          <code v-html="file.content" class="ruby"></code>
        </pre>
          <div class="tab_form" id="tab_form_0" v-show="showEdit">
            <form role="form" @submit.prevent="doSave" accept-charset="UTF-8" method="post">
              <div class="box-body">
                <div class="form-group">
                  <textarea name="contents" id="contents" class="form-control code" rows="15" v-model="currentFile.content"></textarea>
                </div>
              </div>
              <div class="box-footer">
                <input class="btn btn-primary" type="submit" value="Save">
              </div>
            </form>
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
        showEdit: false,
        files: [],
        currentFile: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData () {
        this.showLoading()
        NetWorking
          .doGet(API.environmentFastlane, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, this.currentFile)
          .then(response => {
            this.files = response.data
            this.currentFile = this.files[0]
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doSave () {
        this.showLoading()
        NetWorking
          .doPut(API.environmentUpdateFastfile, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, this.currentFile)
          .then(() => {
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      switchTab (file) {
        this.showEdit = false
        this.currentFile = file
      },

      tabClass (file) {
        return this.currentFile.name === file.name ? 'active' : ''
      },

      getAnchor (file) {
        return '#tab_' + file.name
      },

      getPaneId (file) {
        return 'tab_' + file.name
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

<style scoped>
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #232323;
    color: #e6e1dc;
  }
</style>
