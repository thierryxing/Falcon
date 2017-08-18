<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Release Notes</h3>
    </div>
    <table-box :url="url" :pathParams="pathParams">
      <tr slot="ths">
        <th>Content</th>
        <th>Author</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.content }}
          </td>
          <td>
            {{ props.item.author }}
          </td>
        </tr>
      </template>
    </table-box>
    <div class="box-footer">
      <button class="btn btn-primary" @click="doBuildTest">
        Build
      </button>
    </div>
  </div>
</template>

<script>
  import * as API from '@/constants/api'
  import NetWorking from '@/utils/networking'
  import TableBox from '@/components/global/TableBox'
  import LoadingOverlay from '@/components/global/LoadingOverlay'

  export default {
    components: {TableBox, LoadingOverlay},

    data () {
      return {
        url: API.releaseNotes,
        project_id: null,
        env_id: null,
        showOverlay: false,
        pathParams: {id: this.$route.params.project_id, env_id: this.$route.params.env_id}
      }
    },

    methods: {
      doBuildTest () {
        this.showLoading()
        NetWorking
          .doPost(API.buildTest, this.pathParams)
          .then(response => {
            this.$router.replace({name: 'build_detail', params: {'build_id': response.data.id}})
            this.hideLoading()
          }, () => {
            this.hideLoading()
          })
      },

      showLoading () {
        this.showOverlay = true
      },

      hideLoading () {
        this.showOverlay = false
      }
    }
  }
</script>
