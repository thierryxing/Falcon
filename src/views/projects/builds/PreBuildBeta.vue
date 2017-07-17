<template>
  <div class="box box-primary">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-header with-border">
      <h3 class="box-title">Git Tags</h3>
    </div>
    <table-box :url="url" :pathParams="pathParams">
      <tr slot="ths">
        <th>Name</th>
        <th>Action</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.name }}
          </td>
          <td>
            <button class="btn btn-block btn-primary" :disabled="buttonDisabled" @click="chooseTag(props.item.name)">
              Choose
            </button>
          </td>
        </tr>
      </template>
    </table-box>
  </div>
</template>

<script>
  import NetWorking from '@/utils/networking'
  import * as API from '@/constants/api'
  import LoadingOverlay from '@/components/global/LoadingOverlay'
  import TableBox from '@/components/global/TableBox'

  export default {
    components: {LoadingOverlay, TableBox},

    data () {
      return {
        showOverlay: false,
        buttonDisabled: false,
        url: API.environmentGitTag,
        pathParams: {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }
      }
    },

    methods: {
      chooseTag (name) {
        NetWorking
          .doPost(API.buildBeta, {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, {tag: name})
          .then((response) => {
            this.hideLoading()
            this.$router.replace({name: 'build_detail', params: {'build_id': response.data.id}})
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
