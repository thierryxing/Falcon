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
            paths: ['dashboard'],
            icon: 'fa-dashboard'
          },
          {
            name: 'Projects',
            to: 'project_list',
            paths: ['project_list', 'new_project'],
            icon: 'fa-cube'
          },
          {
            name: 'Jobs',
            to: 'jobs',
            paths: ['jobs'],
            icon: 'fa-send',
            label: ''
          },
          {
            name: 'Members',
            to: 'members',
            paths: ['members'],
            icon: 'fa-user'
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
            this.navs[2].label = response.data.total === 0 ? '' : response.data.total
          })
      }
    }
  }
</script>
