<template>
  <div class="skin-blue sidebar-mini wysihtml5-supported">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <div class="content-wrapper" id="content-wrapper" style="min-height: 916px;">
      <div class="box box-solid" style="background-color: #ecf0f5;box-shadow:none">
        <LoadingOverlay v-show="showOverlay"></LoadingOverlay>
        <content-header>
          <span slot="title">{{ project.title }}</span>
          <span slot="sub-title">{{ project.platform }}</span>
        </content-header>
        <alert></alert>
        <section class="content">
          <router-view></router-view>
        </section>
      </div>
    </div>
    <content-footer></content-footer>
  </div>
</template>

<script>
  import NavBar from '@/components/global/NavBar'
  import SideBar from '@/components/projects/SideBar'
  import ContentHeader from '@/components/global/ContentHeader'
  import ContentFooter from '@/components/global/ContentFooter'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import Alert from '@/components/global/Alert'
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'

  export default {
    components: {SideBar, NavBar, ContentHeader, ContentFooter, Alert, LoadingOverlay},

    computed: {
      ...mapGetters({
        currentProject: 'currentProject'
      })
    },

    data () {
      return {
        project: {
          guardian: {}
        },
        showOverlay: false
      }
    },

    created () {
      if (this.currentProject.id === null || this.currentProject.id !== this.$route.params.project_id) {
        this.fetchData()
      }
    },

    methods: {
      fetchData () {
        this.showLoading()
        NetWorking
          .doGet(API.project, {id: this.$route.params.project_id})
          .then(response => {
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
