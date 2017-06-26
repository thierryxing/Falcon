<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Environment</h3>
    </div>
    <form @submit.prevent="doUpdate" accept-charset="UTF-8" method="post">
      <env-form :environment.sync="environment"></env-form>
      <div class="box-footer">
        <input class="btn btn-primary" type="submit" value="Update">
        <button type="button" class="btn btn-danger" @click="show">
          Delete
        </button>
        <confirm-modal :show.sync="showModal" @ok="doDelete">
          <span slot="body">This action CANNOT be undone.
            This will permanently delete the environment, builds and remove all collaborator associations.
          </span>
        </confirm-modal>
      </div>
    </form>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import ConfirmModal from '@/components/global/ConfirmModal'
  import EnvForm from '@/components/projects/EnvForm'

  export default {
    components: {LoadingOverlay, ConfirmModal, EnvForm},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        showOverlay: false,
        showModal: false,
        selected: '',
        environment: {}
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData () {
        this.showLoading()
        NetWorking
          .doGet(API.environment, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, null)
          .then(response => {
            this.environment = response.data
            this.selected = this.environment.build_template
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doUpdate () {
        this.showLoading()
        NetWorking
          .doPut(API.environment, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, this.environment, null)
          .then(response => {
            this.config = response.data
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      doDelete () {
        this.showLoading()
        NetWorking
          .doDelete(API.environment, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, null)
          .then(() => {
            this.$router.replace({name: 'environments'})
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
      },

      show () {
        this.showModal = true
      }
    }
  }
</script>

