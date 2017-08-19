<template>
  <aside class="main-sidebar">
    <section class="sidebar" style="height: 468px; overflow: hidden; width: auto;">
      <UserPanel></UserPanel>
      <SideBarItem :navsData="navs"></SideBarItem>
    </section>
  </aside>
</template>

<script>
  import UserPanel from '@/components/global/UserPanel'
  import SideBarItem from '@/components/global/SideBarItem'
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    components: {UserPanel, SideBarItem},

    data () {
      return {
        navs: [
          {
            name: 'Dashboard',
            to: 'dashboard',
            paths: ['dashboard', 'new_project'],
            icon: 'fa fa-dashboard'
          },
          {
            name: 'Jobs',
            to: 'job',
            paths: ['job'],
            icon: 'fa fa-send',
            label: ''
          },
          {
            name: 'Guardian',
            to: 'guardian',
            paths: ['guardian'],
            icon: 'fa fa-shield'
          }
        ]
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData () {
        NetWorking
          .doGet(API.buildsExecuting)
          .then(response => {
            this.navs[1].label = response.data.total === 0 ? '' : response.data.total
          })
      }
    }
  }
</script>
