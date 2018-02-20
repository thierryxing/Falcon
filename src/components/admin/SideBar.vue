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
  components: { UserPanel, SideBarItem },
  data() {
    return {
      navs: [
        {
          name: 'Config',
          to: 'configs',
          paths: ['configs'],
          icon: 'fa-cog'
        },
        {
          name: 'Fastlane Template',
          to: 'fastlane_templates',
          paths: ['fastlane_templates'],
          icon: 'fa-rocket'
        }
      ]
    }
  }
}
</script>
