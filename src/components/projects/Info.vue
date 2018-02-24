<template>
  <div class="box box-primary">
    <LoadingOverlay v-show="showOverlay"></LoadingOverlay>
    <div class="box-body box-profile">
      <img class="profile-user-img img-responsive img-circle" :src="project.icon">
      <h3 class="profile-username text-center">
        {{ project.title }}
      </h3>
      <p class="text-muted text-center">
        {{ project.desc }}
      </p>
      <p class="text-muted text-center">
        {{ project.git_repo_url }}
      </p>
      <ul class="list-group list-group-unbordered">
        <li class="list-group-item" v-for="item in properties">
          <b>
            {{ item.name }}
          </b>
          <a class="pull-right">
            {{ item.value }}
          </a>
        </li>
      </ul>
      <button type="button" class="btn btn-info" @click="syncGitLab">
        Sync Gitlab
      </button>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import ConfirmModal from '@/components/global/ConfirmModal'
  import { mapGetters } from 'vuex'

  export default {
    components: {LoadingOverlay, ConfirmModal},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        showOverlay: false,
        properties: []
      }
    },

    watch: {
      project () {
        this.setProjectProperties()
      }
    },

    created () {
      this.setProjectProperties()
    },

    methods: {

      setProjectProperties () {
        this.properties = [
          {name: 'Guardian', value: this.project.guardian.name},
          {name: 'Identifier', value: this.project.identifier},
          {name: 'Git Repo URL', value: this.project.git_repo_url},
          {name: 'Type', value: this.project.type},
          {name: 'Updated Time', value: this.project.updated_at},
          {name: 'Last Build Time', value: this.project.lasted_build_at}
        ]
      },

      syncGitLab () {
        this.showLoading()
        NetWorking
          .doGet(API.projectSyncGitLab, {id: this.$route.params.project_id})
          .then(response => {
            let project = response.data
            this.$store.dispatch('setProject', project)
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
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
