<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <user-panel></user-panel>
      <side-bar-item :navsData="navs"></side-bar-item>
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
            name: 'Project',
            to: 'home',
            paths: ['home'],
            icon: 'fa-home'
          }, {
            name: 'Environments',
            to: 'environments',
            paths: ['environments'],
            icon: 'fa-truck'
          }, {
            name: 'Builds',
            to: 'builds',
            paths: ['builds'],
            icon: 'fa-legal'
          }, {
            name: 'Settings',
            to: 'setting',
            paths: ['setting'],
            icon: 'fa-wrench'
          }
        ]
      }
    }
  }
</script>
