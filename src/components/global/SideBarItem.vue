<template>
  <ul class="sidebar-menu">
    <li class="header" v-if="$route.path.includes('/projects')">
      <router-link :to="{ name: 'dashboard'}">
        Go to Dashboard
      </router-link>
    </li>
    <li class="header" v-else>
      MAIN NAVIGATION
    </li>
    <li class="treeview" :class="nav.cls" v-for="nav in navs">
      <router-link :to="{name: nav.to}">
        <i class="fa" :class="nav.icon"></i>
        <span>{{ nav.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        navs: this.data
      }
    },

    created () {
      this.checkNavActive()
    },

    watch: {
      $route: 'checkNavActive'
    },

    methods: {
      checkNavActive () {
        for (let nav of this.navs) {
          let active = false
          for (let path of nav.paths) {
            if (this.$route.path.includes(path)) {
              active = true
            }
          }
          if (active) {
            nav.cls = 'active'
          } else {
            nav.cls = ''
          }
        }
      }
    }
  }
</script>
