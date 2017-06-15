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
            Identifier
          </b>
          <a class="pull-right">
            {{ project.identifier }}
          </a>
        </li>
        <li class="list-group-item">
          <b>
            Updated At
          </b>
          <a class="pull-right">
            {{ project.updated_at }}
          </a>
        </li>
        <li class="list-group-item">
          <b>
            Last Build Time
          </b>
          <a class="pull-right">
            {{ project.lasted_build_at }}
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
        showOverlay: false
      }
    },

    methods: {

      syncGitLab () {
        this.showLoading()
        NetWorking.doGet(API.projectSyncGitLab, {id: this.$route.params.project_id}, null).then(response => {
          this.project = response.data
          this.$store.dispatch('setProject', this.project)
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
