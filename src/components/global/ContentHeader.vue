<template>
  <section class="content-header">
    <h1>
      {{ contentHeader.title }}
      <small>
        {{ contentHeader.subTitle }}
      </small>
    </h1>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        contentHeader: {}
      }
    },

    computed: {
      ...mapGetters(['currentProject'])
    },

    created () {
      this.buildContentHeader(this.$route)
    },

    watch: {
      $route (to, from) {
        this.buildContentHeader(to)
      },

      currentProject () {
        this.buildContentHeader()
      }
    },

    methods: {
      buildContentHeader (route) {
        if (route && route.meta.contentHeader) {
          this.contentHeader = route.meta.contentHeader
        } else {
          if (this.currentProject) {
            this.contentHeader = {title: this.currentProject.title, subTitle: this.currentProject.platform}
          }
        }
      }
    }
  }
</script>
