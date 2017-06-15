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
      <div class="dataTables_paginate paging_simple_numbers" v-show="paginate.totalRows>paginate.perPage">
        <pagination :total-rows="paginate.totalRows" v-model="paginate.currentPage"
                    :per-page="paginate.perPage" @input="pageChanged">
        </pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import Pagination from '@/components/global/Pagination'

  export default {
    components: {LoadingOverlay, Pagination},

    props: {
      url: {
        type: String,
        default: ''
      },
      pathParams: {
        type: Object,
        default: () => {}
      },
      options: {
        type: Object,
        default: function () { return {params: {}} }
      },
      reloadData: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        showOverlay: false,
        items: [],
        paginate: {
          currentPage: 1,
          totalRows: 0,
          perPage: 15
        }
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
      fetchData (page) {
        this.showLoading()
        this.options.params.page = page >= 1 ? page : 1
        NetWorking
          .doGet(this.url, this.pathParams, this.options)
          .then(response => {
            this.items = response.data.list
            this.paginate.totalRows = response.data.total
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      pageChanged (page) {
        this.fetchData(page)
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
