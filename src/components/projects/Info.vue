<template>
  <div class="col-md-4">
    <div class="box box-primary">
      <LoadingOverlay v-show="showOverlay"></LoadingOverlay>
      <div class="box-body box-profile">
        <img class="profile-user-img img-responsive img-circle"
             :src="project.icon">
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
          <li class="list-group-item">
            <b>
              Guardian
            </b>
            <a class="pull-right">
              {{ project.guardian.name }}
            </a>
          </li>
          <li class="list-group-item">
            <b>
              Version
            </b>
            <a class="pull-right">
              {{ project.version }}
            </a>
          </li>
          <li class="list-group-item">
            <b>
              Last Release
            </b>
            <a class="pull-right">
              {{ project.last_release_at }}
            </a>
          </li>
          <li class="list-group-item">
            <b>
              Identifier
            </b>
            <a class="pull-right">
              {{ project.identifier }}
            </a>
          </li>
        </ul>
        <button type="button" class="btn btn-info" @click="syncGitLab">
          Sync Gitlab
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import ConfirmModal from '@/components/global/ConfirmModal'

  export default {
    components: {LoadingOverlay, ConfirmModal},

    data () {
      return {
        project: {},
        showOverlay: false
      }
    },

    created () {
      this.fetchData()
    },

    methods: {

      fetchData: function () {
        this.showLoading()
        NetWorking.doGet(API.project, {id: this.$route.params.project_id}, null, response => {
          this.project = response.data
          this.hideLoading()
        }, _ => {
          this.hideLoading()
        })
      },

      syncGitLab: function () {
        this.showLoading()
        NetWorking.doGet(API.projectSyncGitLab, {id: this.$route.params.project_id}, null, response => {
          this.project = response.data
          this.$store.dispatch('setProject', this.project)
          this.hideLoading()
        }, _ => {
          this.hideLoading()
        })
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
