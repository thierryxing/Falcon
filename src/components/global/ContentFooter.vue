<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b>
      0.2.1 Beta
    </div>
    <strong>
      Copyright &copy; 2016-2017
      <a href="/">
        Jaguar
        All rights reserved.
      </a>
    </strong>
  </footer>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'

  export default {
    props: ['project', 'edit'],

    data () {
      return {
        version: ''
      }
    },

    created () {
//      this.fetchData()
    },

    methods: {
      fetchData () {
        NetWorking.doGet(API.index).then(response => {
          this.version = response.data.version
        })
      }
    }
  }
</script>
