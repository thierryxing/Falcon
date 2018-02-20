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
            <button class="btn btn-block btn-primary" :disabled="buttonDisabled" @click="chooseBranch(props.item.name, props.item.full)"
                    v-else>Choose
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
  import Enum from '@/constants/enum'

  export default {
    components: {LoadingOverlay, TableBox},

    data () {
      return {
        interval: null,
        fetching: false,
        shouldPoll: true,
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

    beforeDestroy () {
      window.clearInterval(this.interval)
    },

    methods: {

      fetchData () {
        this.fetching = true
        this.showLoading()
        NetWorking
          .doGet(API.environment, {id: this.$route.params.project_id, env_id: this.$route.params.env_id})
          .then(response => {
            this.environment = response.data
            this.fetching = false
            if (this.environment.clone_status === Enum.CloneStatus.Processing) {
              this.shouldPoll = true
              this.pollLog()
            } else {
              this.shouldPoll = false
              this.reloadData = true
              this.hideLoading()
            }
          }, () => {
            this.fetching = false
            this.hideLoading()
          })
      },

      doClone () {
        this.showLoading()
        NetWorking
          .doGet(API.environmentGitClone, {id: this.$route.params.project_id, env_id: this.$route.params.env_id})
          .then(response => {
            this.environment = response.data
            if (this.environment.clone_status === Enum.CloneStatus.Processing) {
              this.fetchData()
            } else {
              this.hideLoading()
            }
          }, () => {
            this.hideLoading()
          })
      },

      chooseBranch (name, full) {
        this.showLoading()
        NetWorking
          .doPost(API.environmentChooseBranch,
            {id: this.$route.params.project_id, env_id: this.$route.params.env_id}, {branch: name, full: full})
          .then(() => {
            this.hideLoading()
            this.reloadData = true
          }, () => {
            this.hideLoading()
          })
      },

      showLoading () {
        this.showOverlay = true
      },

      hideLoading () {
        if (this.environment.clone_status === Enum.CloneStatus.Success) {
          this.cloneButtonShow = false
        }
        this.showOverlay = false
      },

      pollLog () {
        this.interval = setInterval(function () {
          if (this.shouldPoll && !this.fetching) {
            this.fetchData()
          }
        }.bind(this), 5000)
      }
    }
  }
</script>
