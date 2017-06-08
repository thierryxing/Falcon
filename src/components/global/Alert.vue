<template>
  <div class="margin no-print" v-show="showAlert">
    <div class="alert alert-dismissible" :class="alertClass()">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <h4><i class="icon fa" :class="iconClass()"></i> {{ type }} </h4>
      {{ message }}
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        alert: 'currentAlert'
      })
    },

    data () {
      return {
        showAlert: false,
        message: '',
        type: 'info'
      }
    },

    watch: {
      alert (alert) {
        if (alert !== null) {
          this.showAlert = true
          this.type = alert.type
          this.message = alert.message
        } else {
          this.showAlert = false
        }
      },

      $route () {
        this.$store.dispatch('deleteAlert')
      }
    },

    methods: {

      alertClass () {
        return 'alert-' + this.type
      },

      iconClass () {
        return 'fa-' + this.type
      }

    }
  }
</script>
