<template>
  <div class="box box-solid">
    <transition name="fade">
      <loading-overlay v-show="showOverlay"></loading-overlay>
    </transition>
    <div class="box-body">
      <table class="table table-hover table-bordered">
        <tbody>
        <slot name="ths"></slot>
        <slot name="item"
              v-for="item in items"
              :item="item">
        </slot>
        </tbody>
      </table>
    </div>
    <div class="box-footer">
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import LoadingOverlay from '@/components/global/LoadingOverlay'

  export default {
    components: {LoadingOverlay},

    props: ['url', 'pathParams', 'options', 'reloadData'],

    data () {
      return {
        showOverlay: false,
        items: []
      }
    },

    created () {
      this.fetchData()
    },

    watch: {
      reloadData: function () {
        if (this.reloadData) {
          this.fetchData()
        }
      },

      pathParams: function () {
        this.fetchData()
      },

      options: function () {
        this.fetchData()
      }
    },

    methods: {
      fetchData: function () {
        this.showLoading()
        NetWorking.doGet(this.url, this.pathParams, this.options, response => {
          this.items = response.data
          this.hideLoading()
        }, _ => {
          this.hideLoading()
        })
      },

      showLoading: function () {
        this.showOverlay = true
      },

      hideLoading: function () {
        this.showOverlay = false
        this.$emit('update:reloadData', false)
      }
    }
  }
</script>
