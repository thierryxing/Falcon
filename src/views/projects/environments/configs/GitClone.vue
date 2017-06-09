<template>
  <div class="box box-solid">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-body" v-show="cloneButtonShow">
      <button class="btn btn-block btn-primary" role="button" @click="doClone()">
        Clone Project
      </button>
    </div>
    <table-box :url="url" :pathParams="pathParams" :reloadData.sync="reloadData">
      <tr slot="ths">
        <th>Name</th>
        <th>Full</th>
        <th>Action</th>
      </tr>
      <template slot="item" scope="props">
        <tr>
          <td>
            {{ props.item.name }}
          </td>
          <td>
            {{ props.item.full }}
          </td>
          <td>
            <button class="btn btn-block btn-success" v-if="props.item.current">Current Branch</button>
            <button class="btn btn-block btn-primary" :disabled="buttonDisabled" @click="chooseBranch(props.item.name)" v-else>Choose
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
        cloneButtonShow: true,
        environment: {},
        reloadData: false,
        url: API.environmentGitBranch,
        pathParams: {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        this.showLoading()
        NetWorking.doGet(API.environment, {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }, null).then(
          response => {
            this.environment = response.data
            this.hideLoading()
          },
          () => {
            this.hideLoading()
          })
      },

      doClone: function () {
        this.showLoading()
        NetWorking.doGet(API.environmentGitClone, {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }, null).then(
          response => {
            this.environment = response.data
            this.reloadData = true
            this.hideLoading()
          },
          () => {
            this.hideLoading()
          })
      },

      chooseBranch (name) {
        this.showLoading()
        NetWorking.doPost(API.environmentChooseBranch, {
          id: this.$route.params.project_id,
          env_id: this.$route.params.env_id
        }, {
          branch: name
        }, null).then(
          () => {
            this.hideLoading()
            this.reloadData = true
          },
          () => {
            this.hideLoading()
          })
      },

      showLoading: function () {
        this.showOverlay = true
      },

      hideLoading: function () {
        if (this.environment.clone_status === 'success') {
          this.cloneButtonShow = false
        }
        this.showOverlay = false
      }
    }
  }
</script>
