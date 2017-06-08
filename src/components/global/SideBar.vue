<template>
  <aside class="main-sidebar">
    <section class="sidebar" style="height: 468px; overflow: hidden; width: auto;">
      <UserPanel></UserPanel>
      <SideBarItem :data="navs"></SideBarItem>
    </section>
  </aside>
</template>

<script>
  import UserPanel from '@/components/global/UserPanel'
  import SideBarItem from '@/components/global/SideBarItem'

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
            icon: 'fa fa-send'
          },
          {
            name: 'Guardian',
            to: 'guardian',
            paths: ['guardian'],
            icon: 'fa fa-shield'
          }
        ]
      }
    }
  }
</script>
