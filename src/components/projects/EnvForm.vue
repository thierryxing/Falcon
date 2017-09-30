<template>
  <div class="box-body">
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" id="name" name="environment[name]" v-model="environment.name"/>
    </div>
    <div class="form-group" v-show="isApp()">
      <label for="scheme" v-if="project.platform === 'ios'">Build Scheme</label>
      <label for="scheme" v-else-if="project.platform === 'android'">Build Name(*.apk)</label>
      <input class="form-control" id="scheme" name="environment[scheme]" :value="environment.scheme"
             v-model="environment.scheme"/>
    </div>
    <div class="form-group" v-show="isAndroidApp()">
      <label for="build_path">Build Path</label>
      <input class="form-control" id="build_path" name="environment[build_path]" :value="environment.build_path"
             v-model="environment.build_path" placeholder="app/build/outputs/apk/"/>
    </div>

    <div class="form-group" v-if="isApp()">
      <label for="template">Template</label>
      <select class="form-control" id="template" name="environment[template]" v-model="environment.build_template">
        <option v-for="option in options" :value="option.value">{{ option.name }}</option>
      </select>
    </div>
    <div v-else>
      <input type="hidden" name="environment[template]" v-model="environment.build_template"/>
    </div>

    <div class="form-group">
      <label for="ding_access_token">DingTalk Access Token</label>
      <input class="form-control" id="ding_access_token" name="environment[ding_access_token]"
             :value="environment.ding_access_token"
             v-model="environment.ding_access_token" placeholder="Keep this empty if you don't want to notification by DingTalk"/>
    </div>
    <div class="form-group" v-show="isApp()">
      <label for="download_url">Download URL</label>
      <input class="form-control" id="download_url" name="environment[download_url]"
             :value="environment.download_url"
             v-model="environment.download_url" placeholder="eg:http://fir.im/nlkc"/>
    </div>
    <div class="form-group">
      <label for="cron">Build Schedule</label>
      <input class="form-control" id="cron" name="environment[cron]"
             :value="environment.cron"
             v-model="environment.cron" placeholder="eg:0 */5 * * * *"/>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'
  import Enum from '@/constants/enum'
  import { project } from '../../constants/api'

  export default {

    props: ['environment'],

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        options: []
      }
    },

    created () {
      this.setOptions()
    },

    methods: {

      setOptions () {
        if (this.isApp()) {
          for (let template in Enum.Templates) {
            if (Enum.Templates.hasOwnProperty(template)) {
              this.options.push({name: template, value: Enum.Templates[template]})
            }
          }
        } else {
          this.environment.build_template = Enum.Templates.Lib
        }
      },

      isApp () {
        return this.project.type === Enum.ProjectType.App
      },

      isAndroidApp () {
        return this.isApp() && this.project.platform === 'android'
      }

    }
  }
</script>

