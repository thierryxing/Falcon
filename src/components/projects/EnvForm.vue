<template>
  <div class="box-body">
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" type="text" id="name" name="environment[name]" v-model="environment.name"/>
    </div>
    <div class="form-group">
      <label for="scheme" v-if="project.platform === 'ios'">Build Scheme</label>
      <label for="scheme" v-else-if="project.platform === 'android'">Package Name(*.apk)</label>
      <input class="form-control" type="text" id="scheme" name="environment[scheme]" :value="environment.scheme"
             v-model="environment.scheme"/>
    </div>
    <div class="form-group" v-if="project.platform === 'android'">
      <label for="build_path">Build Path</label>
      <input class="form-control" type="text" id="build_path" name="environment[build_path]" :value="environment.build_path"
             v-model="environment.build_path" placeholder="app/build/outputs/apk/"/>
    </div>
    <div class="form-group">
      <label for="template">Template</label>
      <select class="form-control" id="template" name="environment[template]" v-model="environment.build_template">
        <option v-for="option in options" :value="option.value">{{ option.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="ding_access_token">DingTalk Access Token</label>
      <input class="form-control" type="text" id="ding_access_token" name="environment[ding_access_token]"
             :value="environment.ding_access_token"
             v-model="environment.ding_access_token" placeholder="Keep this empty if you don't want to notification by DingTalk"/>
    </div>
    <div class="form-group">
      <label for="download_url">Download URL</label>
      <input class="form-control" type="text" id="download_url" name="environment[download_url]"
             :value="environment.download_url"
             v-model="environment.download_url" placeholder="eg:http://fir.im/nlkc"/>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'
  import Enum from '@/constants/enum'

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
        for (let template in Enum.Templates) {
          if (Enum.Templates.hasOwnProperty(template)) {
            this.options.push({name: template, value: Enum.Templates[template]})
          }
        }
      }

    }
  }
</script>

