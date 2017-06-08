<template>
  <div class="skin-blue sidebar-mini wysihtml5-supported">
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <div class="content-wrapper" style="min-height: 916px;">
      <content-header>
        <span slot="title">{{ project.title }}</span>
        <span slot="sub-title">{{ project.platform }}</span>
      </content-header>
      <alert></alert>
      <div class="content">
        <router-view></router-view>
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
  import Alert from '@/components/global/Alert'
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import { mapGetters } from 'vuex'

  export default {
    components: {SideBar, NavBar, ContentHeader, ContentFooter, Alert},

    computed: {
      ...mapGetters({
        project: 'currentProject'
      })
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        NetWorking.doGet(API.project, {id: this.$route.params.project_id}, null, response => {
          this.$store.dispatch('setProject', response.data)
        })
      }
    }
  }
</script>
