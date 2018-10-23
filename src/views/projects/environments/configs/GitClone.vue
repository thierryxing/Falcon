<template>
  <div class="box box-solid">
    <loading-overlay v-show="showOverlay"></loading-overlay>
    <div class="box-body" v-show="cloneButtonShow">
      <button class="btn btn-block btn-primary" role="button" @click="doClone()">
        Clone Project
      </button>
    </div>
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li id="tab-branch" :class="{ active: type === 'branch' }">
          <a href="javascript:" @click="switchTab('branch')">
            Branches
          </a>
        </li>
        <li id="tab-tag" :class="{ active: type === 'tag' }">
          <a href="javascript:" @click="switchTab('tag')">
            Tags
          </a>
        </li>
      </ul>
      <table-box :url="url" :pathParams="pathParams" :reloadData.sync="reloadData">
        <tr slot="ths">
          <th>Name</th>
          <th>Full</th>
          <th>Action</th>
        </tr>
        <template slot="item" slot-scope="props">
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
        type: 'branch',
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
          .doGet(API.environmentGitClone, this.pathParams)
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
        let url = API.environmentChooseBranch
        let options = {branch: name, full: full}
        if (this.type === 'tag') {
          url = API.environmentChooseTag
          options = {tag: name}
        }
        NetWorking
          .doPut(url, this.pathParams, options)
          .then(() => {
            this.hideLoading()
            this.reloadData = true
          }, () => {
            this.hideLoading()
          })
      },

      switchTab (type) {
        this.type = type
        this.url = type === 'branch' ? API.environmentGitBranch : API.environmentGitTag
        this.reloadData = true
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
