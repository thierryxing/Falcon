<template>
  <div class="box-body">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" placeholder="" class="form-control" name="project[title]" v-model="project.title" :disabled="edit">
    </div>
    <div class="form-group">
      <label for="git_repo_url">Git Repo URL</label>
      <input id="git_repo_url" placeholder="eg:git@git.gengmei.cc/repo/path" class="form-control" v-model="project.git_repo_url"
             name="project[git_repo_url]">
    </div>
    <div class="form-group">
      <label for="type">Type</label>
      <select id="type" class="form-control" name="project[type]" v-model="project.type">
        <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="identifier">{{ identifierLabel() }}</label>
      <input id="identifier" placeholder="eg: com.wanmeizhensuo.zhensuo or com.gengmei.framework:gmcache" class="form-control"
             name="project[package_name]" v-model="project.identifier">
    </div>
    <div class="form-group">
      <label for="guardian_id">Guardian</label>
      <select name="project[guardian_id]" id="guardian_id" class="form-control" v-model="project.guardian.id">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'

  export default {
    props: ['project', 'edit'],

    computed: {
      ...mapGetters({
        platform: 'currentPlatform'
      })
    },

    data () {
      return {
        users: [],
        options: [
          {text: 'App', value: 'App'},
          {text: 'Lib', value: 'Lib'}
        ]
      }
    },

    watch: {
      'project.type': function (value) {
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData () {
        NetWorking.doGet(API.users).then(response => {
          this.users = response.data.list
        })
      },

      isAndroidApp () {
        return this.platform === 'android'
      },

      identifierLabel () {
        if (this.isAndroidApp()) {
          return 'Android applicationId'
        } else {
          return 'Bundle Identifier'
        }
      }
    }
  }
</script>
