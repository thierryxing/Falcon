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

    <li class="treeview" :class="navCls(nav)" v-for="nav in navs">
      <router-link :to="{name: nav.to}">
        <i class="fa" :class="nav.icon"></i>
        <span>{{ nav.name }}</span>
        <span class="pull-right-container">
          <span class="label label-primary pull-right">{{ nav.label }}</span>
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['navsData'],

    data () {
      return {
        navs: this.navsData
      }
    },

    watch: {
      navsData (value) {
        console.log(value)
        this.navs = value
      }
    },

    methods: {

      navCls (nav) {
        let active = false
        for (let path of nav.paths) {
          if (this.$route.path.includes(path)) {
            active = true
          }
        }
        if (active) {
          return 'active'
        } else {
          return ''
        }
      }
    }
  }
</script>
