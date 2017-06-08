<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Edit Project</h3>
    </div>
    <form @submit.prevent="doCreate" accept-charset="UTF-8" method="post">
      <project-form :project.sync="project" :edit="true"></project-form>
      <div class="box-footer">
        <button class="btn btn-primary" type="submit" @click="doUpdate">
          Update
        </button>
        <button type="button" class="btn btn-danger" @click="show">
          Delete
        </button>
        <confirm-modal :show.sync="showModal" @ok="doDelete">
          <span slot="body">This action CANNOT be undone.
            This will permanently delete the project, builds and remove all collaborator associations.
          </span>
        </confirm-modal>
      </div>
    </form>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import ProjectForm from '@/components/projects/Form'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import ConfirmModal from '@/components/global/ConfirmModal'

  export default {
    components: {ProjectForm, LoadingOverlay, ConfirmModal},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    data () {
      return {
        showOverlay: false,
        showModal: false
      }
    },

    methods: {
      show () {
        this.showModal = true
      },

      doDelete () {
        this.showLoading()
        NetWorking.doDelete(API.project,
          {
            id: this.project.id
          },
          null,
          _ => {
            this.hideLoading()
            this.$router.replace({name: 'dashboard'})
          },
          _ => {
            this.hideLoading()
          })
      },

      doUpdate () {
        this.showLoading()
        NetWorking.doPut(API.project,
          {
            id: this.project.id
          },
          {project: this.project},
          response => {
            this.hideLoading()
            this.$store.dispatch('setProject', response.data)
          },
          _ => {
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
