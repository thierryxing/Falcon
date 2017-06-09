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
             v-model="environment.build_path"/>
    </div>
    <div class="form-group">
      <label for="template">Template</label>
      <select class="form-control" id="template" name="environment[template]" v-model="environment.build_template">
        <option v-for="option in options" :value="option.id">{{ option.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'

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
      this.fetchData()
    },

    methods: {

      fetchData () {
        NetWorking.doGet(API.environmentTemplates, {
          id: this.$route.params.project_id
        }, null).then(
          response => {
            this.options = response.data
          })
      }

    }
  }
</script>

